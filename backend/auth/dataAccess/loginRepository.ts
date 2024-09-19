import db from "../../src/config/database";
import { eq } from "drizzle-orm";
import { userTable } from "../models/schema";

export class loginRepositoryStore {
  async index(username: string) {
    try {
      const responce = db.query.userTable.findFirst({
        where: eq(userTable.username, username),
      });

      if (!responce) {
        return null;
      }

      return responce;
    } catch (error) {
      throw new Error(
        `there is an error in loginRepositoryStore create error: ${error}`
      );
    }
  }
}
