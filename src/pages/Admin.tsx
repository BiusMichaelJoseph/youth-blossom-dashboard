import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Users,
  UserPlus,
  Lock,
  Eye,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const teamMembers = [
  {
    id: "1",
    name: "Pastor Michael",
    email: "pastor.michael@church.org",
    role: "admin",
    lastActive: "2026-01-29",
    status: "active",
  },
  {
    id: "2",
    name: "Sister Grace",
    email: "grace@church.org",
    role: "leader",
    lastActive: "2026-01-28",
    status: "active",
  },
  {
    id: "3",
    name: "Deacon James",
    email: "james@church.org",
    role: "leader",
    lastActive: "2026-01-27",
    status: "active",
  },
  {
    id: "4",
    name: "Marcus Williams",
    email: "marcus@church.org",
    role: "volunteer",
    lastActive: "2026-01-25",
    status: "active",
  },
  {
    id: "5",
    name: "Emily Chen",
    email: "emily@church.org",
    role: "volunteer",
    lastActive: "2026-01-20",
    status: "inactive",
  },
];

const rolePermissions = {
  admin: {
    label: "Administrator",
    color: "bg-destructive/10 text-destructive border-destructive/20",
    permissions: ["View all data", "Edit all data", "Manage users", "Export data", "Delete records"],
  },
  leader: {
    label: "Youth Leader",
    color: "bg-primary/10 text-primary border-primary/20",
    permissions: ["View all data", "Edit assigned members", "Add new youth", "Export data"],
  },
  volunteer: {
    label: "Volunteer",
    color: "bg-muted text-muted-foreground border-muted",
    permissions: ["View assigned data", "Record attendance"],
  },
};

const Admin = () => {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Admin & Access Control</h1>
        <p className="page-description">
          Manage team members, roles, and data privacy settings
        </p>
      </div>

      <Tabs defaultValue="team" className="space-y-6">
        <TabsList>
          <TabsTrigger value="team" className="gap-2">
            <Users className="h-4 w-4" />
            Team Members
          </TabsTrigger>
          <TabsTrigger value="roles" className="gap-2">
            <Shield className="h-4 w-4" />
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Lock className="h-4 w-4" />
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-6">
          {/* Team Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{teamMembers.length}</p>
                    <p className="text-sm text-muted-foreground">Total Members</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-success/10">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {teamMembers.filter((m) => m.status === "active").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-destructive/10">
                    <Shield className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {teamMembers.filter((m) => m.role === "admin").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Administrators</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Members Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage who has access to the dashboard</CardDescription>
              </div>
              <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite Team Member</DialogTitle>
                    <DialogDescription>
                      Send an invitation to join the youth ministry dashboard
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input placeholder="email@church.org" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Select defaultValue="volunteer">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="leader">Youth Leader</SelectItem>
                          <SelectItem value="volunteer">Volunteer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setInviteDialogOpen(false)}>Send Invitation</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary/20 text-primary text-sm">
                              {member.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={rolePermissions[member.role as keyof typeof rolePermissions].color}
                        >
                          {rolePermissions[member.role as keyof typeof rolePermissions].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(member.lastActive).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            member.status === "active"
                              ? "bg-success/10 text-success border-success/20"
                              : "bg-muted text-muted-foreground"
                          }
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(rolePermissions).map(([key, role]) => (
              <Card key={key}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={role.color}>
                      {role.label}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {role.permissions.map((perm) => (
                      <li key={perm} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        {perm}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          {/* Privacy Notice */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">Data Privacy Compliance</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This system handles sensitive personal information about youth members. 
                    All users must comply with church data protection policies and applicable 
                    privacy regulations. Data should only be accessed for legitimate ministry purposes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Configure data handling and visibility options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Require data access justification</p>
                  <p className="text-sm text-muted-foreground">
                    Users must provide a reason when exporting data
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Hide contact details from volunteers</p>
                  <p className="text-sm text-muted-foreground">
                    Phone numbers and addresses only visible to leaders
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Enable audit logging</p>
                  <p className="text-sm text-muted-foreground">
                    Track all data access and modifications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-medium">Auto-delete inactive records</p>
                  <p className="text-sm text-muted-foreground">
                    Remove data for youth inactive for 2+ years
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Confidentiality Notice */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Confidentiality Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-muted/50 text-sm space-y-2">
                <p>
                  <strong>All users of this system acknowledge that:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Youth member information is confidential and must be protected</li>
                  <li>Data may only be used for legitimate youth ministry purposes</li>
                  <li>Sharing data with unauthorized parties is prohibited</li>
                  <li>All access and modifications are logged and audited</li>
                  <li>Violations may result in access revocation and disciplinary action</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
