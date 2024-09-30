import { Request, Response, NextFunction } from "express";

// Middleware para limitar o tamanho da requisição
const limitRequestSize = (maxSize: number) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const contentLength = req.headers['content-length'];

        if (contentLength && parseInt(contentLength) > maxSize) {
            return res.status(413).json({ message: "Payload muito grande. Limite máximo é " + (maxSize / 1024) + " KB." });
        }

        // Se não houver erro, continue para o próximo middleware
        next();
    };
};

export default limitRequestSize;