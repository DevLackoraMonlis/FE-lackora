import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Button, Flex, Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

type Props<T> = {
	searchInputPlaceholder: ICAdvancedFilterProps<T>["searchInputPlaceholder"];
	searchInputItems: ICAdvancedFilterProps<T>["searchInputItems"];
	store: ICAdvancedFilterProps<T>["store"];
	run: ICAdvancedFilterProps<T>["run"];
};

export default function ICAdvancedFilterSearch<T>(props: Props<T>) {
	const store = useStore(
		props.store,
		useShallow((state) => ({
			search: state.variables.search,
			setSearch: state.setSearch,
		})),
	);

	return (
		<Flex align={"center"}>
			<Select
				radius={"4px 0 0 4px"}
				size={"sm"}
				onChange={(value) =>
					store.setSearch({
						columnName: value,
						value: store.search.value || "",
					})
				}
				data={props.searchInputItems}
				allowDeselect={false}
			/>
			<TextInput
				radius={"0 4px 4px 0"}
				size={"sm"}
				placeholder={props.searchInputPlaceholder}
				leftSection={<IconSearch />}
				onChange={(event) =>
					store.setSearch({
						columnName: store.search.columnName,
						value: event.target.value,
					})
				}
			/>
			<Button size={"lg"} onClick={props.run}>
				<IconSearch size={20} />
			</Button>
		</Flex>
	);
}
