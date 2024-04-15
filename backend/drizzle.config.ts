//@ts-nocheck
import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();
 
export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL,
  }
} satisfies Config;