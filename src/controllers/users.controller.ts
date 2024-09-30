import { Request, Response } from "express";
import { UsersService } from "../services/users.service";

export class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async createUser(req: Request, res: Response) {
    const { name } = req.body;
    try {
      const novoUsuario = await this.usersService.createUser(name);
      res.status(201).json(novoUsuario);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar usuário." });
    }
  }

  async login(req: Request, res: Response) {
    const { name } = req.body;
    try {
      const token = await this.usersService.login(name);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ message: "Login falhou." });
    }
  }
}
