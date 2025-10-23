import { Router } from 'express';
import userRoutes from './user.routes';
import clientRoutes from './client.routes';
import articleRoutes from './article.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/clients', clientRoutes);
router.use('/articles', articleRoutes);

export { router };
