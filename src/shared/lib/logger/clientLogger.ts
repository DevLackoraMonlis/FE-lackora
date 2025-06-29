"use client";

import { logClientEvent } from "@/app/actions/log";

type LogLevel = "error" | "warn" | "info" | "debug";

// Client-side log buffer for offline scenarios
const logBuffer: Array<{ level: LogLevel; message: string; meta?: unknown }> = [];
const MAX_BUFFER_SIZE = 50;

// Helper function to get browser metadata

const sendLogToServer = async (level: LogLevel, message: string, meta?: unknown) => {
	try {
		// First try to send unknown buffered logs
		while (logBuffer.length > 0) {
			const bufferedLog = logBuffer[0];
			const result = await logClientEvent(
				bufferedLog.level,
				`[BUFFERED] ${bufferedLog.message}`,
				bufferedLog.meta,
			);

			if (result.success) {
				logBuffer.shift();
			} else {
				break; // Stop if we encounter an error
			}
		}

		// Now send the current log
		const result = await logClientEvent(level, message, meta);

		if (!result.success) {
			// If server is down, add to buffer
			if (logBuffer.length < MAX_BUFFER_SIZE) {
				logBuffer.push({ level, message, meta });
			}
			console.error("Failed to send log to server, added to buffer");
		}
	} catch (error) {
		console.error("Error sending log to server:", error);
		// Add to buffer if possible
		if (logBuffer.length < MAX_BUFFER_SIZE) {
			logBuffer.push({ level, message, meta });
		}
	}
};

export const clientLogger = {
	error: (message: string, meta?: unknown) => {
		console.error(message, meta);
		return sendLogToServer("error", message, meta);
	},
	warn: (message: string, meta?: unknown) => {
		console.warn(message, meta);
		return sendLogToServer("warn", message, meta);
	},
	info: (message: string, meta?: unknown) => {
		console.info(message, meta);
		return sendLogToServer("info", message, meta);
	},
	debug: (message: string, meta?: unknown) => {
		console.debug(message, meta);
		return sendLogToServer("debug", message, meta);
	},
	// Helper method to check buffer status
	getBufferStatus: () => ({
		bufferedLogs: logBuffer.length,
		bufferSize: MAX_BUFFER_SIZE,
	}),
};
