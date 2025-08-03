import type { Dayjs, ManipulateType } from "dayjs";
import dayjs from "dayjs";

import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { dateFormats, dateRegex } from "@/shared/constants/date.constants";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(quarterOfYear);
dayjs.extend(duration);

export function toFormattedDate(
	date?: string | Date | null,
	format = "YYYY-MM-DD HH:mm:ss",
	options?: { format?: dayjs.OptionType; locale?: string; strict?: boolean },
): string | undefined {
	if (!date) return undefined;
	const dateIsValid = dayjs(date, dateFormats, true).isValid();
	const dateIsMatch = dateIsValid || dateRegex.some((regex) => regex.test(date as string));
	if (dateIsMatch || dateIsValid || (date as Date)?.getTime) {
		return dayjs(date, options?.format, options?.locale, options?.strict).format(format);
	}
	return undefined;
}

export function getUserTimeZoneCountry(): string {
	return dayjs.tz.guess();
}

export function subtractDate(date: string | Date, value: number, type: ManipulateType): Dayjs | undefined {
	if (!dayjs(date).isValid()) return undefined;
	return dayjs(date).subtract(value, type);
}

export const getTimeZoneGmt = () => {
	return dayjs().tz(dayjs.tz.guess()).format("z");
};

export function setTimeToStartOfDay(date?: string | Date | null): Dayjs | undefined {
	if (!dayjs(date).isValid()) return undefined;
	return dayjs(date).set("hour", 0).set("minute", 0).set("second", 0);
}

export function setTimeToEndOfDay(date?: string | Date | null): Dayjs | undefined {
	if (!dayjs(date).isValid()) return undefined;
	return dayjs(date).set("hour", 23).set("minute", 59).set("second", 59);
}

export function calculateDuration(startTime: Date | string, endTime: Date | string) {
	const totalSeconds = dayjs(endTime).diff(startTime, "seconds");
	const days = Math.floor(totalSeconds / (3600 * 24));
	const secondsAfterDays = totalSeconds % (3600 * 24);
	const hours = Math.floor(secondsAfterDays / 3600);
	const secondsAfterHours = secondsAfterDays % 3600;
	const minutes = Math.floor(secondsAfterHours / 60);
	const seconds = secondsAfterHours % 60;

	let result = "";
	if (days > 0) result += `${days}d `;
	if (days > 0 && hours > 0) result += ",";
	if (hours > 0) result += `${hours}h`;
	if (hours > 0 && minutes > 0) result += ":";
	if (minutes > 0) result += `${minutes}m`;
	if (minutes > 0 && seconds > 0) result += ":";
	if (seconds > 0) result += `${seconds}s`;

	return result || "0s";
}
