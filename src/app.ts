import express, { Request, Response, Router } from "express";
import { AppointmentsController } from "./controllers/appointments.controller";
import appointmentsRouter from "./routes/appointments.routes";

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

app.use(appointmentsRouter);

// Rota raiz da aplicação
app.get("/", (req: Request, res: Response) => {
  res.send("<center><h1>API de Agendamentos</h1></center>");
});

export default app;
