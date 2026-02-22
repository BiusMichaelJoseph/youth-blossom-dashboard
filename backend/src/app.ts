import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import youthRoutes from './routes/youths';
import programRoutes from './routes/programs';
import attendanceRoutes from './routes/attendance';
import dashboardRoutes from './routes/dashboard';
import { authenticate } from './middleware/auth';

export const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/youths', authenticate, youthRoutes);
app.use('/api/programs', authenticate, programRoutes);
app.use('/api/attendance', authenticate, attendanceRoutes);
app.use('/api/dashboard', authenticate, dashboardRoutes);
