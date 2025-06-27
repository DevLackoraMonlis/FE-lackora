import { getHttpRequestXNonce } from "@/app/actions/get-http-request-x-nonce";
import { cookies } from "next/headers";
// app/api/get-xnonce/route.ts
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const cookieStore = await cookies();
	const token = cookieStore.get("next-auth.session-token");
	const csrf = cookieStore.get("next-auth.csrf-token");
	const callback = cookieStore.get("next-auth.callback-url");

	if (!token || !csrf || !callback) {
		return new NextResponse("Unauthorized", { status: 401 });
	}
	const body = await req.json();
	const xNonce = await getHttpRequestXNonce({
		...body,
	});
	return NextResponse.json(xNonce.data);
}
