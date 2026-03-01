import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../src/app';

describe('backend api', () => {
  it('authenticates and returns youth list', async () => {
    const login = await request(app).post('/api/auth/login').send({
      email: 'admin@youthblossom.org',
      password: 'admin123',
    });

    expect(login.status).toBe(200);
    const token = login.body.token;

    const youths = await request(app)
      .get('/api/youths')
      .set('Authorization', `Bearer ${token}`);

    expect(youths.status).toBe(200);
    expect(Array.isArray(youths.body)).toBe(true);
    expect(youths.body.length).toBeGreaterThan(0);
  });
});
