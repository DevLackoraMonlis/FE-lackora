import type { ApiFields } from "@/shared/types/index.types";

export type DynamicFiled = ApiFields & {
	formInputProps: unknown;
	placeholder?: string;
	defaultValue?: string | number;
	otherElementOptions?: { [key: string]: unknown };
};
