import { z } from "zod";
import {
  appointmentSchema,
  appointmentCreateSchema,
  appointmentResponseSchema,
  appointmentUpdateSchema,
  appointmentReadAllSchema,
} from "../schemas/appointment.schema";

export type Appointment = z.infer<typeof appointmentSchema>;
export type AppointmentResponse = z.infer<typeof appointmentResponseSchema>;
export type AppointmentCreate = z.infer<typeof appointmentCreateSchema>;
export type AppointmentUpdate = z.infer<typeof appointmentUpdateSchema>;
export type AppointmentReadAllResponse = z.infer<typeof appointmentReadAllSchema>;
