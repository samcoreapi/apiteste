import { Request, Response, NextFunction } from "express";

const checkWeekend = (req: Request, res: Response, next: NextFunction) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ message: "Data não fornecida." });
  }

  const appointmentDate = new Date(date);
  const dayOfWeek = appointmentDate.getDay();

  // 0 = Domingo, 6 = Sábado
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return res
      .status(400)
      .json({
        message:
          "Agendamentos não são permitidos em dias de sábados e domingos.",
      });
  }

  next();
};

export default checkWeekend;
