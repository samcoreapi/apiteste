import AppError from "../errors/AppError";
import { prisma } from "../prisma";

export const createAppointment = async (
  data: any
): Promise<any> => {
  try {
    return await prisma.appointment.create({
      data: {
        ...data,
        date: new Date(data.date),
      },
    });
  } catch (error: any) {
    console.error("Erro ao criar agendamento:", error);
    throw new AppError("Erro ao criar agendamento", 500);
  }
};

export const getAllAppointments = async (): Promise<any> => {
  try {
    return await prisma.appointment.findMany({
      where: { deleted_at: null },
    });
  } catch (error: any) {
    console.error("Erro ao obter agendamentos:", error);
    throw new AppError("Erro ao obter agendamentos", 500);
  }
};

export const getAppointmentById = async (id: number): Promise<any> => {
  return await prisma.appointment.findUnique({
    where: { id: id, deleted_at: null },
  });
};

export const getAppointmentsByPhone = async (
  phone_number: string
): Promise<any[]> => {
  return await prisma.appointment.findMany({
    where: { phone_number: phone_number },
  });
};

// Serviço para buscar agendamentos por data
export const getAppointmentsByDate = async (date: Date): Promise<any[]> => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const appointments: any[] = await prisma.appointment.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
      deleted_at: null,
    },
    orderBy: {
      date: "asc",
    },
  });

  return appointments;
};

// Serviço para buscar agendamentos por data e hora
export const getAppointmentsByDateAndTime = async (
  date: Date,
  time: string
): Promise<any[]> => {
  const [hours, minutes] = time.split(":").map(Number);
  const startTime = new Date(date);
  startTime.setHours(hours, minutes, 0, 0);

  const endTime = new Date(startTime);
  endTime.setMinutes(startTime.getMinutes() + 29); // Intervalo de 30 minutos

  const appointments: any[] = await prisma.appointment.findMany({
    where: {
      date: {
        gte: startTime,
        lte: endTime,
      },
      deleted_at: null,
    },
    orderBy: {
      date: "asc",
    },
  });

  return appointments;
};

export const updateAppointment = async (
  id: number,
  data: any
): Promise<any> => {
  try {
    return await prisma.appointment.update({
      where: { id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    });
  } catch (error: any) {
    console.error("Erro ao atualizar agendamento:", error);
    if (error.code === "P2025") {
      throw new AppError("Agendamento não encontrado", 404);
    }
    throw new AppError("Erro ao atualizar agendamento", 500);
  }
};

export const deleteAppointment = async (id: number): Promise<any> => {
  try {
    return await prisma.appointment.update({
      where: { id },
      data: {
        deleted_at: new Date(),
      },
    });
  } catch (error: any) {
    console.error("Erro ao excluir agendamento:", error);
    if (error.code === "P2025") {
      throw new AppError("Agendamento não encontrado", 404);
    }
    throw new AppError("Erro ao excluir agendamento", 500);
  }
};

export const getAvailableSlots = async (date: Date) => {
  const openingHour = 7;
  const closingHour = 18;
  const slots: Array<{ hour: string; status: string }> = [];

  for (let hour = openingHour; hour < closingHour; hour++) {
    slots.push({ hour: `${hour}:00`, status: "available" });
    slots.push({ hour: `${hour}:30`, status: "available" });
  }

  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const existingAppointments: any[] = await prisma.appointment.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  existingAppointments.forEach((appointment: any) => {
    const appointmentDate = new Date(appointment.date);
    const appointmentHour = appointmentDate.getUTCHours();
    const appointmentMinute = appointmentDate.getUTCMinutes();

    const slotToMark = `${appointmentHour}:${
      appointmentMinute === 0 ? "00" : "30"
    }`;

    const index = slots.findIndex((slot) => slot.hour === slotToMark);
    if (index > -1) {
      slots[index].status = "occupied";
    }
  });

  return slots;
};
