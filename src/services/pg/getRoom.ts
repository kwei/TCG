import pg from "pg";
import SqlString from "sqlstring";

export const getRoom = async (client: pg.Client, roomId: number) => {
  const SQL_GET_ALL = SqlString.format(
    `SELECT * FROM public.rooms WHERE "RoomID" = ?`,
    [roomId],
  );
  const result = await client.query<Room>(SQL_GET_ALL);
  console.log("[PG] Get All: ", result.rowCount);
  return { rowCount: result.rowCount ?? 0, rows: result.rows };
};
