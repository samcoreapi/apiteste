// src/routes/userRoutes.ts
import { Router } from "express";
import userController from "../controllers/user.controller";
import { checkEmailExists } from "../middlewares/checkEmailExists";

const userRouter = Router();

userRouter.post("/register", checkEmailExists, userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/users", userController.getAllUsers);
userRouter.get("/user/:id", userController.getUserById);
userRouter.patch("/user/:id", userController.updateUser);
userRouter.delete("/user/:id", userController.deleteUser);

export default userRouter;
