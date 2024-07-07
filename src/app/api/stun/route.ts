import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    `https://kw-ptcg.metered.live/api/v1/turn/credentials?apiKey=${process.env.METERED_API_KEY}`,
  );
  const iceServers = await response.json();
  return NextResponse.json({ iceServers });
}
