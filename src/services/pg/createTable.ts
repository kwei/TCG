import { PG_CONFIG } from "@/services/pg/constants";
import pg from "pg";
import SqlString from "sqlstring";

const SQL_CREATE_TABLE = SqlString.format(`
  CREATE TABLE Rooms (
    id SERIAL PRIMARY KEY,
    RoomId int,
    UserName text,
    ICE text,
    SDP text
  )
`);

const SQL_TABLE_EXISTS = SqlString.format(`
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name = 'Rooms'
  )
`);

export const createTable = async () => {
  const client = new pg.Client(PG_CONFIG);
  console.log("[Aiven][PostgreSQL] Connecting...");
  await client.connect();
  console.log("[Aiven][PostgreSQL] Connected.");
  client.query(SQL_TABLE_EXISTS, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      client.end();
      return;
    }
    console.log(result.rows);

    client.end((err) => {
      if (err) {
        console.error("Error ending the connection", err);
      } else {
        console.log("Connection ended gracefully");
      }
    });
  });
};
