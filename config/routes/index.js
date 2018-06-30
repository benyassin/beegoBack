import express from 'express';
import userRoutes from './user';
import authRoutes from './auth';
import campaignRoutes from './campaign';
import formsRoutes from './form';
import areaRoutes from './area';
import zoneRoutes from './zone';

const router = express.Router();

router.get('/api-status', (req, res) =>
  res.json({ status: "ok" }));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/forms', formsRoutes);
router.use('/areas', areaRoutes);
router.use('/zones', zoneRoutes);

export default router