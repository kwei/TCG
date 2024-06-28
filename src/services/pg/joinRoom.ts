import pg from "pg";
import SqlString from "sqlstring";

export const joinRoom = async (
  client: pg.Client,
  roomId: string,
  data: Room,
) => {
  const SQL_CHECK_COL = SqlString.format(
    `SELECT * FROM public.rooms WHERE "RoomID" = ? AND "UserName" = ?`,
    [roomId, data.UserName],
  );
  const SQL_SET_DATA = SqlString.format(
    `INSERT INTO public.rooms ("RoomID", "UserName", "ICE", "SDP", "Timestamp") VALUES (?, ?, (?,?,?,?)::ice, (?,?)::sdp, CAST(? AS TIMESTAMP))`,
    [
      roomId,
      data.UserName,
      data.ICE.candidate,
      data.ICE.sdpMLineIndex,
      data.ICE.sdpMid,
      data.ICE.usernameFragment,
      data.SDP.type as string,
      data.SDP.sdp,
      data.Timestamp,
    ],
  );
  const SQL_UPDATE_DATA = SqlString.format(
    `UPDATE public.rooms SET "ICE" = ?, "SDP"= ?, "Timestamp"= CAST(? AS TIMESTAMP) WHERE "RoomID" = ? AND "UserName" = ?;`,
    [data.ICE, data.SDP, data.Timestamp, roomId, data.UserName],
  );
  const checkResult = await client.query(SQL_CHECK_COL);
  if (checkResult.rowCount === null || checkResult.rowCount === 0) {
    await client.query(SQL_SET_DATA);
  } else {
    console.log("[PG] Original data: ", checkResult.rows[0]);
    await client.query(SQL_UPDATE_DATA);
  }
};
