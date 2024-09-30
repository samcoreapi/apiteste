import { Request, Response } from 'express';
import { db } from '../database/database';

export async function createAppointment(req: Request, res: Response) {
  const { title, date, userId, option1, option2, option3, mult } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const database = await db;
    await database.run(`
            INSERT INTO appointments (title, date, userId, option1, option2, option3, mult)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [title, date, userId, option1, option2, option3, mult]);

    res.status(201).json({ title, date, userId, option1, option2, option3, mult });
  } catch (error) {
    res.status(500).json({ error: 'Could not create appointment' });
  }
}

export async function getAppointments(req: Request, res: Response) {
  try {
    const database = await db;
    const appointments = await database.all('SELECT * FROM appointments');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve appointments' });
  }
}
