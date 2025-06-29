import { getHttpRequestXNonce } from "@/app/actions/get-http-request-x-nonce";
import { validateSignedCsrfToken } from "@/shared/lib/csrf";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
// app/api/get-xnonce/route.ts
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const cookieStore = await cookies();
	const customCsrf = cookieStore.get("csrf-token");

	if (
		!validateSignedCsrfToken(
			customCsrf?.value || "",
			process.env.CSRF_SECRET || "",
		)
	) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	// Validate session token
	const token = await getToken({ req, secret: process.env.NEXT_AUTH });
	if (!token) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	const body = await req.json();
	const xNonce = await getHttpRequestXNonce({
		...body,
	});
	return NextResponse.json(xNonce.data);
}
