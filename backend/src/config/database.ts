import dotenv from "dotenv";
import pg from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import * as authSchema from "../../auth/models/schema";
dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = drizzle(pool, { schema: { ...authSchema } }); // as NodePgDatabase<typeof schema>

export default db;
