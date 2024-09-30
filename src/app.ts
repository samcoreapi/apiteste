import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import { initializeDatabase } from './database/database';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api', routes);

app.get("/", (req: Request, res: Response) => {
  res.send("<center><h1>API de Agendamentos</h1></center>");
});

export default app;