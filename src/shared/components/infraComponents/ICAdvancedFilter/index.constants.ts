import type { ICAdvancedFilterColumnType } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";

export const IC_ADVANCED_FILTER_DEFAULT_OPERATORS = {
	"=": "equal",
	"==": "==",
	"!==": "!==",
	"!=": "notequal",
	">": "greaterthan",
	">=": "greaterthanequal",
	"<": "lowerthan",
	"<=": "lowerthanequal",
	"Is Null": "isnull",
	"Is Not Null": "isnotnull",
	"Field Equal": "fieldequal",
	"Field Not Equal": "fieldnotequal",
} as const;

export const IC_ADVANCED_FILTER_STRING_OPERATORS = {
	...IC_ADVANCED_FILTER_DEFAULT_OPERATORS,
	Like: "like",
	"Not Like": "notlike",
	"Starts With": "startwith",
	"Not Starts With": "notstart",
	"Ends With": "endwith",
	"Not Ends With": "notend",
	Regex: "regex",
	"Field Like": "fieldlike",
	"Field Not Like": "fieldnotlike",
} as const;

export const IC_ADVANCED_FILTER_INT64_OPERATORS = {
	...IC_ADVANCED_FILTER_DEFAULT_OPERATORS,
} as const;

export const IC_ADVANCED_FILTER_DATE_OPERATORS = {
	...IC_ADVANCED_FILTER_DEFAULT_OPERATORS,
	Like: "like",
	"Not Like": "notlike",
	"Field Like": "fieldlike",
	"Field Not Like": "fieldnotlike",
} as const;

export const IC_ADVANCED_FILTER_OPERATORS_MAP: Record<
	Exclude<ICAdvancedFilterColumnType, "Boolean">,
	Record<string, string>
> = {
	Date: IC_ADVANCED_FILTER_DATE_OPERATORS,
	DateTime: IC_ADVANCED_FILTER_DATE_OPERATORS,
	Int64: IC_ADVANCED_FILTER_INT64_OPERATORS,
	IP: IC_ADVANCED_FILTER_INT64_OPERATORS,
	List: IC_ADVANCED_FILTER_STRING_OPERATORS,
	String: IC_ADVANCED_FILTER_STRING_OPERATORS,
};
