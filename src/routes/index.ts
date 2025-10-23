import { Router } from 'express';
import userRoutes from './user.routes';
import clientRoutes from './client.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/clients', clientRoutes);

export { router };
