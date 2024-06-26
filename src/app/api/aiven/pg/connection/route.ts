import { createTable } from "@/services/pg/createTable";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("[POST] req url: ", req.url);
  const body = (await req.json()) as any;
  console.log(body);

  await createTable();

  return NextResponse.json({
    status: true,
  });
}
