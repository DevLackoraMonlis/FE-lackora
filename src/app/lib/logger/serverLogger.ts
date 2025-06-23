import * as fs from "node:fs";
import * as path from "node:path";
import dayjs from "dayjs";

const LOGS_DIR = path.join(process.cwd(), "logs");
const MAX_LOG_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_LOG_FILES = 10; // Keep up to 10 rotated logs per day

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
	fs.mkdirSync(LOGS_DIR);
}

enum LogLevel {
	ERROR = "ERROR",
	WARN = "WARN",
	INFO = "INFO",
	DEBUG = "DEBUG",
}

const getCurrentLogFileName = () => {
	return path.join(LOGS_DIR, `client_${dayjs().format("YYYY-MM-DD")}.log`);
};

const rotateLogs = () => {
	const currentLogFile = getCurrentLogFileName();

	try {
		// Check if log file exists and needs rotation
		if (fs.existsSync(currentLogFile)) {
			const stats = fs.statSync(currentLogFile);

			if (stats.size > MAX_LOG_FILE_SIZE) {
				// Create rotated filename with timestamp
				const rotatedFile = path.join(LOGS_DIR, `client_${dayjs()}.log`);

				// Rename current log file
				fs.renameSync(currentLogFile, rotatedFile);

				// Clean up old log files (keep only MAX_LOG_FILES)
				const allLogs = fs
					.readdirSync(LOGS_DIR)
					.filter((file) => file.startsWith("client_") && file.endsWith(".log"))
					.sort();

				if (allLogs.length > MAX_LOG_FILES) {
					const filesToDelete = allLogs.slice(
						0,
						allLogs.length - MAX_LOG_FILES,
					);
					filesToDelete.forEach((file) => {
						fs.unlinkSync(path.join(LOGS_DIR, file));
					});
				}
			}
		}
	} catch (err) {
		console.error("Log rotation error:", err);
	}
};

const logToFile = (level: LogLevel, message: string, meta?: unknown) => {
	rotateLogs(); // Check rotation before writing
	const timestamp = dayjs();
	const logEntry = `[${timestamp}] [${level}] ${message}${
		meta ? JSON.stringify(meta) : ""
	}\n`;

	try {
		fs.appendFileSync(getCurrentLogFileName(), logEntry);
	} catch (err) {
		console.error("Failed to write to log file:", err);
	}
};

export const serverLogger = {
	error: (message: string, meta?: unknown) =>
		logToFile(LogLevel.ERROR, message, meta),
	warn: (message: string, meta?: unknown) =>
		logToFile(LogLevel.WARN, message, meta),
	info: (message: string, meta?: unknown) =>
		logToFile(LogLevel.INFO, message, meta),
	debug: (message: string, meta?: unknown) =>
		logToFile(LogLevel.DEBUG, message, meta),
};
