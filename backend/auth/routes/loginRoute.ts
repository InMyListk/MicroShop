import { Router } from "express";
import { loginControllerVerify } from "../controllers/loginController";

export const loginRouter = Router();

loginRouter.post("/api/v0/login", loginControllerVerify);
