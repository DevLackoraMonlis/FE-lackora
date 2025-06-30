import type { LabelValueType } from "@/shared/lib/general-types";
export type BCDynamicFieldObjectType = "connection" | "none";
export type BCDynamicFieldType = "Int64" | "String" | "Boolean" | "Datetime" | "Textarea" | "Select" | "IP";

export type BCDynamicFieldProps = {
	formInputProps?: unknown;
	placeholder?: string;
	defaultValue?: string | number;
	otherElementOptions?: { [key: string]: unknown };
	label: string;
	key: string;
	required?: boolean | null;
	paginate?: boolean | null;
	objectType?: BCDynamicFieldObjectType | null;
	type?: BCDynamicFieldType | null;
	options?: LabelValueType[] | null;
};
