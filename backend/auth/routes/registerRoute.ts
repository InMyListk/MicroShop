import { Router } from "express";
import { registerControllerCreate } from "../controllers/registerController";

export const registerRouter = Router();

registerRouter.post("/api/v0/register", registerControllerCreate);
