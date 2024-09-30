// src/controllers/userController.ts
import { Response, NextFunction } from "express";

import { AuthenticatedRequest } from "../interfaces/authenticatedRequest";
import { AuthResponse, UserResponse } from "../interfaces/user.interface";
import userService from "../services/user.service";
import { JwtPayload, verify } from "jsonwebtoken";

class UserController {
  async register(
    req: AuthenticatedRequest,
    res: Response<UserResponse | { error: string }>,
    next: NextFunction
  ) {
    try {
      const user = (await userService.createUser(
        req.body
      )) as UserResponse | null;
      if (!user) {
        return res.status(400).json({ error: "Failed to create user" });
      }
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(
    req: AuthenticatedRequest,
    res: Response<UserResponse[] | { error: string }>,
    next: NextFunction
  ) {
    try {
      const users = (await userService.getAllUsers(1)) as UserResponse[];
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(
    req: AuthenticatedRequest,
    res: Response<UserResponse | { error: string }>,
    next: NextFunction
  ) {
    try {
      const requestingUserId = 1;
      const id = parseInt(req.params.id, 10);
      const user = (await userService.getUserById(
        id,
        requestingUserId
      )) as UserResponse | null;
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(
    req: AuthenticatedRequest,
    res: Response<UserResponse | { error: string }>,
    next: NextFunction
  ) {
    try {
      const requestingUserId = 1;
      const id = parseInt(req.params.id, 10);
      const user = (await userService.updateUser(
        id,
        req.body,
        requestingUserId
      )) as UserResponse | null;
      if (!user) {
        return res.status(404).json({
          error: "Usuário não encontrado ou não foi possível atualizar",
        });
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(
    req: AuthenticatedRequest,
    res: Response<UserResponse | { error: string }>,
    next: NextFunction
  ) {
    try {
      const requestingUserId = 1;
      const id = parseInt(req.params.id, 10);
      const user = (await userService.deleteUser(
        id,
        requestingUserId
      )) as UserResponse | null;
      if (!user) {
        return res.status(404).json({
          error: "Usuário não encontrado ou não foi possível deletar",
        });
      }
      res.status(204);
    } catch (error) {
      next(error);
    }
  }

    async login(
      req: AuthenticatedRequest,
      res: Response<AuthResponse | { error: string }>,
      next: NextFunction
    ) {
      try {
        const { email, password } = req.body;
        const token = await userService.authenticate(email, password, res);
        res.status(200).json(token);
      } catch (error) {
        next(error);
      }
    }
}

export default new UserController();
