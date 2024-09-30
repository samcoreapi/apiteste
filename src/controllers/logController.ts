// src/controllers/logController.ts
import { Request, Response, NextFunction } from "express";
import logService from "../services/log.service";

class LogController {
  async getAllLogs(req: Request, res: Response, next: NextFunction) {
    const logs = await logService.getAllLogs();
    res.status(200).json(logs);
  }

  async getLogsByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.userId, 10);
      const logs = await logService.getLogsByUser(userId);
      res.status(200).json(logs);
    } catch (error) {
      next(error);
    }
  }
}

export default new LogController();
