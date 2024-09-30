import { generateECOAvailableSlots } from "../utils/generateECOAvailableSlots";
import { generateAvailableSlots } from "../utils/generateAvailableSlots";
import { prisma } from "../prisma";

export const findUltrasoundATSlots = async (
  day: number,
  month: number,
  year: number
): Promise<string[]> => {
  const date = new Date(year, month - 1, day);
  const formattedDate = date.toISOString().split("T")[0];

  const availableSlots: string[] = generateAvailableSlots();

  const appointments: any[] = await prisma.appointment.findMany({
    where: {
      date: {
        gte: new Date(formattedDate + "T00:00:00Z"),
        lt: new Date(formattedDate + "T23:59:59Z"),
      },
      exam_type: { in: ["Ultrassom", "ultrassom"] },
      deleted_at: null,
    },
    select: {
      date: true,
    },
  });

  const slotCounts = appointments.reduce(
    (counts: { [key: string]: number }, appointment: any) => {
      const time = appointment.date.toISOString().split("T")[1].substring(0, 5);
      counts[time] = (counts[time] || 0) + 1;
      return counts;
    },
    {}
  );

  const capacityPerSlot = 1;

  return availableSlots.filter((slot) => {
    const count = slotCounts[slot] || 0;
    return count < capacityPerSlot;
  });
};

export const findEcoATSlots = async (
  day: number,
  month: number,
  year: number
): Promise<string[]> => {
  const date = new Date(year, month - 1, day);
  const formattedDate = date.toISOString().split("T")[0];

  const dayOfWeek = date.getUTCDay();
  if (dayOfWeek !== 1 && dayOfWeek !== 3) {
    throw new Error(
      "Este exame não é realizado neste dia, apenas às segundas e às quartas."
    );
  }

  const availableSlots: string[] = generateECOAvailableSlots();

  const appointments: any[] = await prisma.appointment.findMany({
    where: {
      date: {
        gte: new Date(`${formattedDate}T00:00:00Z`),
        lt: new Date(`${formattedDate}T23:59:59Z`),
      },
      exam_type: { in: ["Ecocardiograma", "ecocardiograma"] },
      deleted_at: null,
    },
    select: {
      date: true,
    },
  });

  // Conta os agendamentos por horário
  const slotCounts = appointments.reduce(
    (counts: { [key: string]: number }, appointment: any) => {
      const time = appointment.date.toISOString().split("T")[1].substring(0, 5);
      counts[time] = (counts[time] || 0) + 1;
      return counts;
    },
    {}
  );

  const capacityPerSlot = 2; // Capacidade máxima por horário para Ecocardiograma

  // Filtra os horários disponíveis com base na capacidade
  return availableSlots.filter((slot) => {
    const count = slotCounts[slot] || 0;
    return count < capacityPerSlot;
  });
};

const availableSlots: string[] = ["08:00", "08:10", "14:00", "14:10"];

export const findTomographyATSlots = async (
  day: number,
  month: number,
  year: number
): Promise<string[]> => {
  const date = new Date(year, month - 1, day);
  const formattedDate = date.toISOString().split("T")[0];

  const appointments: any[] = await prisma.appointment.findMany({
    where: {
      date: {
        gte: new Date(formattedDate + "T00:00:00Z"),
        lt: new Date(formattedDate + "T23:59:59Z"),
      },
      exam_type: { in: ["Tomografia", "tomografia"] },
      deleted_at: null,
    },
    select: {
      date: true,
    },
  });

  const bookedSlots = appointments.map((appointment: any) => {
    return appointment.date.toISOString().split("T")[1].substring(0, 5);
  });

  return availableSlots.filter((slot) => !bookedSlots.includes(slot));
};
