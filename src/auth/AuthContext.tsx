import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  getActiveChurchId,
  getStoredSession,
  isSupabaseConfigured,
  signInWithPassword,
  storeActiveChurchId,
  storeSession,
  supabaseRequest,
  type SupabaseSession,
} from "@/lib/supabaseRest";

export type ChurchRole = "owner" | "admin" | "leader" | "volunteer" | "viewer";

export interface ChurchMembership {
  id: string;
  churchId: string;
  churchName: string;
  churchSlug?: string | null;
  role: ChurchRole;
}

interface AuthContextValue {
  isConfigured: boolean;
  session: SupabaseSession | null;
  isAuthenticated: boolean;
  memberships: ChurchMembership[];
  activeMembership: ChurchMembership | null;
  isLoadingAccess: boolean;
  accessError: string | null;
  canEditRecords: boolean;
  canManageChurch: boolean;
  canRecordAttendance: boolean;
  canExportRecords: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  switchChurch: (churchId: string) => void;
}

interface ChurchRow {
  id: string;
  name: string;
  slug?: string | null;
}

interface MembershipRow {
  id: string;
  church_id: string;
  role: ChurchRole;
  status: string;
  churches?: ChurchRow | ChurchRow[] | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function getJoinedChurch(row: MembershipRow): ChurchRow | null {
  if (Array.isArray(row.churches)) return row.churches[0] ?? null;
  return row.churches ?? null;
}

function toMembership(row: MembershipRow): ChurchMembership {
  const church = getJoinedChurch(row);
  return {
    id: row.id,
    churchId: row.church_id,
    churchName: church?.name ?? "Church",
    churchSlug: church?.slug,
    role: row.role,
  };
}

async function fetchMemberships(): Promise<ChurchMembership[]> {
  const rows = await supabaseRequest<MembershipRow[]>(
    "church_memberships?select=id,church_id,role,status,churches(id,name,slug)&status=eq.active&order=created_at.asc"
  );
  return rows.map(toMembership);
}

async function createFirstChurchForUser(session: SupabaseSession): Promise<ChurchMembership[]> {
  if (!session.user?.id) return [];

  const churchName = session.user.email ? `${session.user.email.split("@")[0]}'s Church` : "My Church";
  const churches = await supabaseRequest<ChurchRow[]>("churches", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ name: churchName }),
  });
  const church = churches[0];
  if (!church) return [];

  await supabaseRequest("church_memberships", {
    method: "POST",
    body: JSON.stringify({
      church_id: church.id,
      user_id: session.user.id,
      role: "owner",
      status: "active",
    }),
  });

  return [
    {
      id: `${church.id}:${session.user.id}`,
      churchId: church.id,
      churchName: church.name,
      churchSlug: church.slug,
      role: "owner",
    },
  ];
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SupabaseSession | null>(() => {
    if (!isSupabaseConfigured) return null;
    return getStoredSession();
  });
  const [memberships, setMemberships] = useState<ChurchMembership[]>([]);
  const [activeChurchId, setActiveChurchId] = useState<string | null>(() => getActiveChurchId());
  const [isLoadingAccess, setIsLoadingAccess] = useState(false);
  const [accessError, setAccessError] = useState<string | null>(null);

  async function loadAccess(nextSession: SupabaseSession | null) {
    if (!isSupabaseConfigured || !nextSession?.access_token) {
      setMemberships([]);
      setActiveChurchId(null);
      return;
    }

    setIsLoadingAccess(true);
    setAccessError(null);

    try {
      let nextMemberships = await fetchMemberships();
      if (nextMemberships.length === 0) {
        nextMemberships = await createFirstChurchForUser(nextSession);
      }

      setMemberships(nextMemberships);
      const storedChurchId = getActiveChurchId();
      const nextActive = nextMemberships.find((membership) => membership.churchId === storedChurchId) ?? nextMemberships[0] ?? null;
      storeActiveChurchId(nextActive?.churchId ?? null);
      setActiveChurchId(nextActive?.churchId ?? null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load church access";
      setAccessError(message);
      setMemberships([]);
      setActiveChurchId(null);
    } finally {
      setIsLoadingAccess(false);
    }
  }

  useEffect(() => {
    loadAccess(session);
  }, [session?.access_token]);

  const activeMembership = memberships.find((membership) => membership.churchId === activeChurchId) ?? memberships[0] ?? null;
  const activeRole = activeMembership?.role;
  const canManageChurch = activeRole === "owner" || activeRole === "admin";
  const canEditRecords = canManageChurch || activeRole === "leader";
  const canRecordAttendance = canEditRecords || activeRole === "volunteer";
  const canExportRecords = canEditRecords;

  const value = useMemo<AuthContextValue>(
    () => ({
      isConfigured: isSupabaseConfigured,
      session,
      isAuthenticated: Boolean(session?.access_token),
      memberships,
      activeMembership,
      isLoadingAccess,
      accessError,
      canEditRecords,
      canManageChurch,
      canRecordAttendance,
      canExportRecords,
      async signIn(email, password) {
        const nextSession = await signInWithPassword(email, password);
        setSession(nextSession);
        await loadAccess(nextSession);
      },
      signOut() {
        storeSession(null);
        setSession(null);
        setMemberships([]);
        setActiveChurchId(null);
      },
      switchChurch(churchId) {
        const membership = memberships.find((item) => item.churchId === churchId);
        if (!membership) return;
        storeActiveChurchId(churchId);
        setActiveChurchId(churchId);
        window.location.reload();
      },
    }),
    [session, memberships, activeMembership, isLoadingAccess, accessError, canEditRecords, canManageChurch, canRecordAttendance, canExportRecords]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return value;
}
