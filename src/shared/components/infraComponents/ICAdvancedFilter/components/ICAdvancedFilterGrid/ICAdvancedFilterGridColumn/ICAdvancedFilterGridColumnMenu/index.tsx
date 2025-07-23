import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import ICAdvancedFilterGridColumnMenuSearchValues from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridColumn/ICAdvancedFilterGridColumnMenu/ICAdvancedFilterGridColumnMenuSearchValues";
import { ICAdvancedGroupByFunctions } from "@/shared/components/infraComponents/ICAdvancedFilter/index.enum";
import type {
	ICAdvancedFilterProps,
	ICAdvancedFilterStoreType,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { unsecuredCopyToClipboard } from "@/shared/lib/utils";
import { ActionIcon, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCopy, IconDotsVertical, IconEyeOff, IconPuzzle, IconSearch } from "@tabler/icons-react";
import { type StoreApi, useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

type Props<T> = {
	column: TanStackDataTableColumnColDef<T>;
	store: StoreApi<ICAdvancedFilterStoreType>;
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
	run: ICAdvancedFilterProps<T>["run"];
};

export default function ICAdvancedFilterGridColumnMenu<T>(props: Props<T>) {
	const [opened, handlers] = useDisclosure(false);
	const [openedSearchValuesMenu, searchValuesMenuHandlers] = useDisclosure(false);

	const store = useStore(
		props.store,
		useShallow((state) => ({
			column: state.variables.columns.find((column) => column.name === props.column.accessor),
			updateOrder: state.updateOrder,
			getIsGroupByFunctionColumn: state.getIsGroupByFunctionColumn,
			hideColumn: state.hideColumn,
			setGroupBy: state.setGroupBy,
			setColumns: state.setColumns,
		})),
	);

	const getColumnOptions = props.allColumns.find((column) => column.name === props.column.accessor);

	if (openedSearchValuesMenu) {
		return (
			<ICAdvancedFilterGridColumnMenuSearchValues
				column={props.column}
				allColumns={props.allColumns}
				store={props.store}
				onClose={() => {
					searchValuesMenuHandlers.close();
					handlers.close();
				}}
				opened={openedSearchValuesMenu}
				run={props.run}
			/>
		);
	}

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
				<ActionIcon onClick={handlers.open}>
					<IconDotsVertical />
				</ActionIcon>
			</Menu.Target>
			{opened && (
				<Menu.Dropdown p={0}>
					<Menu.Item
						disabled={store.getIsGroupByFunctionColumn(getColumnOptions?.name || "")}
						leftSection={<IconEyeOff />}
						onClick={() => {
							store.hideColumn(getColumnOptions?.name || "");
							props.run();
						}}
					>
						Hide Column
					</Menu.Item>
					<Menu.Item
						leftSection={<IconPuzzle />}
						onClick={() => {
							store.setGroupBy({
								function: ICAdvancedGroupByFunctions.COUNT,
								order: null,
								displayName: getColumnOptions?.displayName || "",
								column: getColumnOptions?.name || "",
								aggregatedConditions: [],
							});
							store.setColumns([
								{
									name: getColumnOptions?.name || "",
									orderBy: null,
								},
							]);
							props.run();
						}}
					>
						Group by this Column
					</Menu.Item>
					<Menu.Item leftSection={<IconSearch size={12} />} onClick={() => searchValuesMenuHandlers.open}>
						Search Values...
					</Menu.Item>
					<Menu.Item
						leftSection={<IconCopy size={12} />}
						onClick={() => unsecuredCopyToClipboard(getColumnOptions?.name || "")}
					>
						Copy Column Title
					</Menu.Item>
				</Menu.Dropdown>
			)}
		</Menu>
	);
}
