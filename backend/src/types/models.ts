export type Role = 'admin' | 'leader' | 'volunteer';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: Role;
}

export interface Youth {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  address: string;
  educationStatus: 'high_school' | 'college' | 'working' | 'unemployed';
  occupation?: string;
  joinDate: string;
  status: 'active' | 'inactive';
  engagementScore: number;
  engagementStatus: 'engaged' | 'at-risk' | 'disengaged';
  smallGroup?: string;
  mentor?: string;
  leadershipLevel: 'none' | 'emerging' | 'developing' | 'established';
  discipleshipStatus: 'new_believer' | 'growing' | 'mature' | 'leader';
  attendanceRate: number;
  lastAttendance?: string;
  notes?: string;
  ministryAreas: string[];
  ageGroup: '13-15' | '16-18' | '19-24' | '25-30';
}

export interface Program {
  id: string;
  name: string;
  description: string;
  category: 'worship' | 'discipleship' | 'outreach' | 'fellowship' | 'leadership' | 'sabbath_school';
  startDate: string;
  endDate?: string;
  isActive: boolean;
  participantCount: number;
  maxCapacity?: number;
  leader: string;
  schedule: string;
  scheduleType: 'sabbath' | 'weekday' | 'special';
  averageAttendance: number;
  engagementScore: number;
}

export interface AttendanceRecord {
  id: string;
  youthId: string;
  youthName: string;
  programId: string;
  programName: string;
  date: string;
  attendanceStatus: 'present' | 'late' | 'absent' | 'excused';
  engagementLevel: 'very_high' | 'high' | 'medium' | 'low' | 'none';
  participatedInActivity: boolean;
  activityNotes?: string;
  followUpNotes?: string;
  recordedAt: string;
  recordedBy?: string;
}
