// src/middlewares/generalLogMiddleware.ts
import { Request, Response, NextFunction } from "express";
import logService from "../services/log.service";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const generalLogMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.userId) {
    const userId = req.user.userId;
    const action = `${req.method} ${req.originalUrl}`;
    await logService.createLog(userId, action);
  }
  next();
};

export default generalLogMiddleware;
