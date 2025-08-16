import BCTanStackGrid from "@/shared/components/baseComponents/BCTanStackGrid";
import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import ICAdvancedFilterGridColumn from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridColumn";
import ICAdvancedFilterGridRow from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridRow";
import ICAdvancedFilterGridRowCellMenu, {
	type ICAdvancedFilterGridRowCellMenuProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridRow/ICAdvancedFilterGridRowCellMenu";
import {
	GET_ADVANCED_FILTER_DATA,
	IC_ADVANCED_FILTER_BLANK_TEXT,
	IC_ADVANCED_FILTER_DEFAULT_OPERATORS,
	ROW_NUMBER_COLUMN,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.constants";
import type {
	ICAdvancedFilterCondition,
	ICAdvancedFilterListColumn,
	ICAdvancedFilterProps,
	ICAdvancedFilterRq,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { unsecuredCopyToClipboard } from "@/shared/lib/utils";
import { Box, Button, Flex, Pill, ScrollArea } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Row } from "@tanstack/react-table";
import { uniqBy } from "lodash";
import Link from "next/link";
import { type ReactNode, useCallback, useDeferredValue, useEffect, useMemo } from "react";
import { v4 } from "uuid";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

type Props<T> = Pick<
	ICAdvancedFilterProps<T>,
	| "minColumnSize"
	| "store"
	| "columns"
	| "allColumns"
	| "run"
	| "idAccessor"
	| "recordsPerPageOptions"
	| "isLoading"
	| "defaultColumnSize"
	| "excludeColumns"
	| "onGroupByExpand"
	| "hideCellMenu"
	| "hideColumnMenu"
	| "hideExpandGroupByButton"
	| "tableMinusHeight"
	| "onChangeTotalRecords"
	| "getDataApi"
	| "dataQueryKey"
> & {
	conditionItemsSectionHeight: number;
};

export default function ICAdvancedFilterGrid<T extends Record<string, unknown>>(props: Props<T>) {
	const queryClient = useQueryClient();
	const { height } = useViewportSize();

	const store = useStore(
		props.store,
		useShallow((state) => ({
			variables: state.variables,
			setPage: state.setPage,
			setLimit: state.setLimit,
			includeCondition: state.includeCondition,
			excludeCondition: state.excludeCondition,
			getIsGroupByFunctionColumn: state.getIsGroupByFunctionColumn,
			getExistAnyGroupByColumn: state.getExistAnyGroupByColumn,
			openedFullScreenModal: state.openedFullScreenModal,
			setOpenFullScreenModal: state.setOpenFullScreenModal,
			runToken: state.runToken,
		})),
	);

	const getDataQueryKey = [GET_ADVANCED_FILTER_DATA, ...props.dataQueryKey];

	const state = queryClient.getQueryState(getDataQueryKey);

	const hasEverFetched =
		(state?.dataUpdatedAt || 0) > 0 || state?.status === "success" || state?.status === "error";

	const useGetDataQuery = useQuery({
		queryKey: [...getDataQueryKey, store.variables.columns, store.runToken],
		queryFn: ({ signal }) => props.getDataApi?.(store.variables, signal),
		enabled: !!store.variables.columns.length && !hasEverFetched && !props.isLoading,
	});

	const data = useGetDataQuery.data?.data.results || [];
	const totalRecords = useGetDataQuery.data?.data.total || 0;
	const total = useGetDataQuery.data?.data?.metadata?.total;
	const isLoading = useGetDataQuery.isFetching || props.isLoading;

	const conditionItemsHeight =
		store.variables.conditions.length || store.variables.groupBy ? props.conditionItemsSectionHeight + 10 : 0;
	const fixedTopSectionHeight = 110;

	const tableHeight = height - fixedTopSectionHeight - props.tableMinusHeight - conditionItemsHeight;

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

	const cellMenu = useCallback(
		(params: ICAdvancedFilterGridRowCellMenuProps<T>) => {
			return !props.hideCellMenu ? <ICAdvancedFilterGridRowCellMenu {...params} /> : undefined;
		},
		[props.hideCellMenu],
	);

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
						pl={0}
						variant={"transparent"}
						{...(!props.hideExpandGroupByButton && {
							onClick: () => {
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
									limit: 50,
									columns: uniqBy(
										[...store.variables.columns, ...props.allColumns.filter((item) => item.isDefault)],
										(item) => item.name,
									),
									conditions: newConditions,
								};

								if (store.openedFullScreenModal) {
									store.setOpenFullScreenModal(false);
								}
								props.onGroupByExpand?.(newVariables, getColumnOption);
							},
						})}
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

			const columnOption = getColumnOption(columnName);

			if (columnOption?.type === "List") {
				const maxDisplay = 5;
				const arrayValue = record[columnName] as ICAdvancedFilterListColumn[];
				return (
					<ScrollArea h={"100%"} scrollbarSize={1} scrollbars={"x"}>
						<Flex h={32} gap={"xs"} align={"center"}>
							{arrayValue.slice(0, maxDisplay).map((item) => (
								<Pill
									{...(item.url && { component: Link, href: item.url, target: "blank" })}
									bg={"gray.2"}
									size={"xs"}
									key={item.value}
								>
									{item.value}
								</Pill>
							))}
							{arrayValue.length > maxDisplay && <Pill>+{arrayValue.length - maxDisplay} more</Pill>}
						</Flex>
					</ScrollArea>
				);
			}
			return record[columnName] as ReactNode;
		},
		[
			store.getIsGroupByFunctionColumn,
			store.openedFullScreenModal,
			store.setOpenFullScreenModal,
			getColumnOption,
			props.hideExpandGroupByButton,
		],
	);

	const firstDataObject = useMemo(() => {
		return data?.[0];
	}, [data?.[0]]);

	const modifiedColumns: TanStackDataTableColumnColDef<T>[] = useMemo(() => {
		return props.columns
			.filter((column) => !props.excludeColumns?.includes(column.accessor))
			.map((column) => ({
				...column,
				minSize: props.minColumnSize,
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
						hideColumnMenu={props.hideColumnMenu}
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
		firstDataObject,
		cellRenderValue,
	]);

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
							hideColumnMenu={props.hideColumnMenu}
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
		store.getIsGroupByFunctionColumn,
		cellMenu,
		excludeCondition,
		includeCondition,
		onCopyValue,
		getColumnOption,
		modifiedColumns,
		cellRenderValue,
	]);

	const differedColumns = useDeferredValue(defaultColumns);
	const differedRecords = useDeferredValue(data);

	useEffect(() => {
		if (total) {
			props.onChangeTotalRecords?.(total);
		}
	}, [total]);

	return (
		<BCTanStackGrid<T>
			h={tableHeight}
			withTableBorder
			defaultColumnWidth={props.defaultColumnSize}
			withColumnBorders
			fetching={isLoading}
			withRowBorders
			rowHeight={32}
			idAccessor={props.idAccessor}
			columns={differedColumns}
			records={differedRecords as T[]}
			totalRecords={totalRecords}
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
			recordsPerPageOptions={props.recordsPerPageOptions || [50, 100, 200]}
		/>
	);
}
