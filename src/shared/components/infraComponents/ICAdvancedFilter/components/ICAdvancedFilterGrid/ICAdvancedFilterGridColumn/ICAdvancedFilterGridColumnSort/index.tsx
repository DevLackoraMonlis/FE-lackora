import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import type {
	ICAdvancedFilterColumnType,
	ICAdvancedFilterOrder,
	ICAdvancedFilterProps,
	ICAdvancedFilterStoreType,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { ActionIcon, Menu, MenuDivider } from "@mantine/core";
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
import { type StoreApi, useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

type Props<T> = {
	column: TanStackDataTableColumnColDef<T>;
	store: StoreApi<ICAdvancedFilterStoreType>;
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
};

export default function ICAdvancedFilterGridColumnSort<T>(props: Props<T>) {
	const [opened, handlers] = useDisclosure(false);

	const store = useStore(
		props.store,
		useShallow((state) => ({
			column: state.variables.columns.find((column) => column.name === props.column.accessor),
			updateOrder: state.updateOrder,
		})),
	);

	const targetNumberIconMap: Record<ICAdvancedFilterOrder, ReactNode> = {
		asc: <IconSortAscendingNumbers size={12} />,
		desc: <IconSortDescendingNumbers size={12} />,
	};

	const targetStringIconMap: Record<ICAdvancedFilterOrder, ReactNode> = {
		asc: <IconSortAscending size={12} />,
		desc: <IconSortDescending size={12} />,
	};

	const getColumnOptions = props.allColumns.find((column) => column.name === props.column.accessor);

	const numberTypes: ICAdvancedFilterColumnType[] = ["Int64", "IP"];

	const getSortIcon = (order: ICAdvancedFilterOrder) => {
		if (numberTypes.includes(getColumnOptions?.type || "String")) {
			return targetNumberIconMap[order];
		}
		return targetStringIconMap[order];
	};

	const getTargetIcon = () => {
		if (store.column?.orderBy) {
			return getSortIcon(store.column.orderBy);
		}
		return <IconArrowsSort size={20} />;
	};

	return (
		<Menu
			width={200}
			radius="md"
			shadow="md"
			opened={opened}
			position="bottom-end"
			closeOnClickOutside
			onClose={handlers.close}
		>
			<Menu.Target>
				<ActionIcon onClick={handlers.open}>{getTargetIcon()}</ActionIcon>
			</Menu.Target>
			{opened && (
				<Menu.Dropdown p={0}>
					<Menu.Item
						leftSection={getSortIcon("asc")}
						onClick={() => store.updateOrder(props.column.accessor, "asc")}
					>
						Sort Ascending
					</Menu.Item>
					<Menu.Item
						leftSection={getSortIcon("desc")}
						onClick={() => store.updateOrder(props.column.accessor, "desc")}
					>
						Sort Descending
					</Menu.Item>
					<MenuDivider />
					<Menu.Item
						leftSection={<IconRotateClockwise size={12} />}
						onClick={() => store.updateOrder(props.column.accessor, null)}
					>
						Reset to Default
					</Menu.Item>
				</Menu.Dropdown>
			)}
		</Menu>
	);
}
