import pg from "pg";
import SqlString from "sqlstring";

export const getRoom = async (client: pg.Client, roomId: string) => {
  const SQL_GET_ALL = SqlString.format(
    `SELECT id, "RoomID", "UserName", ("ICE").*, ("SDP").*, "Timestamp" FROM public.rooms WHERE "RoomID" = ?`,
    [roomId],
  );
  const result = await client.query<{
    id: number;
    RoomID: string;
    UserName: string;
    Timestamp: string;
    sdp: string;
    type: string;
    candidate: string;
    sdpMLineIndex: number;
    sdpMid: string;
  }>(SQL_GET_ALL);
  console.log("[PG] Get All: ", result.rowCount);
  return {
    rowCount: result.rowCount ?? 0,
    rows: result.rows.map(
      (value) =>
        ({
          RoomID: value.RoomID,
          UserName: value.UserName,
          ICE: {
            candidate: value.candidate,
            sdpMLineIndex: value.sdpMLineIndex,
            sdpMid: value.sdpMid,
          } as RTCIceCandidate,
          SDP: {
            type: value.type,
            sdp: value.sdp,
          } as RTCSessionDescription,
          Timestamp: value.Timestamp,
        }) as Room,
    ),
  };
};
