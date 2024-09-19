import { NextFunction, Request, Response } from "express";

import { lucia } from "../config/lucia";

export const validateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const sessionName = lucia.sessionCookieName;
    // const requestedCookie = req.body;

    // const luciaCookie = requestedCookie.find(
    //   (cookie: { name: string; value: string }) => cookie.name === sessionName
    // );

    // if (!luciaCookie) {
    //   res.send({ user: null, session: null });
    //   return;
    // }

    // const { session, user } = await lucia.validateSession(luciaCookie.value);

    // if (!session) {
    //   res.send({ user: null, session: null });
    // } else {
    //   res.send({ session: session, user: user });
    // }

    console.log(req.cookies);

    next();
  } catch (error) {
    throw new Error(`${error}`);
  }
};
