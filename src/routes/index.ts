import { Router } from 'express';
import appointmentsRoutes from './appointments.routes';
import usersRoutes from './users.routes';
import sessionRoutes from './session.routes'; 

const router = Router();

router.use('/appointments', appointmentsRoutes);
router.use('/users', usersRoutes);
router.use('/session', sessionRoutes); 

export default router;
