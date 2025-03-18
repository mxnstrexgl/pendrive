import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Client | undefined;
  db: ReturnType<typeof drizzle<typeof schema>> | undefined;
};

// Use a fallback SQLite URL for development if DATABASE_URL is not defined
const databaseUrl = env.DATABASE_URL ?? "file:./db.sqlite";

// Create a more resilient database connection
let client: Client | undefined;
let db: ReturnType<typeof drizzle<typeof schema>> | undefined;

try {
  // Try to create a database connection with fallback URL
  client = globalForDb.client ?? createClient({ url: databaseUrl });
  
  // Cache the client in development
  if (env.NODE_ENV !== "production") globalForDb.client = client;
  
  // Initialize Drizzle with the client
  db = globalForDb.db ?? drizzle(client, { schema });
  
  // Cache the db instance in development
  if (env.NODE_ENV !== "production") globalForDb.db = db;
} catch (error) {
  // Log the error but don't crash the app
  console.error("Failed to initialize database:", error);
  
  // In production, we might not have access to the database during build
  if (env.NODE_ENV === "production") {
    console.warn("Database initialization skipped in production");
  }
}

// Export the client and db, which might be undefined if initialization failed
export { client, db };
