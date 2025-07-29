import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Button, Flex, Select, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useCallback, useEffect } from "react";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";
import classes from "./index.module.css";

type Props<T> = {
	searchInputPlaceholder: ICAdvancedFilterProps<T>["searchInputPlaceholder"];
	searchInputItems: ICAdvancedFilterProps<T>["searchInputItems"];
	store: ICAdvancedFilterProps<T>["store"];
	run: ICAdvancedFilterProps<T>["run"];
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
};

export default function ICAdvancedFilterSearch<T>(props: Props<T>) {
	const store = useStore(
		props.store,
		useShallow((state) => ({
			search: state.variables.search,
			setSearch: state.setSearch,
		})),
	);

	const getColumnOption = useCallback(
		(columnName: string) => {
			return props.allColumns.find((column) => column.name === columnName);
		},
		[props.allColumns],
	);

	useEffect(() => {
		if (props.searchInputItems?.[0]?.value) {
			store.setSearch({
				columnName: props.searchInputItems?.[0]?.value,
				value: "",
			});
		}
	}, [props.searchInputItems?.[0]?.value]);

	return (
		<Flex align={"center"}>
			{props.searchInputItems?.[0]?.value ? (
				<Select
					key={"has-default-value"}
					classNames={{
						input: classes.select,
					}}
					w={150}
					defaultValue={props.searchInputItems[0].value}
					size={"sm"}
					onChange={(value) => {
						store.setSearch({
							columnName: value,
							value: store.search.value || "",
						});
					}}
					data={props.searchInputItems}
					allowDeselect={false}
				/>
			) : (
				<Select
					key={"no-default-value"}
					disabled
					classNames={{
						input: classes.select,
					}}
					w={150}
					size={"sm"}
					allowDeselect={false}
				/>
			)}

			<TextInput
				classNames={{
					input: classes.input,
				}}
				w={210}
				radius={"0 4px 4px 0"}
				size={"sm"}
				value={store.search.value}
				placeholder={`Search by ${getColumnOption(store.search.columnName || props.searchInputItems?.[0]?.value || "")?.displayName || store.search.columnName}`}
				leftSection={<IconSearch size={16} />}
				onChange={(event) =>
					store.setSearch({
						columnName: store.search.columnName,
						value: event.target.value,
					})
				}
				onKeyDown={getHotkeyHandler([["Enter", props.run]])}
			/>
			<Button ml={"2xs"} px={"xs"} onClick={() => props.run()}>
				<IconSearch size={20} />
			</Button>
		</Flex>
	);
}
