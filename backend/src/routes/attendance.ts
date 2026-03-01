import { Router } from 'express';
import { z } from 'zod';
import { attendanceRecords, programs, youths } from '../data/store';
import { type AuthenticatedRequest, requireRole } from '../middleware/auth';
import { recalculateYouthEngagement } from '../services/engagement';

const router = Router();

const attendanceSchema = z.object({
  youthId: z.string().min(1),
  programId: z.string().min(1),
  date: z.string().min(1),
  attendanceStatus: z.enum(['present', 'late', 'absent', 'excused']),
  engagementLevel: z.enum(['very_high', 'high', 'medium', 'low', 'none']),
  participatedInActivity: z.boolean(),
  activityNotes: z.string().optional(),
  followUpNotes: z.string().optional(),
});

router.get('/', (req, res) => {
  const youthId = String(req.query.youthId ?? '');
  const programId = String(req.query.programId ?? '');
  const filtered = attendanceRecords.filter((item) => (!youthId || item.youthId === youthId) && (!programId || item.programId === programId));
  res.json(filtered);
});

router.post('/', requireRole('admin', 'leader', 'volunteer'), (req: AuthenticatedRequest, res) => {
  const parsed = attendanceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const youth = youths.find((item) => item.id === parsed.data.youthId);
  const program = programs.find((item) => item.id === parsed.data.programId);
  if (!youth || !program) return res.status(404).json({ message: 'Related youth or program not found' });

  const record = {
    id: crypto.randomUUID(),
    youthName: `${youth.firstName} ${youth.lastName}`,
    programName: program.name,
    recordedAt: new Date().toISOString(),
    recordedBy: req.user?.name,
    ...parsed.data,
  };
  attendanceRecords.unshift(record);
  recalculateYouthEngagement(parsed.data.youthId);
  res.status(201).json(record);
});

export default router;
