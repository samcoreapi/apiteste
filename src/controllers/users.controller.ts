import { Request, Response } from 'express';
import { db } from '../database/database';

export async function createUser(req: Request, res: Response) {
  const { email, password, name } = req.body;

  try {
    const database = await db;
    await database.run(`
            INSERT INTO users (email, password, name)
            VALUES (?, ?, ?)
        `, [email, password, name]);

    res.status(201).json({ email, name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not create user' });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const database = await db;
    const users = await database.all('SELECT * FROM users');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve users' });
  }
}
