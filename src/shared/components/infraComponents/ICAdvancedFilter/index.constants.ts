import {
	ICAdvancedFilterCriticality,
	ICAdvancedFilterState,
	ICAdvancedFilterStatus,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.enum";
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

export const IC_ADVANCED_FILTER_CRITICALITY_COLOR: Record<ICAdvancedFilterCriticality, string> = {
	[ICAdvancedFilterCriticality.HIGH]: "#F76707",
	[ICAdvancedFilterCriticality.LOW]: "#12B886",
	[ICAdvancedFilterCriticality.MEDIUM]: "#FAB005",
	[ICAdvancedFilterCriticality.VERY_HIGH]: "#FA5252",
};

export const IC_ADVANCED_FILTER_STATUS_COLOR: Record<ICAdvancedFilterStatus, string> = {
	[ICAdvancedFilterStatus.ASSOCIATED]: "#3BC9DB",
	[ICAdvancedFilterStatus.DEFECTIVE]: "#C92A2A",
	[ICAdvancedFilterStatus.EXTERNAL]: "#FAB005",
	[ICAdvancedFilterStatus.GUEST]: "#7950F2",
	[ICAdvancedFilterStatus.UNREACHABLE]: "#868E96",
	[ICAdvancedFilterStatus.PROFILED]: "#087F5B",
};

export const IC_ADVANCED_FILTER_STATE_COLOR: Record<ICAdvancedFilterState, string> = {
	[ICAdvancedFilterState.MANAGEABLE]: "#4C6EF5",
	[ICAdvancedFilterState.UNMANAGEABLE]: "#868E96",
};
