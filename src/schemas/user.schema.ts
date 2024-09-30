// src/schemas/userSchema.ts
import { z } from "zod";

// Esquema para Registro de Usuário
export const registerUserSchema = z.object({
  fullName: z.string().min(1, { message: "Nome completo é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  role: z.string().optional(), // Pode ser "ADMIN", "USER", etc.
  status: z.string().optional(), // Pode ser "ACTIVE", "INACTIVE", etc.
});

// Esquema para Login de Usuário
export const loginUserSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

// Esquema para Atualização de Usuário
export const updateUserSchema = z.object({
  fullName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.string().optional(),
  status: z.string().optional(),
});
