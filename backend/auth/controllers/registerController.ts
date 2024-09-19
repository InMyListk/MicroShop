import { NextFunction, Request, Response } from "express";

import { lucia } from "../config/lucia";
import { generateId } from "lucia";

import { registerServiceCreate } from "../services/registerService";
import { UserModel } from "../models/userModel";

export const registerControllerCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = generateId(15);

    const registerObj: UserModel = {
      userId: userId,
      username: req.body.username,
      password: req.body.password,
    };

    const responce = await registerServiceCreate(registerObj);

    console.log(responce);

    const session = await lucia.createSession(userId, {});

    const sessionCookie = lucia.createSessionCookie(session.id);
    console.log(sessionCookie);
    res
      .cookie(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
      .send("User registerd successfully")
      .status(200);
    next();
  } catch (error) {
    res.status(400);
    throw new Error(
      `there is an error in registerControllerCreate error: ${error}`
    );
  }
};
