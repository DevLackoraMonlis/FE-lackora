// app/api/csrf/route.ts

import { createHmac, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

export async function GET() {
	const rawToken = randomBytes(32).toString("base64url");
	const hmac = createHmac("sha256", process.env.CSRF_SECRET || "")
		.update(rawToken)
		.digest("base64url");

	const cookieValue = `${rawToken}.${hmac}`;

	const res = NextResponse.json({ ok: true });
	res.cookies.set("csrf-token", cookieValue, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		path: "/",
	});

	return res;
}
