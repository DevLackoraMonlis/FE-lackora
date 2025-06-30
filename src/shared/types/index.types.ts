export type ApiFieldsObjectTypes = "connection" | "none";
export type ApiFieldsTypes = "Int64" | "String" | "Boolean" | "Datetime" | "Textarea" | "Select" | "IP";
export type ApiFieldsOptions = { label: string; value: string };

export type ApiFields = {
	label: string;
	key: string;
	required?: boolean | null;
	paginate?: boolean | null;
	objectType?: ApiFieldsObjectTypes | null;
	type?: ApiFieldsTypes | null;
	options?: ApiFieldsOptions[] | null;
};
