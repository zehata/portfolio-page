"server-only";
import { createPool, DatabasePool } from "slonik";
import { createPgDriverFactory } from "@slonik/pg-driver";

const createDatabaseConnectionPool = async () => {
  const pool = await createPool(
    (process.env.ENV === "production"
      ? process.env.DATABASE_URL
      : process.env.DEV_DATABASE_URL) as string,
    {
      driverFactory: createPgDriverFactory(),
      connectionTimeout: "DISABLE_TIMEOUT",
    },
  );
  return pool;
};

let pool: DatabasePool | null = null;

export const requestConnectionPool = async () => {
  if (pool && pool.state().state === "ACTIVE") {
    return pool;
  }

  pool = await createDatabaseConnectionPool();
  return pool;
};

export const requestConnectionPoolEnd = () => {
  if (!pool) return;

  if (pool.state().pendingConnections) return;

  pool.end();
};
