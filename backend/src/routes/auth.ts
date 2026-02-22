import { Router } from 'express';
import { z } from 'zod';
import { users } from '../data/store';
import { signJwt } from '../middleware/auth';

const router = Router();

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(3) });

router.post('/login', (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid login payload', errors: parsed.error.flatten() });
  }

  const user = users.find((item) => item.email === parsed.data.email && item.password === parsed.data.password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signJwt({ id: user.id, email: user.email, role: user.role, name: user.name });
  return res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
});

export default router;
