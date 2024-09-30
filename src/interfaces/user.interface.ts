// src/interfaces/userInterfaces.ts
import { infer as Infer } from "zod";
import {
  loginUserSchema,
  registerUserSchema,
  updateUserSchema,
} from "../schemas/user.schema";

// Interface para Registro de Usuário
export type RegisterUserInput = Infer<typeof registerUserSchema>;

// Interface para Login de Usuário
export type LoginUserInput = Infer<typeof loginUserSchema>;

// Interface para Atualização de Usuário
export type UpdateUserInput = Infer<typeof updateUserSchema>;

// Interface para Resposta de Autenticação
export interface AuthResponse {
  token: string;
}

// Interface para Usuário sem Senha
export interface UserResponse {
  id: number;
  fullName: string;
  email: string;
  lastSession?: Date;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  status: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  isEmailVerified: boolean;
  verificationToken?: string;
  lastLogin?: Date;
  logs: any[];
}
