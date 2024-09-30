import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logService from "./log.service";

dotenv.config();

const prisma: any = new PrismaClient();
const JWT_SECRET: any = process.env.JWT_SECRET || "your_jwt_secret";

interface CreateUserDTO {
  fullName: any;
  email: any;
  password: any;
  role?: any;
  status?: any;
}

interface UpdateUserDTO {
  fullName?: any;
  email?: any;
  password?: any;
  role?: any;
  status?: any;
}

class UserService {
  async createUser(data: CreateUserDTO): Promise<any> {
    const hashedPassword: any = await bcrypt.hash(data.password, 10);
    const user: any = await prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: hashedPassword,
        role: data.role || "USER",
        status: data.status || "ACTIVE",
      },
    });

    await logService.createLog(user.id, "Criou uma nova conta de usuário");

    const { password, ...userWithoutPassword }: any = user;
    return userWithoutPassword;
  }

  async getAllUsers(requestingUserId: any): Promise<any[]> {
    const users: any = await prisma.user.findMany();

    await logService.createLog(
      requestingUserId,
      "Visualizou a lista de usuários"
    );

    return users.map((user: any) => {
      const { password, ...userWithoutPassword }: any = user;
      return userWithoutPassword;
    });
  }

  async getUserById(id: any, requestingUserId: any): Promise<any> {
    const user: any = await prisma.user.findUnique({
      where: { id },
    });

    if (user) {
      await logService.createLog(
        requestingUserId,
        `Visualizou o usuário com ID ${id}`
      );
      const { password, ...userWithoutPassword }: any = user;
      return userWithoutPassword;
    }
    return null;
  }

  async updateUser(id: any, data: UpdateUserDTO, requestingUserId: any): Promise<any> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    try {
      const updatedUser: any = await prisma.user.update({
        where: { id },
        data,
      });

      await logService.createLog(
        requestingUserId,
        `Atualizou o usuário com ID ${id}`
      );

      const { password, ...userWithoutPassword }: any = updatedUser;
      return userWithoutPassword;
    } catch (error: any) {
      console.error("Erro ao atualizar usuário:", error);
      return null;
    }
  }

  async deleteUser(id: any, requestingUserId: any): Promise<any> {
    try {
      const user: any = await prisma.user.update({
        where: { id },
        data: { status: "INACTIVE" },
      });

      await logService.createLog(
        requestingUserId,
        `Desativou o usuário com ID ${id}`
      );

      const { password, ...userWithoutPassword }: any = user;
      return userWithoutPassword;
    } catch (error: any) {
      console.error("Erro ao deletar usuário:", error);
      return null;
    }
  }

  async authenticate(email: any, password: any, res: any): Promise<any> {
    const user: any = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const isMatch: any = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    await prisma.user.update({
      where: { email },
      data: { lastLogin: new Date() },
    });

    await logService.createLog(user.id, "Realizou login na plataforma");

    const token: any = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password: _, ...userWithoutPassword }: any = user;
    return { token, user: userWithoutPassword };
  }

  verifyToken(token: any): any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error: any) {
      throw new Error("Token inválido");
    }
  }
}

export default new UserService();
