import { verify } from "@node-rs/argon2";
import { loginRepositoryStore } from "../dataAccess/loginRepository";
import { UserModel } from "../models/userModel";
import { userTable } from "../models/schema";

const loginRepositoryStoreObj = new loginRepositoryStore();

export const loginServiceVerify = async ({
  username,
  password,
}: UserModel): Promise<typeof userTable.$inferSelect | null> => {
  try {
    const user = await loginRepositoryStoreObj.index(username);

    if (!user) {
      return null;
    }

    const verifyPassword = await verify(user.password, password);

    if (!verifyPassword) {
      return null;
    }

    return user;
  } catch (error) {
    throw new Error(`there is an error in loginServiceVerify error: ${error}`);
  }
};
