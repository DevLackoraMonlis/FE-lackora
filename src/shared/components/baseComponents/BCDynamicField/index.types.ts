import type { PaginationRq, PaginationRs } from "@/http/end-points/GeneralService.types";
import type { LabelValueType } from "@/shared/lib/general-types";
import type { AxiosResponse } from "axios";
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
	label: string;
	key: string;
	formInputProps?: unknown;
	placeholder?: string;
	defaultValue?: string | number;
	otherElementOptions?: { [key: string]: unknown };
	required?: boolean | null;
	paginate?: boolean | null;
	objectType?: T;
	type?: BCDynamicFieldType | null;
	options?: LabelValueType[] | null;
	api?: (
		variables: PaginationRq<{ type: string }>,
		signal?: AbortSignal,
	) => Promise<AxiosResponse<PaginationRs<LabelValueType>>>;
};

export type BCDynamicFieldGenerator<T extends string> = {
	label: string;
	key: string;
	type?: BCDynamicFieldType | null;
	options?: LabelValueType[] | null;
	required?: boolean | null;
	paginate?: boolean | null;
	objectType?: T;
};
