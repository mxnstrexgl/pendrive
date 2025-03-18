import { type Config } from "drizzle-kit";

import { env } from "~/env";

// Use a fallback SQLite URL for development if DATABASE_URL is not defined
const databaseUrl = env.DATABASE_URL ?? "file:./db.sqlite";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: databaseUrl,
  },
  tablesFilter: ["pendrive_*"],
} satisfies Config;
