"server-only";
import { createPool, DatabasePool } from "slonik";
import { createPgDriverFactory } from "@slonik/pg-driver";
import fetchDatabaseState from "./fetchDatabaseState";

export class Connection {
  static lastRequest = 0; 
  static connectionLastEnded = 0;
  static connectionPool: DatabasePool | null = null;

  private static createDatabaseConnectionPool = async () => {
    Connection.connectionPool = await createPool(
      (process.env.ENV === "production"
        ? process.env.DATABASE_URL
        : process.env.DEV_DATABASE_URL) as string,
      {
        driverFactory: createPgDriverFactory(),
        connectionTimeout: "DISABLE_TIMEOUT",
      },
    );
  };

  public static requestConnectionPool = async () => {
    if (
      !Connection.connectionPool ||
      Connection.connectionPool.state().state != "ACTIVE"
    ) {
      await this.createDatabaseConnectionPool();
    }

    this.lastRequest = Date.now();

    return this.connectionPool as DatabasePool;
  };

  public static requestConnectionPoolEnd = async () => {
    if (!Connection.connectionPool) return;

    if (Connection.connectionPool.state().pendingConnections) return;

    await Connection.connectionPool.end();
    this.connectionLastEnded = Date.now();
  };

  public static isDatabaseActive = async () => {
    if (this.connectionPool && this.connectionPool.state().state === "ACTIVE")
      return true;

     // Neon computes scales to zero only after 5 minutes
    if (Date.now() < this.lastRequest + 5 * 60 * 1000)
      return true;

    if (Date.now() < this.connectionLastEnded + 5 * 60 * 1000)
      return true;

    return (await fetchDatabaseState()) === "active";
  };
}

export default Connection;
