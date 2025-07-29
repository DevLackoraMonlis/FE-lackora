import BCTanStackGrid from "@/shared/components/baseComponents/BCTanStackGrid";
import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import ICAdvancedFilterGridColumn from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridColumn";
import ICAdvancedFilterGridRow from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridRow";
import ICAdvancedFilterGridRowCellMenu, {
	type ICAdvancedFilterGridRowCellMenuProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridRow/ICAdvancedFilterGridRowCellMenu";
import {
	IC_ADVANCED_FILTER_BLANK_TEXT,
	IC_ADVANCED_FILTER_DEFAULT_OPERATORS,
	ROW_NUMBER_COLUMN,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.constants";
import type {
	ICAdvancedFilterCondition,
	ICAdvancedFilterProps,
	ICAdvancedFilterRq,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { unsecuredCopyToClipboard } from "@/shared/lib/utils";
import { Box, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import type { Row } from "@tanstack/react-table";
import { uniqBy } from "lodash";
import { type ReactNode, useCallback, useDeferredValue, useMemo } from "react";
import { v4 } from "uuid";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

type Props<T> = Pick<
	ICAdvancedFilterProps<T>,
	| "minColumnSize"
	| "data"
	| "store"
	| "columns"
	| "allColumns"
	| "run"
	| "idAccessor"
	| "totalRecords"
	| "tableHeight"
	| "recordsPerPageOptions"
	| "isLoading"
	| "defaultColumnSize"
	| "excludeColumns"
	| "onGroupByExpand"
>;

export default function ICAdvancedFilterGrid<T extends Record<string, unknown>>(props: Props<T>) {
	const store = useStore(
		props.store,
		useShallow((state) => ({
			variables: state.variables,
			setPage: state.setPage,
			setLimit: state.setLimit,
			includeCondition: state.includeCondition,
			excludeCondition: state.excludeCondition,
			getIsGroupByFunctionColumn: state.getIsGroupByFunctionColumn,
			openedFullScreenModal: state.openedFullScreenModal,
			setOpenFullScreenModal: state.setOpenFullScreenModal,
		})),
	);

	const onCopyValue = useCallback((value: unknown) => {
		unsecuredCopyToClipboard((value || "") as string);
		notifications.show({
			message: "Value copied to clipboard",
			withBorder: true,
		});
	}, []);

	const getColumnOption = useCallback(
		(columnName: string) => {
			return props.allColumns.find((column) => column.name === columnName);
		},
		[props.allColumns],
	);

	const cellMenu = useCallback((params: ICAdvancedFilterGridRowCellMenuProps<T>) => {
		return <ICAdvancedFilterGridRowCellMenu {...params} />;
	}, []);

	const includeCondition = useCallback(
		(columnName: string, value: unknown) => {
			return store.includeCondition(columnName, value, props.allColumns);
		},
		[store.includeCondition, props.allColumns],
	);

	const excludeCondition = useCallback(
		(columnName: string, value: unknown) => {
			return store.excludeCondition(columnName, value, props.allColumns);
		},
		[store.excludeCondition, props.allColumns],
	);

	const cellRenderValue = useCallback(
		(
			record: T,
			row: Row<T>,
			rowIndex: number,
			columnName: string,
			column?: TanStackDataTableColumnColDef<T>,
		) => {
			const isGroupByColumn = store.getIsGroupByFunctionColumn(column?.accessor || columnName);
			if (isGroupByColumn) {
				return (
					<Button
						px={"xs"}
						variant={"transparent"}
						onClick={() => {
							const newConditions: ICAdvancedFilterCondition[] = [];
							Object.entries(row.original).forEach(([key, value]) => {
								const columnOption = getColumnOption(key);
								if (columnOption) {
									const condition: ICAdvancedFilterCondition = {
										columnName: key,
										operator: value
											? IC_ADVANCED_FILTER_DEFAULT_OPERATORS["="]
											: IC_ADVANCED_FILTER_DEFAULT_OPERATORS["Is Null"],
										openBracket: 0,
										nextOperator: "and",
										id: v4(),
										closeBracket: 0,
										values: [
											{
												label: value as string,
												value: value as string,
											},
										],
									};
									newConditions.push(condition);
								}
							});
							const newVariables: ICAdvancedFilterRq = {
								search: {
									columnName: "",
									value: "",
								},
								page: 1,
								limit: 35,
								columns: uniqBy(
									[...store.variables.columns, ...props.allColumns.filter((item) => item.isDefault)],
									(item) => item.name,
								),
								conditions: newConditions,
							};

							if (store.openedFullScreenModal) {
								store.setOpenFullScreenModal(false);
							}
							props.onGroupByExpand(newVariables, getColumnOption);
						}}
					>
						{record[columnName] as string}
					</Button>
				);
			}

			if (column?.render) {
				const rendererCell = column.render(record, row, rowIndex);

				if (!rendererCell) {
					return <Box p={"xs"}>{IC_ADVANCED_FILTER_BLANK_TEXT}</Box>;
				}
				return rendererCell;
			}

			if (!record[columnName]) {
				return <Box p={"xs"}>{IC_ADVANCED_FILTER_BLANK_TEXT}</Box>;
			}
			return record[columnName] as ReactNode;
		},
		[
			store.getIsGroupByFunctionColumn,
			store.openedFullScreenModal,
			store.setOpenFullScreenModal,
			getColumnOption,
		],
	);

	const modifiedColumns: TanStackDataTableColumnColDef<T>[] = useMemo(() => {
		return props.columns
			.filter((column) => !props.excludeColumns?.includes(column.accessor))
			.map((column) => ({
				...column,
				minSize: props.minColumnSize,
				width: props.defaultColumnSize,
				render: (record, row, rowIndex) => (
					<ICAdvancedFilterGridRow
						cellMenu={(visibleParent, onClose) =>
							cellMenu({
								cellValue: record[column.accessor],
								columnName: column.accessor,
								excludeCondition,
								includeCondition,
								onCopy: () => onCopyValue(record[column.accessor]),
								run: props.run,
								visibleParent,
								onClose,
							})
						}
						cellRenderValue={cellRenderValue(record, row, rowIndex, column.accessor, column)}
					/>
				),
				title: (
					<ICAdvancedFilterGridColumn<T>
						onCopy={() => onCopyValue(getColumnOption(column.accessor)?.displayName || column.accessor)}
						columnOption={getColumnOption(column.accessor)}
						key={column.accessor}
						columnName={column.accessor}
						store={props.store}
						allColumns={props.allColumns}
						run={props.run}
						groupBy={store.variables.groupBy}
					/>
				),
			}));
	}, [
		props.columns,
		props.excludeColumns,
		props.minColumnSize,
		props.defaultColumnSize,
		props.run,
		props.store,
		props.allColumns,
		cellMenu,
		excludeCondition,
		includeCondition,
		onCopyValue,
		getColumnOption,
	]);

	const firstDataObject = useMemo(() => {
		return props.data?.[0];
	}, [props.data?.[0]]);

	const defaultColumns: TanStackDataTableColumnColDef<T>[] = useMemo(() => {
		if (!firstDataObject) return [];

		const columns = Object.keys(firstDataObject)
			.filter((key) => !props.excludeColumns?.includes(key))
			.map((key) => {
				const findColumnInModified = modifiedColumns.find((item) => item.accessor === key);
				if (findColumnInModified) return findColumnInModified;

				const column: TanStackDataTableColumnColDef<T> = {
					accessor: key,
					minSize: props.minColumnSize,
					width: props.defaultColumnSize,
					render: (record, row, rowIndex) => (
						<ICAdvancedFilterGridRow
							withPaddingLeft={!!record[key]}
							cellMenu={(visibleParent, onClose) =>
								cellMenu({
									cellValue: record[key],
									columnName: key,
									excludeCondition,
									includeCondition,
									onCopy: () => onCopyValue(record[key]),
									run: props.run,
									visibleParent: visibleParent,
									onClose,
								})
							}
							cellRenderValue={cellRenderValue(record, row, rowIndex, key)}
						/>
					),
					title: (
						<ICAdvancedFilterGridColumn<T>
							onCopy={() => onCopyValue(getColumnOption(key)?.displayName || key)}
							columnOption={getColumnOption(key)}
							key={key}
							columnName={key}
							store={props.store}
							allColumns={props.allColumns}
							run={props.run}
							groupBy={store.variables.groupBy}
						/>
					),
				};

				return column;
			});

		columns.unshift(ROW_NUMBER_COLUMN as TanStackDataTableColumnColDef<T>);
		return columns;
	}, [
		firstDataObject,
		props.excludeColumns,
		props.minColumnSize,
		props.defaultColumnSize,
		props.run,
		props.store,
		props.allColumns,
		cellMenu,
		excludeCondition,
		includeCondition,
		onCopyValue,
		getColumnOption,
		modifiedColumns,
	]);

	const differedColumns = useDeferredValue(defaultColumns);
	const differedRecords = useDeferredValue(props.data);

	return (
		<BCTanStackGrid<T>
			h={props.tableHeight}
			withTableBorder
			withColumnBorders
			fetching={props.isLoading}
			withRowBorders
			rowHeight={32}
			idAccessor={props.idAccessor}
			columns={differedColumns}
			records={differedRecords}
			totalRecords={props.totalRecords}
			page={store.variables.page}
			recordsPerPage={store.variables.limit}
			onPageChange={(page) => {
				store.setPage(page);
				props.run(true);
			}}
			onRecordsPerPageChange={(limit) => {
				store.setLimit(limit);
				props.run();
			}}
			recordsPerPageOptions={props.recordsPerPageOptions || [35, 100, 200]}
		/>
	);
}
