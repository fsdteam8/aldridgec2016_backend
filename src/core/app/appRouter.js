import express from 'express';
import authRoutes from '../../entities/auth/auth.routes.js';
import userRoutes from '../../entities/user/user.routes.js';
import taskRoutes from '../../entities/task/task.routes.js';
import messageRoutes from '../../entities/message/message.routes.js';


const router = express.Router();


router.use('/v1/auth', authRoutes);
router.use('/v1/user', userRoutes);
router.use('/v1/task', taskRoutes);
router.use('/v1/message', messageRoutes);


export default router;
