import { NumberInput, TextInput, Textarea } from "@mantine/core";
import type { FormValidateInput } from "@mantine/form";
import { isObject } from "lodash";
import type { RefObject } from "react";

import { getObjectRelatedRecords } from "@/http/generated/object-management";
import { isUUID, validateInput } from "@/shared/lib/utils";

import type {
	BCDynamicConfigRs,
	BCDynamicFieldProps,
	BCDynamicFieldRs,
	OptionsLabelValueType,
} from "./index.types";

import ListDynamicApiField from "./components/ListDynamicApiField";
import ListDynamicField from "./components/ListDynamicField";

export function getDynamicField<TObjectType extends string>({
	type = "String",
	label = "",
	options = [],
	required: fieldIsRequired,
	placeholder = "",
	defaultValue,
	formInputProps,
	key: keyForElements,
	otherElementOptions = {},
	api,
	objectType,
	paginate,
	disabled,
	renderFooterInList,
	custom,
}: BCDynamicFieldProps<TObjectType>) {
	if (objectType) type = "ListWithApi";
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
		case "ListWithApi":
			return (
				<ListDynamicApiField<TObjectType>
					key={keyForElements}
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
		case "List":
			return (
				<ListDynamicField<TObjectType>
					key={keyForElements}
					{...{
						custom,
						objectType,
						options,
						...commonOptions,
						defaultValue,
					}}
				/>
			);
		case "Int64":
			return <NumberInput key={keyForElements} {...commonOptions} />;
		case "Boolean":
			return "";
		case "DateTime":
			return "";
		case "Date":
			return "";
		case "Textarea":
			return <Textarea key={keyForElements} {...commonOptions} />;
		case "IP":
			return <TextInput key={keyForElements} {...commonOptions} />;
		default:
			return <TextInput key={keyForElements} {...commonOptions} />;
	}
}

export function getDynamicFieldValidate<FormValues, T extends string>(
	fields: Pick<BCDynamicFieldProps<T>, "key" | "type" | "required">[] = [],
) {
	const validations = fields.reduce(
		(accumulator, { key, type, required }) => {
			accumulator[key] = (value: string) =>
				validateInput(value, {
					required: !!required,
					mustBeIP: type === "IP",
					mustBeNumber: type === "Int64",
					mustBeEmail: key.includes("email"),
					mustBeURI: key.includes("uri"),
					mustBePort: key.includes("port"),
				});
			return accumulator;
		},
		{} as Record<string, unknown>,
	);

	return validations as FormValidateInput<FormValues>;
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
		configs?.map(({ key }) => {
			const value = values[key] as string;
			const isId = isUUID(value);
			const valueOrId = { [isId ? "id" : "value"]: value };
			return {
				type: isId ? key : null,
				key,
				id: null,
				value: null,
				...valueOrId,
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
			api: getObjectRelatedRecords as BCDynamicFieldProps<string>["api"],
			objectType: object_type,
		})) || []
	);
};

export function fieldsTransformDependenciesOptions<FormItem extends Record<string, unknown>>(
	{ key: fieldKey, listKey }: { key: string; listKey: string },
	formItem: FormItem,
	fields: BCDynamicFieldRs[],
	updateValuesState: RefObject<FormItem>,
) {
	const updateOptions = {} as Record<string, unknown>;

	fields.forEach((field) => {
		const formValue = formItem?.[field.key];
		if (!formValue) return;
		const fieldOptions = field?.options as OptionsLabelValueType | null;
		const haveDependency = fieldOptions
			?.filter(({ value }) => value === formValue)
			?.find((object) => object[fieldKey]);

		if (haveDependency) {
			const defaultValues = haveDependency[fieldKey];
			const defaultValuesLength = defaultValues?.length;
			if (defaultValuesLength === 1) {
				const defaultValue = haveDependency[fieldKey][0];
				updateOptions.defaultValue = defaultValue;
				updateOptions.disabled = true;
				updateValuesState.current = { ...updateValuesState.current, [listKey]: defaultValue.value };
			}
			if (defaultValuesLength && defaultValuesLength > 1) {
				updateOptions.options = defaultValues;
				updateOptions.custom = false;
				// updateValuesState.current = { ...updateValuesState.current, [listKey]: undefined };
			}
		}
	});

	return updateOptions;
}
