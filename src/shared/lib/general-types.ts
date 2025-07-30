import type { ReactNode } from "react";

export type LabelValueType<T extends ReactNode = string> = {
	label: string;
	value: T;
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
