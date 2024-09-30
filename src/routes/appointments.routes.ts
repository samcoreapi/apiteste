import { Router } from 'express';
import {
  createAppointment,
  getAppointments
} from '../controllers/appointments.controller';

const router = Router();

router.post('/', createAppointment);
router.get('/', getAppointments);

export default router;
