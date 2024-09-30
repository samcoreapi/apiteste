import { prisma } from "../prisma";

class LogService {
  async createLog(userId: number, action: string): Promise<any> {
    try {
      const log = await prisma.log.create({
        data: {
          userId,
          action,
        },
      });
      return log;
    } catch (error) {
      console.error("Erro ao criar log:", error);
      return null; // Opcional: pode decidir não retornar nada ou lançar um erro
    }
  }

  async getAllLogs(): Promise<any[]> {
    return prisma.log.findMany({
      include: { user: true },
      orderBy: { timestamp: "desc" },
    });
  }

  async getLogsByUser(userId: number): Promise<any[]> {
    return prisma.log.findMany({
      where: { userId },
      include: { user: true },
      orderBy: { timestamp: "desc" },
    });
  }
}

export default new LogService();
