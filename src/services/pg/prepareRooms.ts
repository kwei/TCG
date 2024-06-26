import pg from "pg";
import SqlString from "sqlstring";

const SQL_CREATE_TABLE = SqlString.format(`
  CREATE TABLE rooms (
    "id" SERIAL PRIMARY KEY,
    "RoomID" int,
    "UserName" text,
    "ICE" text,
    "SDP" text,
    "Timestamp" timestamp
  )
`);

const SQL_TABLE_EXISTS = SqlString.format(`
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_name = 'rooms'
  )
`);

export const prepareRooms = async (client: pg.Client) => {
  const checkResult = await client.query(SQL_TABLE_EXISTS);
  const tableExists = checkResult.rows[0].exists;
  console.log("[PG] Table 'rooms' exists: ", tableExists);
  if (!tableExists) {
    await client.query(SQL_CREATE_TABLE);
    console.log("[PG] Create Table 'rooms'.");
  }
};
