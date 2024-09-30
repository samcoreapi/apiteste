import { Request, Response, NextFunction, response } from "express";
import * as findUltrasoundDaySlotsService from "../services/findDaySlots.service";

export const findUltrasoundDaySlots = async (req: Request, res: Response) => {
  const response = await findUltrasoundDaySlotsService.findUltrasoundDaySlots();
  return res.status(200).json(response);
};

export const findEcoDaySlots = async (req: Request, res: Response) => {
  const response = await findUltrasoundDaySlotsService.findEcoDaySlots();
  return res.status(200).json(response);
};

export const findTomographyDaySlots = async (req: Request, res: Response) => {
  const response = await findUltrasoundDaySlotsService.findTomographyDaySlots();
  return res.status(200).json(response);
};
