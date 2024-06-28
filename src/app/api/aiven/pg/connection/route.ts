import { PG_CONFIG } from "@/app/api/aiven/pg/constants";
import { getRoom } from "@/services/pg/getRoom";
import { joinRoom } from "@/services/pg/joinRoom";
import { leaveRoom } from "@/services/pg/leaveRoom";
import { prepareRooms } from "@/services/pg/prepareRooms";
import { NextResponse } from "next/server";
import pg from "pg";

export async function POST(req: Request) {
  console.log("[POST] req url: ", req.url);
  const body = (await req.json()) as PGReq;

  const client = new pg.Client(PG_CONFIG);
  console.log("[PG] Connecting...");
  try {
    await client.connect();
    console.log("[PG] Connected.");
    await prepareRooms(client);

    switch (body.action) {
      case "get":
        const { rowCount: playerCount, rows: playerList } = await getRoom(
          client,
          body.RoomID,
        );
        await client.end();
        return NextResponse.json({
          status: true,
          playerCount,
          playerList,
        });
      case "set":
        await joinRoom(client, body.RoomID, body.data);
        await client.end();
        return NextResponse.json({
          status: true,
        });
      case "delete":
        await leaveRoom(client, body.RoomID, body.data);
        await client.end();
        return NextResponse.json({
          status: true,
        });
      default:
        await client.end();
        return NextResponse.json({
          status: false,
        });
    }
  } catch (e) {
    console.error("[PG]: ", e);
    await client.end();
  }
  return NextResponse.json({
    status: false,
  });
}
