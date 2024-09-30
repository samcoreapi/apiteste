import { Request, Response, NextFunction } from "express";

const checkBusinessHours = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ message: "Data não fornecida." });
  }

  const appointmentDate = new Date(date);

  const hour = appointmentDate.getUTCHours();
  const minute = appointmentDate.getUTCMinutes();

  if (hour < 8 || hour > 18 || (hour === 18 && minute > 0)) {
    return res
      .status(400)
      .json({
        message: "Agendamentos são permitidos apenas entre 08:00 e 18:00.",
      });
  }

  next();
};

export default checkBusinessHours;
