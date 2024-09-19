import { lucia } from "../config/lucia";

import { NextFunction, Request, Response } from "express";

import { UserModel } from "../models/userModel";
import { loginServiceVerify } from "../services/loginService";

export const loginControllerVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginObj: UserModel = {
      username: req.body.username,
      password: req.body.password,
    };

    const user = await loginServiceVerify(loginObj);

    console.log(user);

    if (!user) {
      res.send("username or password is incorrect").status(200);
      return null;
    }

    const session = await lucia.createSession(user.id, {});

    const sessionCookie = lucia.createSessionCookie(session.id);

    res
      .cookie(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
      .send("User logined successfully")
      .status(200);
    next();
  } catch (error) {
    res.status(400);
    throw new Error(
      `there is an error in loginControllerVerify error: ${error}`
    );
  }
};
