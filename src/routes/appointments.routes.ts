import { Router } from "express";
import { AppointmentsController } from "../controllers/appointments.controller";
import { UsersController } from "../controllers/users.controller";

const router = Router();
const appointmentsController = new AppointmentsController();
const usersController = new UsersController();

// Definindo as rotas de agendamentos
router.get(
  "/appointments",
  appointmentsController.getAgendamentos.bind(appointmentsController)
);
router.post(
  "/appointments",
  appointmentsController.createAgendamento.bind(appointmentsController)
);

// Definindo as rotas de usuários
router.post("/users", usersController.createUser.bind(usersController));
router.post("/session", usersController.login.bind(usersController));

export default router;
