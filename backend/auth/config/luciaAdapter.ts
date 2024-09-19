import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import db from "../../src/config/database";
import { sessionTable, userTable } from "../models/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export default adapter;
