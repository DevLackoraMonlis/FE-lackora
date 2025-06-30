import type { LabelValueType } from "@/shared/lib/general-types";
export type BCDynamicFieldType =
	| "Int64"
	| "String"
	| "Boolean"
	| "Datetime"
	| "Textarea"
	| "Select"
	| "IP"
	| "List";

export type BCDynamicFieldProps<T extends string> = {
	formInputProps?: unknown;
	placeholder?: string;
	defaultValue?: string | number;
	otherElementOptions?: { [key: string]: unknown };
	label: string;
	key: string;
	required?: boolean | null;
	paginate?: boolean | null;
	objectType?: T;
	type?: BCDynamicFieldType | null;
	options?: LabelValueType[] | null;
};
