import type { CustomError, CustomSuccess, MutationContext } from "@/http/end-points/GeneralService.types";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { isNumber } from "lodash";
import { isIP } from "range_check";

export function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function copyToClipboard(text: string): void {
	if (navigator.clipboard) {
		void navigator.clipboard.writeText(text);
	} else {
		unsecuredCopyToClipboard(text);
	}
}

type ValidationOptions = {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	mustBeNumber?: boolean;
	onlyNumbers?: boolean;
	onlyEnglishChars?: boolean;
	onlyEnglishWithSpaces?: boolean;
	mustBeNonEmptyArray?: boolean;
	mustBeEmail?: boolean;
	mustContainSpecialChars?: boolean;
	equalityFieldValue?: string;
	equalityFieldName?: string;
	mustBeURI?: boolean;
	mustBeIP?: boolean;
};

export function validateInput(valueInput: unknown, options: ValidationOptions = {}): string | null {
	const {
		required,
		minLength,
		maxLength,
		mustBeNumber,
		onlyNumbers,
		onlyEnglishChars,
		onlyEnglishWithSpaces,
		mustBeNonEmptyArray,
		mustBeEmail,
		mustContainSpecialChars,
		equalityFieldValue,
		equalityFieldName,
		mustBeURI,
		mustBeIP,
	} = options;

	// Array validation
	if (mustBeNonEmptyArray) {
		if (!Array.isArray(valueInput)) {
			return "Value must be an array";
		}
		if (valueInput.length === 0) {
			return "Array must not be empty";
		}
		return null;
	}

	if (mustBeNumber && Number.isNaN(Number(valueInput))) {
		return "Value must be a valid number";
	}

	const value = valueInput?.toString();

	// Required check
	if (required) {
		if (typeof value !== "string" || value.trim() === "") {
			return "Value is required";
		}
	}

	if (typeof value !== "string") {
		return "Value must be a string";
	}

	if (mustBeEmail) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value as string)) {
			return "Value must be a valid email address";
		}
	}

	if (mustBeIP) {
		if (!isIP(value)) {
			return "Value must be a valid IP";
		}
	}

	if (mustBeURI) {
		try {
			new URL(value); // throws if invalid
		} catch {
			return "Value must be a valid URI";
		}
	}

	if (minLength !== undefined && (value as string).length < minLength) {
		return `Minimum length is ${minLength} characters`;
	}

	if (maxLength !== undefined && (value as string).length > maxLength) {
		return `Maximum length is ${maxLength} characters`;
	}

	if (mustBeNumber && Number.isNaN(Number(value))) {
		return "Value must be a valid number";
	}

	if (onlyNumbers && !/^\d+$/.test(value as string)) {
		return "Value must contain only numeric digits";
	}

	if (onlyEnglishChars && !/^[A-Za-z]+$/.test(value as string)) {
		return "Value must contain only English letters (no spaces)";
	}

	if (onlyEnglishWithSpaces && !/^[A-Za-z\s]+$/.test(value as string)) {
		return "Value must contain only English letters and spaces";
	}

	if (mustContainSpecialChars) {
		// Define special characters commonly used in passwords
		const specialCharRegex = /[!@#$%^&*()\[\]{}\-_+=~`:;"'<>,.?\\/|]/;
		if (!specialCharRegex.test(value as string)) {
			return "Value must contain at least one special character";
		}
	}

	if (equalityFieldValue && equalityFieldValue !== value) {
		return `Value must equal of ${equalityFieldName}`;
	}

	return null;
}

export function unsecuredCopyToClipboard(text: string | number) {
	const textArea = document.createElement("textarea");
	textArea.value = text.toString();
	document.body.appendChild(textArea);
	textArea.focus({ preventScroll: true });
	textArea.select();
	try {
		document.execCommand("copy");
	} catch (err) {
		console.error("Unable to copy to clipboard", err);
	}
	document.body.removeChild(textArea);
}

export function normalizeForFlag(string?: string) {
	if (!string) return "";
	return string.charAt(0).toUpperCase() + string.charAt(1).toLowerCase();
}

export function objectToSelectOptions<T>(value: Record<string, string | number>, fieldName = "value") {
	return Object.keys(value)
		.filter((key) => Number.isNaN(Number(key)))
		.map((key) => ({
			label: key,
			[fieldName]: value[key],
		})) as T[];
}

// این تابع فقط JWT رو دیکد می‌کنه بدون بررسی امضا
export function decodeJwt(token: string) {
	try {
		const decoded = jwt.decode(token) as jwt.JwtPayload;

		if (!decoded || !decoded.exp) {
			throw new Error("توکن exp نداره");
		}

		const expInMs = decoded.exp * 1000; // چون exp برحسب ثانیه است
		const expiresAt = new Date(expInMs);

		return {
			exp: expInMs,
			expiresAt,
			expired: Date.now() > expInMs,
		};
	} catch (err) {
		console.error("خطا در دیکد کردن JWT:", err);
		return null;
	}
}

export function basicBrowserDownload(url: string, fileName: string) {
	const a = window.document.createElement("a");
	a.style.setProperty("display", "none");
	a.download = fileName;
	a.href = url;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	a.remove();
}

export const getErrorMessage = (error: CustomError, context?: MutationContext) => {
	if (Array.isArray(error?.response?.data?.detail)) {
		return error?.response?.data?.detail?.[0]?.msg || context?.errorMessage || "Unhandled Error";
	}
	return error?.response?.data?.detail || context?.errorMessage || "Unhandled Error";
};
export const getSuccessMessage = (response: CustomSuccess, context?: MutationContext) => {
	return response?.data?.message || context?.successMessage || "The operation was successful.";
};

export function isValidJson(str: string) {
	try {
		JSON.parse(str);
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
}

export function getChangedFields<T extends object>(oldData: T, newData: T): Partial<T> {
	const changed: Partial<T> = {};

	for (const key in newData) {
		if (!Object.is(oldData[key], newData[key])) {
			changed[key] = newData[key];
		}
	}

	return changed;
}

type EnumRecord = Record<string, string | number>;

export function enumToRecord(e: EnumRecord): EnumRecord {
	const record: EnumRecord = {};
	for (const [key, value] of Object.entries(e)) {
		record[key] = value;
	}
	return record;
}
export function getEnumKeyByValue(value: string, enumObject: EnumRecord): string | undefined {
	const entries = Object.entries(enumObject);
	for (const [key, val] of entries) {
		if (val === value) {
			return key;
		}
	}
	return undefined; // if the value is not found
}

export function objectToBase64<T>(obj: T) {
	return Buffer.from(JSON.stringify(obj), "utf8").toString("base64");
}

export function base64ToObject<T>(base64String: string) {
	// Decode the base64 string to JSON string
	const jsonString = atob(base64String);

	// Parse the JSON string back to an object
	return JSON.parse(jsonString) as T;
}

// Testing the function

export function validateIP(ipAddress: string) {
	const ipv4Regex =
		/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

	return ipv4Regex.test(ipAddress);
}

export function validateFQDN(FQDNAddress: string) {
	const FQDNAdress = /^(?=.{1,253}$)(([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,})\.?$/;
	return FQDNAdress.test(FQDNAddress);
}

export function validateWildCard(wildCard: string) {
	const WildCardAdress = /(.+?)(?=\.)/;
	return WildCardAdress.test(wildCard);
}

export function validateAddress(address: string) {
	const addressRegex = /^(?=.{1,253}$)(([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,})\.?$/;

	return addressRegex.test(address);
}

export function validatePort(value: string | number) {
	const convertType = Number(value);
	if (Number.isNaN(convertType)) {
		return "Port must be number";
	}
	if ((value && +value < 0) || (value && +value > 65535)) {
		return "Port must be between 0 and 65535";
	}
	return null;
}

export function getValueType(value: string): "string" | "number" | "date" | "ip" {
	if (validateIP(value)) {
		return "ip";
	}
	if (dayjs(value, "YYYY-MMM-DD", true).isValid()) {
		return "date";
	}
	if (isNumber(value)) {
		return "number";
	}
	return "string";
}

export function PercentageConversion(value: number, total: number) {
	if (!total) {
		return 0;
	}
	return (value / total) * 100;
}

export function JsonParse<T extends object>(value?: string): T | undefined {
	if (!value) return undefined;
	let result: T | undefined;
	try {
		result = JSON.parse(value);
		if (!result) {
			result = undefined;
		}
		if (typeof result !== "object") {
			result = undefined;
		}
	} catch (_err) {
		result = undefined;
	}
	return result;
}

export function numberToLocaleString(value: string | number) {
	if (isNumber(+value)) {
		return (+value).toLocaleString();
	}
	return value;
}

export function isUUID(str: string) {
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return uuidRegex.test(str);
}
