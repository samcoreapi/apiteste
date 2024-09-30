import { Request, Response } from "express";
import {
  findUltrasoundATSlots,
  findEcoATSlots,
  findTomographyATSlots,
} from "../services/findATSlots.service";

const isWeekend = (day: number, month: number, year: number): boolean => {
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getUTCDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // 0 = Domingo, 6 = Sábado
};

export const findUltrasoundATSlotsController = async (
  req: Request,
  res: Response
) => {
  const { day, month, year } = req.query;

  if (!day || !month || !year) {
    return res
      .status(400)
      .json({ message: "Por favor, forneça dia, mês e ano." });
  }

  const dayNumber = Number(day);
  const monthNumber = Number(month);
  const yearNumber = Number(year);

  if (isNaN(dayNumber) || isNaN(monthNumber) || isNaN(yearNumber)) {
    return res
      .status(400)
      .json({ message: "Dia, mês e ano devem ser números." });
  }

  if (isWeekend(dayNumber, monthNumber, yearNumber)) {
    return res
      .status(400)
      .json({ message: "Não agendamos estes exames aos finais de semana." });
  }

  try {
    const availableSlots = await findUltrasoundATSlots(
      dayNumber,
      monthNumber,
      yearNumber
    );
    console.log(availableSlots);
    return res.status(200).json(availableSlots);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar horários." });
  }
};

export const findEcoATSlotsController = async (req: Request, res: Response) => {
  const { day, month, year } = req.query;

  if (!day || !month || !year) {
    return res
      .status(400)
      .json({ message: "Por favor, forneça dia, mês e ano." });
  }

  const dayNumber = Number(day);
  const monthNumber = Number(month);
  const yearNumber = Number(year);

  if (isNaN(dayNumber) || isNaN(monthNumber) || isNaN(yearNumber)) {
    return res
      .status(400)
      .json({ message: "Dia, mês e ano devem ser números." });
  }

  // Verifica se é final de semana
  if (isWeekend(dayNumber, monthNumber, yearNumber)) {
    return res
      .status(400)
      .json({ message: "Não agendamos estes exames aos finais de semana." });
  }

  // Verifica se o dia é segunda ou quarta
  const date = new Date(yearNumber, monthNumber - 1, dayNumber);
  const dayOfWeek = date.getUTCDay(); // 0 = Domingo, 1 = Segunda, 2 = Terça, ..., 6 = Sábado
  if (dayOfWeek !== 1 && dayOfWeek !== 3) {
    // 1 = Segunda, 3 = Quarta
    return res.status(400).json({
      message: "Este exame é realizado apenas às segundas e quartas-feiras.",
    });
  }

  try {
    const availableSlots = await findEcoATSlots(
      dayNumber,
      monthNumber,
      yearNumber
    );
    console.log(availableSlots);
    return res.status(200).json(availableSlots);
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

export const findTomographyATSlotsController = async (
  req: Request,
  res: Response
) => {
  const { day, month, year } = req.query;

  if (!day || !month || !year) {
    return res
      .status(400)
      .json({ message: "Por favor, forneça dia, mês e ano." });
  }

  const dayNumber = Number(day);
  const monthNumber = Number(month);
  const yearNumber = Number(year);

  if (isNaN(dayNumber) || isNaN(monthNumber) || isNaN(yearNumber)) {
    return res
      .status(400)
      .json({ message: "Dia, mês e ano devem ser números." });
  }

  if (isWeekend(dayNumber, monthNumber, yearNumber)) {
    return res
      .status(400)
      .json({ message: "Não agendamos estes exames aos finais de semana." });
  }

  try {
    const availableSlots = await findTomographyATSlots(
      dayNumber,
      monthNumber,
      yearNumber
    );
    console.log(availableSlots);
    return res.status(200).json(availableSlots);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar horários." });
  }
};
