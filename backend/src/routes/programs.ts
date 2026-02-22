import { Router } from 'express';
import { programs } from '../data/store';

const router = Router();

router.get('/', (_req, res) => {
  res.json(programs);
});

export default router;
