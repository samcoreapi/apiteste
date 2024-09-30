// src/schemas/logSchema.ts
import { z } from "zod";

// Esquema para Consultar Todos os Logs
export const getAllLogsSchema = z.object({
  // Nenhum parâmetro necessário para obter todos os logs
});

// Esquema para Consultar Logs por Usuário
export const getLogsByUserSchema = z.object({
  userId: z.string().regex(/^\d+$/, { message: "userId deve ser um número" }),
});
