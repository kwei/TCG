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
    address: string;
    candidate: string;
    component: string;
    foundation: string;
    port: number;
    priority: number;
    protocol: string;
    relatedAddress: string;
    relatedPort: number;
    sdpMLineIndex: number;
    sdpMid: string;
    tcpType: string;
    iceType: string;
    usernameFragment: string;
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
            address: value.address,
            candidate: value.candidate,
            component: value.component,
            foundation: value.foundation,
            port: value.port,
            priority: value.priority,
            protocol: value.protocol,
            relatedAddress: value.relatedAddress,
            relatedPort: value.relatedPort,
            sdpMLineIndex: value.sdpMLineIndex,
            sdpMid: value.sdpMid,
            tcpType: value.tcpType,
            type: value.type,
            usernameFragment: value.usernameFragment,
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
