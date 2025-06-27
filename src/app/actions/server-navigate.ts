"use server";

import { redirect } from "next/navigation";

export async function serverNavigate(url: string) {
	throw redirect(url);
}
