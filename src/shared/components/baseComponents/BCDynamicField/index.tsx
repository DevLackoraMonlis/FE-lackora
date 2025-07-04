import { NumberInput, Select, TextInput, Textarea } from "@mantine/core";

import ListDynamicField from "./components/ListDynamicField";
import type { BCDynamicFieldProps } from "./index.types";

export function getDynamicField<TObjectType extends string>({
	type = "String",
	label = "",
	options = [],
	required: fieldIsRequired,
	placeholder = "",
	defaultValue,
	formInputProps,
	otherElementOptions = {},
	api,
	objectType,
	paginate,
	disabled,
}: BCDynamicFieldProps<TObjectType>) {
	if (objectType) type = "List";

	const commonOptions = {
		label,
		required: !!fieldIsRequired,
		placeholder,
		defaultValue: defaultValue?.value,
		disabled: !!disabled,
		...otherElementOptions,
		...(formInputProps || {}),
	};

	switch (type) {
		case "List":
			return (
				<ListDynamicField<TObjectType>
					{...{
						api,
						objectType,
						paginate,
						...commonOptions,
						defaultValue,
					}}
				/>
			);
		case "Select": {
			return (
				<Select
					{...{
						...commonOptions,
						data: options || [],
					}}
				/>
			);
		}
		case "Int64":
			return <NumberInput {...commonOptions} />;
		case "Boolean":
			return "";
		case "Datetime":
			return "";
		case "Textarea":
			return <Textarea {...commonOptions} />;
		case "IP":
			return <TextInput {...commonOptions} />;
		default:
			return <TextInput {...commonOptions} />;
	}
}
