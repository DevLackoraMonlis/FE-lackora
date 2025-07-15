export type LabelValueType = {
	label: string;
	value: string;
};

export type LabelValueFilter = {
	label: string;
	value: string | boolean;
	icon?: string | null;
};

export type LabelNameType = {
	label: string;
	name: string;
};

export type SetStateStore<T> = (
	partial: T | Partial<T> | ((state: T) => T | Partial<T>),
	replace?: false | undefined,
) => void;
