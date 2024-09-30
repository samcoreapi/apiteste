// src/interfaces/authenticatedRequest.ts
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

// Define a estrutura do payload que você adiciona no JWT
export interface UserPayload extends JwtPayload {
  userId: number;
  role: string;
}

// Extende o Express.Request para incluir a propriedade 'user'
export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}
