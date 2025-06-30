import { isNumber } from "lodash";

import type { BCDynamicFieldProps } from "./index.types";

import { NumberInput, Select, TextInput, Textarea } from "@mantine/core";

export function getDynamicField<T extends string>({
	type = "String",
	label = "",
	options = [],
	required: fieldIsRequired,
	placeholder = "",
	defaultValue: defaultValueAsUnknown,
	formInputProps,
	otherElementOptions = {},
}: Omit<BCDynamicFieldProps<T>, "objectType">) {
	const required = !!fieldIsRequired;
	const defaultValue = isNumber(defaultValueAsUnknown) ? `${defaultValueAsUnknown}` : defaultValueAsUnknown;
	switch (type) {
		case "List":
			return (
				<Select
					{...{
						...otherElementOptions,
						label,
						data: options || [],
						required,
						placeholder,
						defaultValue,
						...(formInputProps || {}),
					}}
				/>
			);
		case "Int64":
			return (
				<NumberInput
					{...{
						...otherElementOptions,
						label,
						options,
						required,
						placeholder,
						defaultValue,
						...(formInputProps || {}),
					}}
				/>
			);
		case "Boolean":
			return "";
		case "Select": {
			const defaultValueAsString = isNumber(defaultValue) ? `${defaultValue}` : defaultValue;
			return (
				<Select
					{...{
						...otherElementOptions,
						label,
						data: options || [],
						required,
						placeholder,
						defaultValue: defaultValueAsString,
						...(formInputProps || {}),
					}}
				/>
			);
		}
		case "Datetime":
			return "";
		case "Textarea":
			return (
				<Textarea
					{...{
						...otherElementOptions,
						label,
						options,
						required,
						placeholder,
						defaultValue,
						...(formInputProps || {}),
					}}
				/>
			);
		case "IP":
			return (
				<TextInput
					{...{
						...otherElementOptions,
						label,
						options,
						required,
						placeholder,
						defaultValue,
						...(formInputProps || {}),
					}}
				/>
			);
		default:
			return (
				<TextInput
					{...{
						...otherElementOptions,
						label,
						options,
						required,
						placeholder,
						defaultValue,
						...(formInputProps || {}),
					}}
				/>
			);
	}
}
