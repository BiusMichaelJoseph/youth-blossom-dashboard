import { mockPrograms, mockYouths } from '../../src/data/mockData';
import type { AttendanceRecord, Program, User, Youth } from '../types/models';

export const users: User[] = [
  { id: 'u1', email: 'admin@youthblossom.org', name: 'Admin User', password: 'admin123', role: 'admin' },
  { id: 'u2', email: 'leader@youthblossom.org', name: 'Leader User', password: 'leader123', role: 'leader' },
  { id: 'u3', email: 'volunteer@youthblossom.org', name: 'Volunteer User', password: 'vol123', role: 'volunteer' },
];

export const youths: Youth[] = structuredClone(mockYouths) as Youth[];
export const programs: Program[] = structuredClone(mockPrograms) as Program[];
export const attendanceRecords: AttendanceRecord[] = [];
