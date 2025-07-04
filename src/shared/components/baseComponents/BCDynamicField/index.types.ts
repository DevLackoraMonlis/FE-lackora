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
	defaultValue?: LabelValueType | null | string;
	otherElementOptions?: { [key: string]: unknown };
	required?: boolean | null;
	paginate?: boolean | null;
	disabled?: boolean | null;
	objectType?: T;
	type?: BCDynamicFieldType | null;
	options?: LabelValueType[] | null;
	api?: (
		variables: PaginationRq<{ object_type?: string | null }>,
		signal?: AbortSignal,
	) => Promise<AxiosResponse<PaginationRs<LabelValueType>>>;
};

export type BCDynamicConfigRs = {
	key: string;
	value?: LabelValueType | string | null;
	id?: string | null;
	type?: string | null;
	idAsValue?: boolean;
	editable?: boolean;
};

export type BCDynamicConfigRq = Omit<BCDynamicConfigRs, "idAsValue" | "editable">;

export type BCDynamicFieldRs = {
	label: string;
	key: string;
	object_type?: string | null;
	type?: BCDynamicFieldType | null;
	paginate?: boolean | null;
	options?: LabelValueType[] | null;
	required: boolean;
};
