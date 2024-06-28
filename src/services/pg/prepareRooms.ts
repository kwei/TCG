import pg from "pg";
import SqlString from "sqlstring";

const SQL_CREATE_SDP_TYPE = SqlString.format(`
  DROP TYPE IF EXISTS SDP;
  CREATE TYPE SDP AS (
    "type" text,
    "sdp" text 
  )
`);

const SQL_CREATE_ICE_TYPE = SqlString.format(`
  DROP TYPE IF EXISTS ICE;
  CREATE TYPE ICE AS (
    "candidate" text,
    "sdpMLineIndex" int,
    "sdpMid" text,
    "usernameFragment" text
  )
`);

const SQL_CREATE_TABLE = SqlString.format(`
  CREATE TABLE rooms (
    "id" SERIAL PRIMARY KEY,
    "RoomID" text,
    "UserName" text,
    "ICE" ice,
    "SDP" sdp,
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
    await client.query(SQL_CREATE_SDP_TYPE);
    await client.query(SQL_CREATE_ICE_TYPE);
    await client.query(SQL_CREATE_TABLE);
    console.log("[PG] Create Table 'rooms'.");
  }
};
