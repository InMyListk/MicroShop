import { hash } from "@node-rs/argon2";
import { registerRepositoryStore } from "../dataAccess/registerRepository";
import { UserModel } from "../models/userModel";

const registerRepositoryStoreObj = new registerRepositoryStore();

export const registerServiceCreate = async ({
  userId,
  username,
  password,
}: UserModel) => {
  try {
    const passwordHash = await hash(password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const responce = registerRepositoryStoreObj.create({
      userId,
      username,
      passwordHash,
    });

    return responce;
  } catch (error) {
    throw new Error(
      `there is an error in registerServiceCreate error: ${error}`
    );
  }
};
