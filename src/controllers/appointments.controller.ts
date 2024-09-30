import { Request, Response } from "express";
import { AppointmentsService } from "../services/appointments.service";

export class AppointmentsController {
  private appointmentsService: AppointmentsService;

  constructor() {
    this.appointmentsService = new AppointmentsService();
  }

  async getAgendamentos(req: Request, res: Response) {
    try {
      const agendamentos = await this.appointmentsService.getAgendamentos();
      res.json(agendamentos);
    } catch (error) {
      res.status(500).json({ message: "Erro ao obter agendamentos." });
    }
  }

  async createAgendamento(req: Request, res: Response) {
    const { title, date, name, option1, option2, option3, mult } = req.body;
    try {
      const novoAgendamento = await this.appointmentsService.createAgendamento(
        title,
        date,
        name,
        option1,
        option2,
        option3,
        mult
      );
      res.status(201).json(novoAgendamento);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar agendamento." });
    }
  }
}
