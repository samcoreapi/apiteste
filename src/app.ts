import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import { initializeDatabase } from './database/database';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api', routes);



export default app;