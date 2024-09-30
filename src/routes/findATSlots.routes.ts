import { Router } from "express";
import * as findSlotsController from "../controllers/findATSlots.controller";

const findATSlots = Router();

// 20 vagas por dia cedo 5/h (8h, 9h, 10h, 11h) e 6 a tarde 2/h (14h, 15h, 16h)
findATSlots.get(
  "/at/ultrassom",
  findSlotsController.findUltrasoundATSlotsController
);

// ???????
findATSlots.get(
  "/at/ecocardiograma",
  findSlotsController.findEcoATSlotsController
);

// 4 vagas por dia 2 cedo 8h e 2 à tarde 14h
findATSlots.get(
  "/at/tomografia",
  findSlotsController.findTomographyATSlotsController
);

export default findATSlots;
