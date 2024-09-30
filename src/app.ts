import express, { Request, Response, Router } from "express";
import appointmentsRouter from "./routes/appointments.routes";
const app = express();

const routes = Router();
routes.use("/api", appointmentsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("<center><h1>API de Agendamentos</h1></center>");
});

export default app;
