export const dateRegex = [
	/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}$/, // "YYYY-MM-DDTHH:mm:ss.SSSSSS"
];

export const dateFormats: string[] = [
	"YYYY-MM-DD-HH-mm-ss",
	"YYYY/MM/DDTHH",
	"YYYY/MM/DDTHH:mm",
	"YYYY/MM/DDTHH:mm:ss",
	"YYYY-MM-DD HH:mm",
	"YYYY-MM-DD",
	"YYYY-MM-DD HH",
	"MMM DD,YYYY",
	"YYYY-MM-DD HH:mm:ss",
	// ISO 8601 without timezone
	"YYYY-MM-DDTHH:mm:ss",
	"YYYY-MM-DDTHH",
	"YYYY-MM-DDTHH:mm",
	"YYYY-MM-DDTHH:mm:ss",
	"YYYY-MM-DDTHH:mm:ss.S",
	"YYYY-MM-DDTHH:mm:ss.SS",
	"YYYY-MM-DDTHH:mm:ss.SSS",
	// ISO 8601 with 'Z' for UTC
	"YYYY-MM-DDTHH:mm:ssZ",
	"YYYY-MM-DDTHHZ",
	"YYYY-MM-DDTHH:mmZ",
	"YYYY-MM-DDTHH:mm:ss.SZ",
	"YYYY-MM-DDTHH:mm:ss.SSZ",
	"YYYY-MM-DDTHH:mm:ss.SSSZ",
	"YYYY-MM-DDTHHZZ",
	"YYYY-MM-DDTHH:mmZZ",
	"YYYY-MM-DDTHH:mm:ssZZ",
	"YYYY-MM-DDTHH:mm:ss.SZZ",
	"YYYY-MM-DDTHH:mm:ss.SSZZ",
	"YYYY-MM-DDTHH:mm:ss.SSSZZ",
];
