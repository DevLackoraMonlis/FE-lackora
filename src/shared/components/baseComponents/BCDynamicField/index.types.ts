import type { PaginationRq, PaginationRs } from "@/http/end-points/GeneralService.types";
import type { LabelValueType } from "@/shared/lib/general-types";
import type { AxiosResponse } from "axios";
import type { ReactNode } from "react";

export type BCDynamicFieldType =
	| "Int64"
	| "String"
	| "Boolean"
	| "DateTime"
	| "Date"
	| "Textarea"
	| "Select"
	| "IP"
	| "List"
	| "ListWithApi";

export type OptionsLabelValueType = Array<LabelValueType & { [key: string]: OptionsLabelValueType }>;

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
	custom?: boolean | null;
	objectType?: T | null;
	type?: BCDynamicFieldType | null;
	options?: LabelValueType[] | OptionsLabelValueType | null;
	renderFooterInList?: ReactNode;
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
	objectType?: string | null;
	type?: BCDynamicFieldType | null;
	paginate?: boolean | null;
	options?: LabelValueType[] | OptionsLabelValueType | null;
	required: boolean;
	disabled?: boolean;
};
