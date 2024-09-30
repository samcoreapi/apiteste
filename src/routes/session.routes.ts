import { Router } from 'express';
import { loginUser } from '../controllers/session.controller';

const router = Router();

router.post('/', loginUser); // Rota para fazer login e retornar o token

export default router;
