import ICAdvancedFilterGridColumnMenuSearchValues from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridColumn/ICAdvancedFilterGridColumnMenu/ICAdvancedFilterGridColumnMenuSearchValues";
import { ICAdvancedGroupByFunctions } from "@/shared/components/infraComponents/ICAdvancedFilter/index.enum";
import type {
	ICAdvancedFilterProps,
	ICAdvancedFilterStoreType,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { ActionIcon, Box, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCopy, IconDotsVertical, IconEyeOff, IconPuzzle, IconSearch } from "@tabler/icons-react";
import { type StoreApi, useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

type Props<T> = {
	columnName: string;
	columnLabel: string;
	store: StoreApi<ICAdvancedFilterStoreType>;
	allColumns: ICAdvancedFilterProps<T>["allColumns"];
	run: ICAdvancedFilterProps<T>["run"];
	visibleParent: boolean;
	onCopy: VoidFunction;
};

export default function ICAdvancedFilterGridColumnMenu<T>(props: Props<T>) {
	const [opened, handlers] = useDisclosure(false);
	const [openedSearchValuesMenu, searchValuesMenuHandlers] = useDisclosure(false);

	const store = useStore(
		props.store,
		useShallow((state) => ({
			column: state.variables.columns.find((column) => column.name === props.columnName),
			updateOrder: state.updateOrder,
			getIsGroupByFunctionColumn: state.getIsGroupByFunctionColumn,
			hideColumn: state.hideColumn,
			setGroupBy: state.setGroupBy,
			setColumns: state.setColumns,
		})),
	);

	return (
		<Menu
			width={openedSearchValuesMenu ? 240 : 200}
			radius="md"
			shadow="md"
			opened={opened}
			position="bottom-end"
			closeOnClickOutside={!openedSearchValuesMenu}
			closeOnItemClick={false}
			onClose={handlers.close}
		>
			<Menu.Target>
				{props.visibleParent || opened ? (
					<ActionIcon color={"black"} variant={"transparent"} onClick={handlers.open}>
						<IconDotsVertical size={16} />
					</ActionIcon>
				) : (
					<Box h={16} w={16} />
				)}
			</Menu.Target>
			{opened && (
				<Menu.Dropdown p={0}>
					<Box darkHidden={!openedSearchValuesMenu} lightHidden={!openedSearchValuesMenu}>
						{openedSearchValuesMenu && (
							<ICAdvancedFilterGridColumnMenuSearchValues
								columnName={props.columnName}
								allColumns={props.allColumns}
								store={props.store}
								onClose={() => {
									searchValuesMenuHandlers.close();
									handlers.close();
								}}
								opened={openedSearchValuesMenu}
								run={props.run}
							/>
						)}
					</Box>
					<Box darkHidden={openedSearchValuesMenu} lightHidden={openedSearchValuesMenu}>
						<Menu.Item
							disabled={store.getIsGroupByFunctionColumn(props.columnName)}
							leftSection={<IconEyeOff size={12} />}
							onClick={() => {
								store.hideColumn(props.columnName);
								props.run();
							}}
						>
							Hide Column
						</Menu.Item>
						<Menu.Item
							leftSection={<IconPuzzle size={12} />}
							onClick={() => {
								store.setGroupBy({
									function: ICAdvancedGroupByFunctions.COUNT,
									order: null,
									displayName: props.columnLabel,
									column: "*",
									aggregatedConditions: [],
								});
								store.setColumns([
									{
										name: props.columnName,
										orderBy: null,
									},
								]);
								props.run();
							}}
						>
							Group by this Column
						</Menu.Item>
						<Menu.Item
							leftSection={<IconSearch size={12} />}
							onClick={(event) => {
								event.preventDefault();
								event.stopPropagation();
								searchValuesMenuHandlers.open();
							}}
						>
							Search Values...
						</Menu.Item>
						<Menu.Item
							leftSection={<IconCopy size={12} />}
							onClick={() => {
								props.onCopy();
								handlers.close();
							}}
						>
							Copy Column Title
						</Menu.Item>
					</Box>
				</Menu.Dropdown>
			)}
		</Menu>
	);
}
