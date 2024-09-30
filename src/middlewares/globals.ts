// middlewares/validationMiddleware.ts
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import {
  appointmentCreateSchema,
  appointmentUpdateSchema,
} from "../schemas/appointment.schema";
import * as appointmentService from "../services/appointment.service";

// Middleware para validar se os dados do agendamento estão corretos
export const validateCreateAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = await appointmentCreateSchema.parseAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.flatten().fieldErrors });
    }
    next(error);
  }
};

// Middleware para validar se os dados do agendamento estão corretos
export const validateUpdateAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = await appointmentUpdateSchema.parseAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.flatten().fieldErrors });
    }
    next(error);
  }
};

// Middleware para verificar se existe um agendamento pelo ID
export const checkAppointmentExistsById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const appointment = await appointmentService.getAppointmentById(Number(id));
    if (!appointment) {
      return res.status(404).json({ message: "Agendamento não encontrado." });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao verificar agendamento." });
  }
};

// Middleware para verificar se existem agendamentos pelo número de telefone
export const checkAppointmentsExistsByPhone = async (req: Request, res: Response, next: NextFunction) => {
  const { phone_number } = req.params;

  try {
    const appointments = await appointmentService.getAppointmentsByPhone(phone_number);
    if (appointments.length === 0) {
      return res.status(404).json({ message: "Nenhum agendamento encontrado para este número." });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao verificar agendamentos." });
  }
};
