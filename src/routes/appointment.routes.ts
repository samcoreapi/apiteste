import { Router } from "express";
import * as appointmentController from "../controllers/appointment.controller";
import {
  validateCreateAppointment,
  validateUpdateAppointment,
  checkAppointmentExistsById,
  checkAppointmentsExistsByPhone,
} from "../middlewares/globals";
import sanitizeData from "../middlewares/sanitizeData";
import checkWeekend from "../middlewares/checkWeekend";
import checkBusinessHours from "../middlewares/checkBusinessHours";
import { getAppointmentsByDate, getAppointmentsByDateAndTime } from "../services/appointment.service";

const appointment = Router();

appointment.post(
  "/appointment",
  sanitizeData,
  checkWeekend,
  checkBusinessHours,
  validateCreateAppointment,
  appointmentController.createAppointment
);

appointment.get("/appointment", appointmentController.getAllAppointments);

appointment.get(
  "/appointment/:id",
  checkAppointmentExistsById,
  appointmentController.getAppointmentById
);

appointment.get(
  "/appointment/phone/:phone_number",
  checkAppointmentsExistsByPhone,
  appointmentController.getAppointmentsByPhone
);

// Rota para buscar agendamentos por data
appointment.get("/appointment/date/:date", getAppointmentsByDate);

appointment.patch(
  "/appointment/:id",
  sanitizeData,
  checkWeekend,
  checkBusinessHours,
  validateUpdateAppointment,
  checkAppointmentExistsById,
  appointmentController.updateAppointment
);

appointment.delete(
  "/appointment/:id",
  checkAppointmentExistsById,
  appointmentController.deleteAppointment
);

export default appointment;
