// controllers/appointment.controller.ts
import { Request, Response, NextFunction } from "express";
import * as appointmentService from "../services/appointment.service";
import {
  AppointmentCreate,
  AppointmentUpdate,
} from "../interfaces/appointment.interface";

export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    plan,
    date,
    phone_number,
    exam_type,
    exam_name,
  }: AppointmentCreate = req.body;

  const lowerCaseExamType = exam_type.toLowerCase();

  const appointment = await appointmentService.createAppointment({
    name,
    plan,
    date,
    phone_number,
    exam_type: lowerCaseExamType,
    exam_name,
  });

  res.status(201).json(appointment);
};

export const getAllAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const appointments = await appointmentService.getAllAppointments();
  res.status(200).json(appointments);
};

export const getAppointmentById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const appointment = await appointmentService.getAppointmentById(Number(id)); // Converta o id para número

    if (!appointment) {
      return res.status(404).json({ message: "Agendamento não encontrado." });
    }

    return res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar agendamento." });
  }
};

// Função para buscar agendamentos pelo número de telefone
export const getAppointmentsByPhone = async (req: Request, res: Response) => {
  const { phone_number } = req.params;

  try {
    const appointments = await appointmentService.getAppointmentsByPhone(
      phone_number
    ); // Usando o serviço

    return res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar agendamentos." });
  }
};

export const getAppointmentsByDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date } = req.params;

  try {
    const appointments = await appointmentService.getAppointmentsByDate(
      new Date(date)
    );
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

// Controller para buscar agendamentos por data e hora
export const getAppointmentsByDateAndTime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date, time } = req.params;

  try {
    const appointments = await appointmentService.getAppointmentsByDateAndTime(
      new Date(date),
      time
    );
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const {
    name,
    plan,
    date,
    phone_number,
    exam_type,
    exam_name,
  }: AppointmentUpdate = req.body;

  const appointment = await appointmentService.updateAppointment(Number(id), {
    name,
    plan,
    date,
    phone_number,
    exam_type,
    exam_name,
  });

  res.status(200).json(appointment);
};

export const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  await appointmentService.deleteAppointment(Number(id));
  res.status(200).json({ message: "Agendamento deletado com sucesso." });
};
