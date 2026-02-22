import { Router } from 'express';
import { attendanceRecords, programs, youths } from '../data/store';

const router = Router();

router.get('/metrics', (_req, res) => {
  const activeYouths = youths.filter((item) => item.status === 'active').length;
  const atRiskYouths = youths.filter((item) => item.engagementStatus === 'at-risk' || item.engagementStatus === 'disengaged').length;
  const avgEngagement = youths.length ? Math.round(youths.reduce((acc, item) => acc + item.engagementScore, 0) / youths.length) : 0;
  const avgAttendance = youths.length ? Math.round(youths.reduce((acc, item) => acc + item.attendanceRate, 0) / youths.length) : 0;

  res.json({
    activeYouths,
    atRiskYouths,
    totalPrograms: programs.length,
    attendanceRecords: attendanceRecords.length,
    avgEngagement,
    avgAttendance,
  });
});

export default router;
