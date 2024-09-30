// src/interfaces/logInterfaces.ts
import { infer as Infer } from "zod";
import { getLogsByUserSchema } from "../schemas/log.schema";

// Interface para Consultar Logs por Usuário
export type GetLogsByUserInput = Infer<typeof getLogsByUserSchema>;

// Interface para Resposta de Log
export interface LogResponse {
  id: number;
  userId: number;
  action: string;
  timestamp: Date;
  user: {
    id: number;
    fullName: string;
    email: string;
    // Adicione outros campos conforme necessário
  };
}

// Interface para Criar um Log (pode ser usada internamente)
export interface CreateLogInput {
  userId: number;
  action: string;
}
