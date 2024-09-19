import { Router } from "express";

import { validateController } from "../controllers/validateUserController";

export const validateRouter = Router();

validateRouter.post("/api/v0/validate", validateController);
