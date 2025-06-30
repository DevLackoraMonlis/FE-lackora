import { isNumber } from "lodash";

import type { BCDynamicFieldProps } from "./index.types";

import { useTablePagination } from "@/shared/hooks/useTablePagination";
import { NumberInput, Select, TextInput, Textarea } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function getDynamicField<TObjectType extends string>({
	type = "String",
	label = "",
	options = [],
	required: fieldIsRequired,
	placeholder = "",
	defaultValue: defaultValueAsUnknown,
	formInputProps,
	otherElementOptions = {},
	objectType,
	api,
}: BCDynamicFieldProps<TObjectType>) {
	const required = !!fieldIsRequired;
	const { setTotalRecords, tablePagination } = useTablePagination();
	const [search, setSearch] = useState("");
	const defaultValue = isNumber(defaultValueAsUnknown) ? `${defaultValueAsUnknown}` : defaultValueAsUnknown;

	const getObjectQuery = useQuery({
		enabled: type === "List" && !!objectType,
		queryKey: ["get-object-data", objectType, tablePagination.page, tablePagination.recordsPerPage],
		queryFn: ({ signal }) =>
			api?.(
				{ limit: tablePagination.recordsPerPage, page: tablePagination.page, search, type: objectType || "" },
				signal,
			),
	});

	useEffect(() => {
		if (getObjectQuery.data?.data.total) {
			setTotalRecords(getObjectQuery.data?.data.total);
		}
	}, [getObjectQuery.data?.data.total]);

	switch (type) {
		case "List":
			return (
				<Select
					onSearchChange={setSearch}
					data={options?.length ? options : getObjectQuery.data?.data.results || []}
					{...{
						...otherElementOptions,
						label,
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
