import { attendanceRecords, youths } from '../data/store';

const statusWeight: Record<string, number> = {
  present: 1,
  late: 0.75,
  excused: 0.5,
  absent: 0,
};

const engagementWeight: Record<string, number> = {
  very_high: 1,
  high: 0.85,
  medium: 0.65,
  low: 0.35,
  none: 0,
};

export function recalculateYouthEngagement(youthId: string): void {
  const youth = youths.find((item) => item.id === youthId);
  if (!youth) return;

  const history = attendanceRecords.filter((record) => record.youthId === youthId);
  if (!history.length) return;

  const attendanceScore = history.reduce((acc, item) => acc + statusWeight[item.attendanceStatus], 0) / history.length;
  const activityScore = history.reduce((acc, item) => acc + engagementWeight[item.engagementLevel], 0) / history.length;

  youth.attendanceRate = Math.round(attendanceScore * 100);
  youth.engagementScore = Math.round(((attendanceScore * 0.6) + (activityScore * 0.4)) * 100);
  youth.engagementStatus = youth.engagementScore >= 70 ? 'engaged' : youth.engagementScore >= 40 ? 'at-risk' : 'disengaged';
  youth.lastAttendance = history
    .map((item) => item.date)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];
}
