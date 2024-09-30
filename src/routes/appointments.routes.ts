import { Router } from "express";
import { AppointmentsController } from "../controllers/appointments.controller";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.get(
  "/agendamentos",
  appointmentsController.getAgendamentos.bind(appointmentsController)
);
appointmentsRouter.post(
  "/agendamentos",
  appointmentsController.createAgendamento.bind(appointmentsController)
);

export default appointmentsRouter;
