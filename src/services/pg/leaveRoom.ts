import pg from "pg";
import SqlString from "sqlstring";

export const leaveRoom = async (
  client: pg.Client,
  roomId: number,
  data: Room,
) => {
  const SQL_CHECK_COL = SqlString.format(
    `SELECT * FROM public.rooms WHERE "RoomID" = ? AND "UserName" = ?`,
    [roomId, data.UserName],
  );
  const SQL_DELETE_ROW = SqlString.format(
    `DELETE FROM public.rooms WHERE "RoomID" = ? AND "UserName" = ?`,
    [roomId, data.UserName],
  );
  const checkResult = await client.query(SQL_CHECK_COL);
  if (checkResult.rowCount !== null && checkResult.rowCount === 1) {
    await client.query(SQL_DELETE_ROW);
  }
};
