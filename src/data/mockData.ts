// Mock data for Youth Ministry Dashboard

export interface Youth {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  avatar?: string;
  address: string;
  educationStatus: 'high_school' | 'college' | 'working' | 'unemployed';
  occupation?: string;
  joinDate: string;
  status: 'active' | 'inactive';
  engagementScore: number; // 0-100
  engagementStatus: 'engaged' | 'at-risk' | 'disengaged';
  smallGroup?: string;
  mentor?: string;
  leadershipLevel: 'none' | 'emerging' | 'developing' | 'established';
  discipleshipStatus: 'new_believer' | 'growing' | 'mature' | 'leader';
  attendanceRate: number; // percentage
  lastAttendance?: string;
  notes?: string;
  ministryAreas: string[];
  ageGroup: '13-15' | '16-18' | '19-24' | '25-30';
}

export interface Program {
  id: string;
  name: string;
  description: string;
  category: 'worship' | 'discipleship' | 'outreach' | 'fellowship' | 'leadership';
  startDate: string;
  endDate?: string;
  isActive: boolean;
  participantCount: number;
  maxCapacity?: number;
  leader: string;
  schedule: string;
  averageAttendance: number;
  engagementScore: number;
}

export interface AttendanceRecord {
  id: string;
  youthId: string;
  programId: string;
  date: string;
  present: boolean;
}

export interface SmallGroup {
  id: string;
  name: string;
  leader: string;
  memberCount: number;
  meetingDay: string;
  meetingTime: string;
  location: string;
}

// Generate realistic mock youths
export const mockYouths: Youth[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 123-4567',
    dateOfBirth: '2002-03-15',
    gender: 'female',
    address: '123 Oak Street, Springfield',
    educationStatus: 'college',
    occupation: 'Student',
    joinDate: '2021-01-15',
    status: 'active',
    engagementScore: 92,
    engagementStatus: 'engaged',
    smallGroup: 'Young Adults Connect',
    mentor: 'Pastor Michael',
    leadershipLevel: 'developing',
    discipleshipStatus: 'mature',
    attendanceRate: 95,
    lastAttendance: '2026-01-26',
    ministryAreas: ['Worship', 'Youth Outreach'],
    ageGroup: '19-24',
  },
  {
    id: '2',
    firstName: 'Marcus',
    lastName: 'Williams',
    email: 'marcus.w@email.com',
    phone: '(555) 234-5678',
    dateOfBirth: '2005-07-22',
    gender: 'male',
    address: '456 Maple Avenue, Springfield',
    educationStatus: 'high_school',
    joinDate: '2022-06-10',
    status: 'active',
    engagementScore: 78,
    engagementStatus: 'engaged',
    smallGroup: 'Teen Warriors',
    leadershipLevel: 'emerging',
    discipleshipStatus: 'growing',
    attendanceRate: 82,
    lastAttendance: '2026-01-26',
    ministryAreas: ['Media', 'Welcome Team'],
    ageGroup: '16-18',
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Chen',
    email: 'emily.c@email.com',
    phone: '(555) 345-6789',
    dateOfBirth: '2000-11-08',
    gender: 'female',
    address: '789 Pine Road, Springfield',
    educationStatus: 'working',
    occupation: 'Graphic Designer',
    joinDate: '2019-09-01',
    status: 'active',
    engagementScore: 88,
    engagementStatus: 'engaged',
    smallGroup: 'Young Professionals',
    mentor: 'Deacon James',
    leadershipLevel: 'established',
    discipleshipStatus: 'leader',
    attendanceRate: 90,
    lastAttendance: '2026-01-19',
    ministryAreas: ['Creative Arts', 'Discipleship'],
    ageGroup: '25-30',
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Martinez',
    email: 'david.m@email.com',
    phone: '(555) 456-7890',
    dateOfBirth: '2007-04-30',
    gender: 'male',
    address: '321 Elm Street, Springfield',
    educationStatus: 'high_school',
    joinDate: '2023-02-14',
    status: 'active',
    engagementScore: 45,
    engagementStatus: 'at-risk',
    smallGroup: 'Teen Warriors',
    leadershipLevel: 'none',
    discipleshipStatus: 'new_believer',
    attendanceRate: 55,
    lastAttendance: '2026-01-05',
    notes: 'Missing several services, needs follow-up',
    ministryAreas: [],
    ageGroup: '16-18',
  },
  {
    id: '5',
    firstName: 'Olivia',
    lastName: 'Thompson',
    email: 'olivia.t@email.com',
    phone: '(555) 567-8901',
    dateOfBirth: '2003-09-12',
    gender: 'female',
    address: '654 Birch Lane, Springfield',
    educationStatus: 'college',
    occupation: 'Student',
    joinDate: '2020-08-20',
    status: 'active',
    engagementScore: 85,
    engagementStatus: 'engaged',
    smallGroup: 'Young Adults Connect',
    mentor: 'Sister Grace',
    leadershipLevel: 'developing',
    discipleshipStatus: 'mature',
    attendanceRate: 88,
    lastAttendance: '2026-01-26',
    ministryAreas: ['Children\'s Ministry', 'Worship'],
    ageGroup: '19-24',
  },
  {
    id: '6',
    firstName: 'James',
    lastName: 'Brown',
    email: 'james.b@email.com',
    phone: '(555) 678-9012',
    dateOfBirth: '2008-01-25',
    gender: 'male',
    address: '987 Cedar Court, Springfield',
    educationStatus: 'high_school',
    joinDate: '2024-01-10',
    status: 'active',
    engagementScore: 72,
    engagementStatus: 'engaged',
    smallGroup: 'Junior Youth',
    leadershipLevel: 'none',
    discipleshipStatus: 'growing',
    attendanceRate: 75,
    lastAttendance: '2026-01-26',
    ministryAreas: ['Ushering'],
    ageGroup: '13-15',
  },
  {
    id: '7',
    firstName: 'Sophia',
    lastName: 'Davis',
    email: 'sophia.d@email.com',
    phone: '(555) 789-0123',
    dateOfBirth: '2001-06-18',
    gender: 'female',
    address: '147 Walnut Street, Springfield',
    educationStatus: 'working',
    occupation: 'Nurse',
    joinDate: '2018-03-05',
    status: 'inactive',
    engagementScore: 25,
    engagementStatus: 'disengaged',
    leadershipLevel: 'none',
    discipleshipStatus: 'growing',
    attendanceRate: 20,
    lastAttendance: '2025-11-10',
    notes: 'Work schedule conflicts, reached out via phone',
    ministryAreas: [],
    ageGroup: '19-24',
  },
  {
    id: '8',
    firstName: 'Ethan',
    lastName: 'Wilson',
    email: 'ethan.w@email.com',
    phone: '(555) 890-1234',
    dateOfBirth: '2004-12-03',
    gender: 'male',
    address: '258 Spruce Avenue, Springfield',
    educationStatus: 'college',
    occupation: 'Student',
    joinDate: '2021-09-15',
    status: 'active',
    engagementScore: 65,
    engagementStatus: 'engaged',
    smallGroup: 'Young Adults Connect',
    leadershipLevel: 'emerging',
    discipleshipStatus: 'growing',
    attendanceRate: 70,
    lastAttendance: '2026-01-19',
    ministryAreas: ['Sound/Tech', 'Youth Outreach'],
    ageGroup: '19-24',
  },
  {
    id: '9',
    firstName: 'Ava',
    lastName: 'Garcia',
    email: 'ava.g@email.com',
    phone: '(555) 901-2345',
    dateOfBirth: '2006-08-14',
    gender: 'female',
    address: '369 Ash Boulevard, Springfield',
    educationStatus: 'high_school',
    joinDate: '2022-11-20',
    status: 'active',
    engagementScore: 38,
    engagementStatus: 'at-risk',
    smallGroup: 'Teen Warriors',
    leadershipLevel: 'none',
    discipleshipStatus: 'new_believer',
    attendanceRate: 45,
    lastAttendance: '2025-12-22',
    notes: 'Family issues affecting attendance',
    ministryAreas: [],
    ageGroup: '16-18',
  },
  {
    id: '10',
    firstName: 'Noah',
    lastName: 'Anderson',
    email: 'noah.a@email.com',
    phone: '(555) 012-3456',
    dateOfBirth: '1998-02-28',
    gender: 'male',
    address: '741 Hickory Drive, Springfield',
    educationStatus: 'working',
    occupation: 'Software Developer',
    joinDate: '2017-05-12',
    status: 'active',
    engagementScore: 95,
    engagementStatus: 'engaged',
    smallGroup: 'Young Professionals',
    mentor: 'Pastor Michael',
    leadershipLevel: 'established',
    discipleshipStatus: 'leader',
    attendanceRate: 92,
    lastAttendance: '2026-01-26',
    ministryAreas: ['Discipleship', 'Media', 'Leadership Development'],
    ageGroup: '25-30',
  },
  {
    id: '11',
    firstName: 'Isabella',
    lastName: 'Taylor',
    email: 'isabella.t@email.com',
    phone: '(555) 111-2222',
    dateOfBirth: '2009-05-20',
    gender: 'female',
    address: '852 Poplar Lane, Springfield',
    educationStatus: 'high_school',
    joinDate: '2024-03-01',
    status: 'active',
    engagementScore: 80,
    engagementStatus: 'engaged',
    smallGroup: 'Junior Youth',
    leadershipLevel: 'none',
    discipleshipStatus: 'growing',
    attendanceRate: 85,
    lastAttendance: '2026-01-26',
    ministryAreas: ['Choir'],
    ageGroup: '13-15',
  },
  {
    id: '12',
    firstName: 'Liam',
    lastName: 'Moore',
    email: 'liam.m@email.com',
    phone: '(555) 222-3333',
    dateOfBirth: '2002-10-10',
    gender: 'male',
    address: '963 Willow Way, Springfield',
    educationStatus: 'college',
    occupation: 'Student',
    joinDate: '2020-01-18',
    status: 'active',
    engagementScore: 55,
    engagementStatus: 'at-risk',
    smallGroup: 'Young Adults Connect',
    leadershipLevel: 'emerging',
    discipleshipStatus: 'growing',
    attendanceRate: 60,
    lastAttendance: '2026-01-12',
    notes: 'Busy with exams, check in after finals',
    ministryAreas: ['Worship'],
    ageGroup: '19-24',
  },
];

export const mockPrograms: Program[] = [
  {
    id: '1',
    name: 'Sunday Youth Service',
    description: 'Weekly worship gathering for all youth ages 13-30',
    category: 'worship',
    startDate: '2020-01-01',
    isActive: true,
    participantCount: 45,
    maxCapacity: 60,
    leader: 'Pastor Michael',
    schedule: 'Sundays at 10:00 AM',
    averageAttendance: 38,
    engagementScore: 85,
  },
  {
    id: '2',
    name: 'Youth Bible Study',
    description: 'Mid-week deep dive into Scripture',
    category: 'discipleship',
    startDate: '2020-03-15',
    isActive: true,
    participantCount: 28,
    maxCapacity: 35,
    leader: 'Deacon James',
    schedule: 'Wednesdays at 7:00 PM',
    averageAttendance: 22,
    engagementScore: 78,
  },
  {
    id: '3',
    name: 'Community Outreach',
    description: 'Monthly service projects in the local community',
    category: 'outreach',
    startDate: '2021-06-01',
    isActive: true,
    participantCount: 20,
    leader: 'Sister Grace',
    schedule: 'First Saturday of each month',
    averageAttendance: 15,
    engagementScore: 72,
  },
  {
    id: '4',
    name: 'Youth Fellowship Night',
    description: 'Fun activities and games to build community',
    category: 'fellowship',
    startDate: '2019-09-01',
    isActive: true,
    participantCount: 35,
    maxCapacity: 50,
    leader: 'Marcus Williams',
    schedule: 'Fridays at 6:30 PM',
    averageAttendance: 30,
    engagementScore: 90,
  },
  {
    id: '5',
    name: 'Leadership Academy',
    description: 'Training program for emerging youth leaders',
    category: 'leadership',
    startDate: '2022-01-15',
    isActive: true,
    participantCount: 12,
    maxCapacity: 15,
    leader: 'Pastor Michael',
    schedule: 'Saturdays at 9:00 AM (Monthly)',
    averageAttendance: 10,
    engagementScore: 95,
  },
  {
    id: '6',
    name: 'Summer Camp 2025',
    description: 'Annual youth retreat with worship, teaching, and activities',
    category: 'fellowship',
    startDate: '2025-07-15',
    endDate: '2025-07-20',
    isActive: false,
    participantCount: 40,
    maxCapacity: 50,
    leader: 'Youth Ministry Team',
    schedule: 'July 15-20, 2025',
    averageAttendance: 40,
    engagementScore: 92,
  },
];

export const mockSmallGroups: SmallGroup[] = [
  {
    id: '1',
    name: 'Young Adults Connect',
    leader: 'Emily Chen',
    memberCount: 12,
    meetingDay: 'Tuesday',
    meetingTime: '7:00 PM',
    location: 'Church Fellowship Hall',
  },
  {
    id: '2',
    name: 'Teen Warriors',
    leader: 'Marcus Williams',
    memberCount: 8,
    meetingDay: 'Thursday',
    meetingTime: '6:30 PM',
    location: 'Youth Room',
  },
  {
    id: '3',
    name: 'Young Professionals',
    leader: 'Noah Anderson',
    memberCount: 10,
    meetingDay: 'Wednesday',
    meetingTime: '7:30 PM',
    location: 'Coffee House Ministry Center',
  },
  {
    id: '4',
    name: 'Junior Youth',
    leader: 'Sarah Johnson',
    memberCount: 6,
    meetingDay: 'Saturday',
    meetingTime: '4:00 PM',
    location: 'Youth Room',
  },
];

// Dashboard metrics
export const dashboardMetrics = {
  totalYouths: 48,
  activeYouths: 42,
  inactiveYouths: 6,
  retentionRate: 87.5,
  averageAttendance: 72,
  newThisMonth: 3,
  atRiskCount: 5,
  activePrograms: 5,
};

// Attendance trend data (last 12 months)
export const attendanceTrendData = [
  { month: 'Feb 25', attendance: 35, capacity: 50 },
  { month: 'Mar 25', attendance: 38, capacity: 50 },
  { month: 'Apr 25', attendance: 42, capacity: 50 },
  { month: 'May 25', attendance: 40, capacity: 50 },
  { month: 'Jun 25', attendance: 32, capacity: 50 },
  { month: 'Jul 25', attendance: 28, capacity: 50 },
  { month: 'Aug 25', attendance: 35, capacity: 50 },
  { month: 'Sep 25', attendance: 45, capacity: 55 },
  { month: 'Oct 25', attendance: 48, capacity: 55 },
  { month: 'Nov 25', attendance: 44, capacity: 55 },
  { month: 'Dec 25', attendance: 38, capacity: 55 },
  { month: 'Jan 26', attendance: 42, capacity: 60 },
];

// Program participation data
export const programParticipationData = [
  { name: 'Sunday Service', participants: 45, category: 'worship' },
  { name: 'Bible Study', participants: 28, category: 'discipleship' },
  { name: 'Fellowship Night', participants: 35, category: 'fellowship' },
  { name: 'Outreach', participants: 20, category: 'outreach' },
  { name: 'Leadership', participants: 12, category: 'leadership' },
];

// Age distribution
export const ageDistributionData = [
  { ageGroup: '13-15', count: 8, percentage: 17 },
  { ageGroup: '16-18', count: 14, percentage: 29 },
  { ageGroup: '19-24', count: 18, percentage: 38 },
  { ageGroup: '25-30', count: 8, percentage: 17 },
];

// Engagement distribution
export const engagementDistributionData = [
  { status: 'Engaged', count: 35, percentage: 73 },
  { status: 'At Risk', count: 8, percentage: 17 },
  { status: 'Disengaged', count: 5, percentage: 10 },
];
