import type {
	ICAdvancedFilterColumnType,
	ICAdvancedFilterOrder,
	ICAdvancedFilterProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { ActionIcon, Box, Menu, MenuDivider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
	IconArrowsSort,
	IconRotateClockwise,
	IconSortAscending,
	IconSortAscendingNumbers,
	IconSortDescending,
	IconSortDescendingNumbers,
} from "@tabler/icons-react";
import type { ReactNode } from "react";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

type Props<T> = {
	columnName: string;
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
	store: ICAdvancedFilterProps<T>["store"];
	run: ICAdvancedFilterProps<T>["run"];
	visibleParent: boolean;
};

export default function ICAdvancedFilterGridColumnSort<T>(props: Props<T>) {
	const [opened, handlers] = useDisclosure(false);

	const store = useStore(
		props.store,
		useShallow((state) => ({
			column: state.variables.columns.find((column) => column.name === props.columnName),
			updateOrder: state.updateOrder,
		})),
	);

	const targetNumberIconMap: (size: number) => Record<ICAdvancedFilterOrder, ReactNode> = (size = 12) => ({
		asc: <IconSortAscendingNumbers size={size} />,
		desc: <IconSortDescendingNumbers size={size} />,
	});

	const targetStringIconMap: (size: number) => Record<ICAdvancedFilterOrder, ReactNode> = (size) => ({
		asc: <IconSortAscending size={size} />,
		desc: <IconSortDescending size={size} />,
	});

	const getColumnOptions = props.allColumns.find((column) => column.name === props.columnName);

	const numberTypes: ICAdvancedFilterColumnType[] = ["Int64", "IP"];

	const getSortIcon = (order: ICAdvancedFilterOrder, size = 12) => {
		if (numberTypes.includes(getColumnOptions?.type || "String")) {
			return targetNumberIconMap(size)[order];
		}
		return targetStringIconMap(size)[order];
	};

	const getTargetIcon = () => {
		if (store.column?.orderBy) {
			return getSortIcon(store.column.orderBy, 16);
		}
		return <IconArrowsSort size={16} />;
	};

	return (
		<Menu
			width={200}
			radius="md"
			shadow="md"
			withArrow
			opened={opened}
			position="bottom-end"
			closeOnClickOutside
			onClose={handlers.close}
		>
			<Menu.Target>
				{props.visibleParent || opened ? (
					<ActionIcon color={"black"} variant={"transparent"} onClick={handlers.open}>
						{getTargetIcon()}
					</ActionIcon>
				) : (
					<Box h={16} w={16} />
				)}
			</Menu.Target>
			{opened && (
				<Menu.Dropdown p={0}>
					<Menu.Item
						leftSection={getSortIcon("asc")}
						onClick={() => {
							store.updateOrder(props.columnName, "asc");
							props.run(true);
						}}
					>
						Sort Ascending
					</Menu.Item>
					<Menu.Item
						leftSection={getSortIcon("desc")}
						onClick={() => {
							store.updateOrder(props.columnName, "desc");
							props.run(true);
						}}
					>
						Sort Descending
					</Menu.Item>
					<MenuDivider />
					<Menu.Item
						leftSection={<IconRotateClockwise size={12} />}
						onClick={() => {
							store.updateOrder(props.columnName, null);
							props.run(true);
						}}
					>
						Reset to Default
					</Menu.Item>
				</Menu.Dropdown>
			)}
		</Menu>
	);
}
