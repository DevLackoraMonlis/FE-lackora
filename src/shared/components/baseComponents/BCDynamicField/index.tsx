import { NumberInput, Select, TextInput, Textarea } from "@mantine/core";
import { isObject } from "lodash";

import { getObjectRelatedRecords } from "@/http/generated/object-management";
import { validateIP, validateInput } from "@/shared/lib/utils";

import ListDynamicField from "./components/ListDynamicField";
import type { BCDynamicConfigRs, BCDynamicFieldProps, BCDynamicFieldRs } from "./index.types";

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
	renderFooterInList,
}: BCDynamicFieldProps<TObjectType>) {
	if (objectType) type = "List";

	const commonOptions = {
		label,
		placeholder,
		defaultValue: isObject(defaultValue) ? defaultValue?.value : defaultValue || "",
		required: !!fieldIsRequired,
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
						renderFooterInList,
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

export function getDynamicFieldValidate<T extends string>(
	fields: Pick<BCDynamicFieldProps<T>, "key" | "type" | "required">[] = [],
) {
	return fields.reduce(
		(accumulator, { key, type, required }) => {
			switch (type) {
				case "IP":
					accumulator[key] = (value: string) => {
						return value ? validateIP(value) : validateInput(value, { required: !!required });
					};
					break;
				default:
					accumulator[key] = (value: string) => validateInput(value, { required: !!required });
					break;
			}
			return accumulator;
		},
		{} as Record<string, unknown>,
	);
}

export const configsTransformRs = (configs: BCDynamicConfigRs[]) => {
	return (
		configs?.map(({ value, ...item }) => ({
			...item,
			value: typeof value === "string" ? { label: value, value: value } : value,
			idAsValue: !!(value && isObject(value)),
		})) || []
	);
};

export const configsUpdateTransformRq = (configs: BCDynamicConfigRs[], values: Record<string, unknown>) => {
	return (
		configs?.map(({ key, idAsValue }) => {
			const customValue = values[key] as string;
			return {
				type: idAsValue ? key : null,
				key,
				id: idAsValue ? customValue : null,
				value: idAsValue ? null : customValue,
			};
		}) || []
	);
};

export const configsCreateTransformRq = (fields: BCDynamicFieldRs[], values: Record<string, unknown>) => {
	return Object.entries(values).map(([key, value]) => {
		const objectType = fields?.find(({ key: fieldKey }) => key === fieldKey)?.objectType;
		const valueOrId = { [objectType ? "id" : "value"]: value };
		return {
			key,
			type: objectType || null,
			value: null,
			id: null,
			...valueOrId,
		};
	});
};

export const fieldsTransformRs = (
	fields: Array<Omit<BCDynamicFieldRs, "object_type"> & { object_type?: string | null }>,
) => {
	return (
		fields?.map(({ object_type, ...item }) => ({
			...item,
			api: getObjectRelatedRecords,
			objectType: object_type,
		})) || []
	);
};
