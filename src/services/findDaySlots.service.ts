import { prisma } from "../prisma";

export const findUltrasoundDaySlots = async () => {
  const weekdays: string[] = [];
  let today = new Date();

  while (weekdays.length < 8) {
    today.setDate(today.getDate() + 1);
    const dayOfWeek = today.getUTCDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const dateStr = today.toISOString().split("T")[0];
      const appointmentCount = await prisma.appointment.count({
        where: {
          date: {
            gte: new Date(dateStr + "T00:00:00Z"),
            lt: new Date(dateStr + "T23:59:59Z"),
          },
          exam_type: "Ultrassom",
        },
      });
      if (appointmentCount < 20) {
        const formattedDate = `${today
          .getDate()
          .toString()
          .padStart(2, "0")}/${(today.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
        weekdays.push(formattedDate);
      }
    }
  }
  return weekdays;
};

export const findEcoDaySlots = async () => {
  const weekdays: string[] = [];
  let today = new Date();

  while (weekdays.length < 8) {
    today.setDate(today.getDate() + 1);
    const dayOfWeek = today.getUTCDay();

    if (dayOfWeek === 1 || dayOfWeek === 3) {
      const dateStr = today.toISOString().split("T")[0];
      const appointmentCount = await prisma.appointment.count({
        where: {
          date: {
            gte: new Date(dateStr + "T00:00:00Z"),
            lt: new Date(dateStr + "T23:59:59Z"),
          },
          exam_type: "Ecocardiograma",
        },
      });
      if (appointmentCount < 18) {
        const formattedDate = `${today
          .getDate()
          .toString()
          .padStart(2, "0")}/${(today.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
        weekdays.push(formattedDate);
      }
    }
  }
  return weekdays;
};

export const findTomographyDaySlots = async () => {
  const weekdays: string[] = [];
  let today = new Date();

  while (weekdays.length < 8) {
    today.setDate(today.getDate() + 1);
    const dayOfWeek = today.getUTCDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const dateStr = today.toISOString().split("T")[0];
      const appointmentCount = await prisma.appointment.count({
        where: {
          date: {
            gte: new Date(dateStr + "T00:00:00Z"),
            lt: new Date(dateStr + "T23:59:59Z"),
          },
          exam_type: "Tomografia",
          exam_name: "Coronárias",
        },
      });
      if (appointmentCount < 4) {
        const formattedDate = `${today
          .getDate()
          .toString()
          .padStart(2, "0")}/${(today.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
        weekdays.push(formattedDate);
      }
    }
  }
  return weekdays;
};
