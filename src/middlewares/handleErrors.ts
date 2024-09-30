import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

// Middleware para tratamento de erros
export const handleErrors = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  // Tratamento para erros específicos
  if (error instanceof AppError) {
    return res.status(error.status).json({ message: error.message });
  }

  // Tratamento para erros de JSON inválido
  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ message: "Conteúdo JSON inválido." });
  }

  // Tratamento para erros de validação com Zod
  if (error instanceof ZodError) {
    return res.status(400).json({ message: error.flatten().fieldErrors });
  }

  // Tratamento para erros de token JWT inválido
  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ message: error.message });
  }

  (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  };

  // Log de erro no console para monitoramento
  console.error(error);
  return res.status(500).json({ message: "Erro interno do servidor." });
};
