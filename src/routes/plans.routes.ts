const express = require("express");
import exp from "constants";
import { Request, Response } from "express";
const PlansRouter = express.Router();

PlansRouter.get("/getPlans", (req: Request, res: Response) => {
  // Lista dos planos de saúde
  const plans = [
    { id: 1, name: "Particular", description: "Não tenho plano de saúde." },
    {
      id: 2,
      name: "Secretarias da saúde",
      description:
        "As secretarias da saúde de algumas cidades têm descontos aqui no IMEC.",
    },
    { id: 3, name: "IPASGO", description: "Plano de saúde estadual." },
    { id: 4, name: "Unimed", description: "Plano de saúde nacional." },
    { id: 5, name: "CASSI", description: "Plano de saúde corporativo." },
    {
      id: 6,
      name: "Saúde Caixa",
      description: "Plano de saúde exclusivo para empregados da Caixa.",
    },
    {
      id: 7,
      name: "Bradesco",
      description: "Plano de saúde oferecido pelo Banco Bradesco.",
    },
    { id: 8, name: "Vivacom", description: "Plano de saúde abrangente." },
    {
      id: 9,
      name: "Capesesp",
      description: "Plano de saúde para empregados do setor privado.",
    },
  ];

  // Retorna a lista de planos em formato JSON
  res.json(plans);
});

PlansRouter.get("/secretarias", (req: Request, res: Response) => {
  // Lista das secretarias de saúde
  const secretarias = [
    { id: 1, name: "Rialma" },
    { id: 2, name: "Carmo do Rio Verde" },
    { id: 3, name: "Nova Glória" },
    { id: 4, name: "Itapaci" },
    { id: 5, name: "Ipiranga" },
    { id: 6, name: "Minaçu" },
    { id: 7, name: "Santa Terezina" },
    { id: 8, name: "Rúbia" },
    { id: 9, name: "Uruana" },
    { id: 10, name: "São Patrício" },
  ];

  // Retorna a lista de secretarias em formato JSON
  res.json(secretarias);
});

// Nova rota para obter os tipos de exames
PlansRouter.get("/getExamTypes", (req: Request, res: Response) => {
  // Lista dos tipos de exames
  const examTypes = ["Ultrassom", "Ecocardiograma", "Tomografia"];

  // Retorna a lista de tipos de exames em formato JSON
  res.json(examTypes);
});

export { PlansRouter };
