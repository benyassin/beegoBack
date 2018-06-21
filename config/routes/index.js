import express from 'express';
import userRoutes from './user';
import authRoutes from './auth';
import campaignRoutes from './campaign'
import formsRoutes from './form'

const router = express.Router();

router.get('/api-status', (req, res) =>
  res.json({ status: "ok" }));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/forms', formsRoutes);

export default router