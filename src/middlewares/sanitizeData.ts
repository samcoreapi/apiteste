import { Request, Response, NextFunction } from "express";
import sanitizeHtml from "sanitize-html";

const sanitizeData = (req: Request, res: Response, next: NextFunction) => {
  // Sanitizar campos comuns no corpo da requisição
  if (req.body) {
    req.body.name = sanitizeHtml(req.body.name || "", {
      allowedTags: [],
      allowedAttributes: {},
    });

    req.body.plan = sanitizeHtml(req.body.plan || "", {
      allowedTags: [],
      allowedAttributes: {},
    });

    req.body.phone_number = req.body.phone_number
      ? req.body.phone_number.trim().replace(/[^0-9]/g, "")
      : ""; // Limitar a números
    req.body.exam_type = sanitizeHtml(req.body.exam_type || "", {
      allowedTags: [],
      allowedAttributes: {},
    });

    req.body.exam_name = sanitizeHtml(req.body.exam_name || "", {
      allowedTags: [],
      allowedAttributes: {},
    });
  }

  next();
};

export default sanitizeData;
