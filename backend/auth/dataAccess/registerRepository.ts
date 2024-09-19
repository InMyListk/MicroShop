import db from "../../src/config/database";
import { userTable } from "../models/schema";
import { UserModelHashed } from "../models/userModel";

export class registerRepositoryStore {
  async create({ userId, username, passwordHash }: UserModelHashed) {
    try {
      const responce = await db
        .insert(userTable)
        .values({
          id: userId,
          username: username,
          password: passwordHash,
        })
        .returning({
          id: userTable.id,
          username: userTable.username,
        });

      return responce;
    } catch (error) {
      throw new Error(
        `there is an error in registerRepositoryStore create error: ${error}`
      );
    }
  }
}
