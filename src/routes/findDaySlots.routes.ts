import { Router } from "express";
import * as findSlotsController from "../controllers/findDaySlots.controller";

const findSlots = Router();

// 20 vagas por dia cedo 5/h (8h, 9h, 10h, 11h) e 6 a tarde 2/h (14h, 15h, 16h)
findSlots.get("/day/ultrassom", findSlotsController.findUltrasoundDaySlots);

// 18 vagas por dia das 8 às 11 e das 14 às 17 de 30 em 30 minutos
findSlots.get("/day/ecocardiograma", findSlotsController.findEcoDaySlots);

// 4 vagas por dia 2 cedo 8h e 2 à tarde 14h
findSlots.get("/day/tomografia", findSlotsController.findTomographyDaySlots);

export default findSlots;
