// src/routes/logRoutes.ts
import { Router } from "express";
import logController from "../controllers/logController";

const logRouter = Router();

// Proteger todas as rotas de log

// Obter todos os logs
logRouter.get("/logs", logController.getAllLogs);

// Obter logs por usuário
logRouter.get("/log/:userId", logController.getLogsByUser);

export default logRouter;
