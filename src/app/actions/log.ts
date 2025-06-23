"use server";

import { serverLogger } from "@/app/lib/logger/serverLogger";

export async function logClientEvent(
	level: "error" | "warn" | "info" | "debug",
	message: string,
	meta?: unknown,
) {
	try {
		switch (level) {
			case "error":
				serverLogger.error(message, meta);
				break;
			case "warn":
				serverLogger.warn(message, meta);
				break;
			case "info":
				serverLogger.info(message, meta);
				break;
			case "debug":
				serverLogger.debug(message, meta);
				break;
			default:
				serverLogger.info(message, meta);
		}
		return { success: true };
	} catch (error) {
		serverLogger.error("Failed to process client log", { error });
		return { success: false, error: "Internal server error" };
	}
}
