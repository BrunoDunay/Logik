import { Router } from 'express';
import * as settings from '../controllers/settings.controller.js';
import { requireAuth } from '../middlewares/require-auth.js';
import { authRoutes } from './auth.routes.js';

export const apiRoutes = Router()
  .get('/health', (_req, res) => res.json({ status: 'ok' }))
  .use('/auth', authRoutes)
  .get('/settings', settings.getPublicSettings)
  .put('/settings/:section', requireAuth, settings.updateSettings);
