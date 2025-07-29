import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { ActionIcon, Badge, Flex, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

type Props<T> = {
	columnName: string;
	store: ICAdvancedFilterProps<T>["store"];
	run: ICAdvancedFilterProps<T>["run"];
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
};

export default function ICAdvancedFilterConditionGroupByItem<T>(props: Props<T>) {
	const store = useStore(
		props.store,
		useShallow((state) => ({
			variables: state.variables,
			setColumns: state.setColumns,
			setGroupBy: state.setGroupBy,
		})),
	);

	return (
		<Flex align={"center"} gap={"xs"} wrap={"nowrap"}>
			<Text fz={"xs"}>{store.variables.groupBy?.function}</Text>
			<Badge
				rightSection={
					<ActionIcon
						variant={"transparent"}
						onClick={() => {
							const filteredColumns = store.variables.columns.filter(
								(column) => column.name !== props.columnName,
							);
							if (!filteredColumns.length) {
								store.setColumns(props.allColumns.filter((column) => column.isDefault));
								store.setGroupBy(undefined);
							} else {
								store.setColumns(filteredColumns);
							}
							props.run();
						}}
					>
						<IconX size={12} />
					</ActionIcon>
				}
				size={"sm"}
				radius={"xl"}
				variant={"light"}
				color={"gray"}
			>
				{props.columnName}
			</Badge>
		</Flex>
	);
}
