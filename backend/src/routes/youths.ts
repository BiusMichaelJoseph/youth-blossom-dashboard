import { Router } from 'express';
import { z } from 'zod';
import { youths } from '../data/store';
import { requireRole } from '../middleware/auth';

const router = Router();

const youthSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  dateOfBirth: z.string().min(1),
  gender: z.enum(['male', 'female']),
  address: z.string().min(1),
  educationStatus: z.enum(['high_school', 'college', 'working', 'unemployed']),
  occupation: z.string().optional(),
  joinDate: z.string().min(1),
  status: z.enum(['active', 'inactive']).default('active'),
  smallGroup: z.string().optional(),
  mentor: z.string().optional(),
  leadershipLevel: z.enum(['none', 'emerging', 'developing', 'established']).default('none'),
  discipleshipStatus: z.enum(['new_believer', 'growing', 'mature', 'leader']).default('growing'),
  notes: z.string().optional(),
  ministryAreas: z.array(z.string()).default([]),
  ageGroup: z.enum(['13-15', '16-18', '19-24', '25-30']),
});

router.get('/', (req, res) => {
  const search = String(req.query.search ?? '').toLowerCase();
  const status = String(req.query.status ?? '');
  const ageGroup = String(req.query.ageGroup ?? '');
  const data = youths.filter((youth) => {
    const matchesSearch = !search || `${youth.firstName} ${youth.lastName}`.toLowerCase().includes(search) || youth.email.toLowerCase().includes(search);
    const matchesStatus = !status || youth.status === status;
    const matchesAgeGroup = !ageGroup || youth.ageGroup === ageGroup;
    return matchesSearch && matchesStatus && matchesAgeGroup;
  });
  return res.json(data);
});

router.post('/', requireRole('admin', 'leader'), (req, res) => {
  const parsed = youthSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const record = {
    id: crypto.randomUUID(),
    engagementScore: 0,
    engagementStatus: 'disengaged' as const,
    attendanceRate: 0,
    ...parsed.data,
  };
  youths.unshift(record);
  return res.status(201).json(record);
});

router.put('/:id', requireRole('admin', 'leader'), (req, res) => {
  const parsed = youthSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const index = youths.findIndex((item) => item.id === req.params.id);
  if (index < 0) return res.status(404).json({ message: 'Youth not found' });

  youths[index] = { ...youths[index], ...parsed.data };
  return res.json(youths[index]);
});

router.delete('/:id', requireRole('admin'), (req, res) => {
  const index = youths.findIndex((item) => item.id === req.params.id);
  if (index < 0) return res.status(404).json({ message: 'Youth not found' });
  youths.splice(index, 1);
  return res.status(204).send();
});

export default router;
