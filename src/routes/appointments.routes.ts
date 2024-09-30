import { Router, Request, Response } from "express";
import { AppointmentsController } from "../controllers/appointments.controller";

const appointmentsRouter: Router = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.get(
  "/appointments",
  appointmentsController.getAgendamentos.bind(appointmentsController)
);

appointmentsRouter.post(
  "/appointments",
  appointmentsController.createAgendamento.bind(appointmentsController)
);

export default appointmentsRouter;
