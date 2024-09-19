import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: ["./auth/models/schema.ts"],

  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
