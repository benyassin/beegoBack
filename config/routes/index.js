import express from 'express';
import userRoutes from './user';
import authRoutes from './auth';
import campaignRoutes from './campaign';
import formsRoutes from './form';
import areaRoutes from './area';
import zoneRoutes from './zone';
import organizationRoutes from './organization';
import collectRoutes from './collect';
import entityRoutes from './entity';

const router = express.Router();

router.get('/api-status', (req, res) => res.json({ status: "ok" }));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/forms', formsRoutes);
router.use('/areas', areaRoutes);
router.use('/zones', zoneRoutes);
router.use('/organization',organizationRoutes);
router.use('/collect', collectRoutes);
router.use('/entity', entityRoutes);


export default router