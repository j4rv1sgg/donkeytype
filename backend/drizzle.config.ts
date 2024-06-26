//@ts-nocheck
import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();
 
export default {
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  out: "./src/db/drizzle",
  dbCredentials: {
    url: process.env.DB_URL,
  }
} satisfies Config;