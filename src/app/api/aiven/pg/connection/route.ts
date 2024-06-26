import { PG_CONFIG } from "@/app/api/aiven/pg/constants";
import { NextResponse } from "next/server";
import pg from "pg";

export async function POST(req: Request) {
	console.log("[POST] req url: ", req.url);
	const body = (await req.json()) as any;
	console.log(body);
	const client = new pg.Client(PG_CONFIG);
	client.connect((err) => {
		if (err) throw err;
		// client.query("SELECT * FROM users", (err, result) => {
		//   if (err) throw err;
		//   console.log(result);
		// })
	});
	await client.end();
	return NextResponse.json({
		status: true,
	});
}
