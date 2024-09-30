import { Server as SocketIOServer } from "socket.io";
import express from "express";
import cors from "cors";
import appointmentRouter from "./routes/appointment.routes";
import findDaySlots from "./routes/findDaySlots.routes";
import findATSlots from "./routes/findATSlots.routes";
import { handleErrors } from "./middlewares/handleErrors";
import sanitizeData from "./middlewares/sanitizeData";
import { PlansRouter } from "./routes/plans.routes";
import userRouter from "./routes/user.routes";
import logRouter from "./routes/log.routes";

const app = express();
app.use(cors());

app.use(express.json());

// const swaggerUi = require("swagger-ui-express");
// const swaggerFile = require("./swagger_output.json");

// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
import http from "http";

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: [
      "https://sam-ui-liart.vercel.app/",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.status(200).send("API funcionando corretamente.");
});

app.post("/test-sanitize", sanitizeData, (req, res) => {
  return res.status(200).json(req.body);
});

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.path}`);
  next();
});
app.use(userRouter);
app.use(appointmentRouter);
app.use(findDaySlots);
app.use(findATSlots);
app.use(PlansRouter);
app.use(logRouter);

app.use(handleErrors);

io.on("connection", (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

export const emitNotification = (event: string, data: any) => {
  io.emit(event, data);
};

export default app;
