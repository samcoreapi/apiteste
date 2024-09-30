// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";

interface AuthenticatedRequest extends Request {
  user?: any; // Você pode definir um tipo mais específico conforme necessário
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = userService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

export default authMiddleware;
