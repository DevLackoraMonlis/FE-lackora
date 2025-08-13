import BCModal from "@/shared/components/baseComponents/BCModal";
import BCSortable from "@/shared/components/baseComponents/BCSortable";
import BCTanStackGrid from "@/shared/components/baseComponents/BCTanStackGrid";
import type {
	TanStackDataTableColumnColDef,
	TanStackDataTableRef,
} from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import ICAdvancedFilterColumnSortableItem from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterColumnModal/ColumnSortableItem";
import type {
	ICAdvancedFilterColumnModalProps,
	ICAdvancedFilterColumnRs,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { ActionIcon, Box, Button, Flex, ScrollArea, Text, TextInput } from "@mantine/core";
import { IconArrowsSort, IconSearch, IconX } from "@tabler/icons-react";
import { orderBy } from "lodash";
import { type RefObject, useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

export default function ICAdvancedFilterColumnModal<T>(props: ICAdvancedFilterColumnModalProps<T>) {
	const tableRef = useRef<TanStackDataTableRef<T>>(null);
	const store = useStore(
		props.store,
		useShallow((state) => ({
			variables: state.variables,
			setConditions: state.setConditions,
			setColumns: state.setColumns,
			setOpenColumnModal: state.setOpenColumnModal,
			openedColumnModal: state.openedColumnModal,
		})),
	);

	const defaultColumns = useMemo(() => props.allColumns.filter((item) => item.isDefault), [props.allColumns]);
	const lastSelectedColumns = useMemo(
		() => store.variables.columns.map((item) => item.name),
		[store.variables.columns],
	);

	const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
	const [selectedRecords, setSelectedRecords] = useState<ICAdvancedFilterColumnRs[] | undefined>([]);
	const [search, setSearch] = useState<string>("");
	const [sort, setSort] = useState<"asc" | "desc">("asc");

	const handleClose = () => {
		setSelectedColumns([]);
		store.setOpenColumnModal(false);
	};

	const onSave = () => {
		store.setColumns(selectedColumns.map((item) => ({ name: item })));
		handleClose();
	};

	const filteredRecords = search
		? props.allColumns?.filter((item) => item.displayName.toLowerCase().includes(search.toLowerCase()))
		: props.allColumns;

	const sortedRecords = orderBy(filteredRecords, (item) => item.name, sort);

	const handleDeselectAll = () => {
		setSelectedColumns([]);
		setSelectedRecords([]);
		tableRef.current?.updateSelectedRows([] as T[]);
	};

	const handleRemoveFromNewColumns = (name: string) => {
		setSelectedColumns((prevState) => prevState.filter((item) => item !== name));
		setSelectedRecords((prevState) => {
			const updatedRecords = prevState?.filter((item) => item.name !== name) || [];
			tableRef.current?.updateSelectedRows(updatedRecords as T[]);
			return updatedRecords;
		});
	};

	const columns: TanStackDataTableColumnColDef<ICAdvancedFilterColumnRs>[] = [
		{
			accessor: "displayName",
			width: 230,
			title: (
				<Flex justify="space-between" align="center">
					<Text fw={"bold"}>Column Name</Text>
					<ActionIcon
						onClick={() => {
							setSort((prevState) => (prevState === "asc" ? "desc" : "asc"));
						}}
						variant={"transparent"}
					>
						<IconArrowsSort size={16} />
					</ActionIcon>
				</Flex>
			),
			render: (record) => <Text fz={"xs"}>{record.displayName}</Text>,
		},
	];

	useEffect(() => {
		if (lastSelectedColumns && store.openedColumnModal) {
			setSelectedColumns(lastSelectedColumns);
			setSelectedRecords(props.allColumns.filter((item) => lastSelectedColumns.includes(item.name)));
		}
	}, [lastSelectedColumns, store.openedColumnModal]);

	return (
		<BCModal
			centered
			size={600}
			title="Customize Table Columns"
			withCloseButton
			keepMounted={false}
			closeOnClickOutside
			closeOnEscape
			opened={store.openedColumnModal}
			onClose={handleClose}
		>
			<Flex p="sm" gap="sm" h={600}>
				<Flex align="flex-start" gap={"xs"} w="100%" direction="column">
					<Box w="100%">
						<TextInput
							leftSection={<IconSearch size={16} />}
							onChange={(e) => setSearch(e.target.value)}
							placeholder={"Search by column name"}
						/>
					</Box>
					<Box h={540} w="100%">
						<BCTanStackGrid
							ref={tableRef as RefObject<TanStackDataTableRef<ICAdvancedFilterColumnRs> | null>}
							h={480}
							rowHeight={24}
							selectedRecords={selectedRecords}
							onSelectedRecordsChange={(selectedRecords) => {
								setSelectedRecords(selectedRecords);
								setSelectedColumns(selectedRecords?.map((item) => item.name) || []);
							}}
							withTableBorder
							withColumnBorders
							withRowBorders
							withPaddingCells
							disableVirtualize
							idAccessor="name"
							columns={columns}
							records={sortedRecords}
						/>
					</Box>
				</Flex>
				<Flex mah={530} w="100%" bg={"gray.1"} justify={"center"} direction="column" p="xs">
					<Text fz={"xs"}>Selected columns will appear in the table.</Text>
					<Text fz={"xs"} c={"gray.5"}>
						Drag and drop columns to arrange
					</Text>
					<Flex justify="space-between" align="center" mt={"xs"} p={"2xs"}>
						<Text fz="xs" fw="bold">
							{`Selected columns (${selectedColumns.length})`}
						</Text>
						<Button
							p={0}
							onClick={handleDeselectAll}
							size="xs"
							leftSection={<IconX size={16} />}
							variant="transparent"
						>
							Deselect all
						</Button>
					</Flex>
					<ScrollArea h={500} scrollbars={"y"} scrollbarSize={3}>
						<BCSortable
							handleItemChange={(_e, newItems) => {
								setSelectedColumns(newItems.map((item) => item.id));
							}}
							items={
								selectedColumns.map((item) => ({
									id: item,
								})) || []
							}
						>
							<Flex direction="column" gap="xs" bg={"gray.1"} w={"100%"} p={"2xs"}>
								{selectedColumns.map((item) => (
									<ICAdvancedFilterColumnSortableItem
										onRemove={() => handleRemoveFromNewColumns(item)}
										key={item}
										id={item}
									/>
								))}
							</Flex>
						</BCSortable>
					</ScrollArea>
				</Flex>
			</Flex>
			<BCModal.EmptyFooter>
				<Flex h={"100%"} bg={"white"} align={"center"} gap="sm" justify="space-between" px={"sm"}>
					<Button
						onClick={() => {
							setSelectedColumns(defaultColumns.map((item) => item.name));
							setSelectedRecords(defaultColumns);
							tableRef.current?.updateSelectedRows(defaultColumns as T[]);
						}}
						size={"xs"}
						variant={"transparent"}
					>
						Restored default columns
					</Button>
					<Flex gap={"xs"}>
						<Button disabled={!selectedColumns.length} size="xs" onClick={onSave}>
							Save
						</Button>
						<Button size="xs" onClick={handleClose} variant="default">
							Cancel
						</Button>
					</Flex>
				</Flex>
			</BCModal.EmptyFooter>
		</BCModal>
	);
}
