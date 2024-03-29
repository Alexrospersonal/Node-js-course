import { Db, MongoClient } from "mongodb";
import { DB_NAME, URL } from "./settings.js";

/**
 * Creates a new connection to Db.
 * @returns the connection to Db
 */
async function connectToDb(): Promise<Db> {
    const conn: MongoClient = await MongoClient.connect(URL);
    return conn.db(DB_NAME);
}

export { connectToDb };