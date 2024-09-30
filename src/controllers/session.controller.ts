import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../database/database';

const JWT_SECRET = 'seu_segredo_aqui'; // Use um segredo forte e armazene em um local seguro

export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const database = await db;

        // Verifica se o usuário existe
        const user = await database.get('SELECT * FROM users WHERE email = ?', [email]);

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        // Gera um token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
}
