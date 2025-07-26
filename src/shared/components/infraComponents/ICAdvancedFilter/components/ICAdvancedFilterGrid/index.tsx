import BCTanStackGrid from "@/shared/components/baseComponents/BCTanStackGrid";
import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import ICAdvancedFilterGridColumn from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridColumn";
import ICAdvancedFilterGridRow from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridRow";
import ICAdvancedFilterGridRowCellMenu, {
	type ICAdvancedFilterGridRowCellMenuProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridRow/ICAdvancedFilterGridRowCellMenu";
import { ROW_NUMBER_COLUMN } from "@/shared/components/infraComponents/ICAdvancedFilter/index.constants";
import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { unsecuredCopyToClipboard } from "@/shared/lib/utils";
import { notifications } from "@mantine/notifications";
import { type ReactNode, useCallback, useDeferredValue, useMemo } from "react";
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
	| "height"
	| "recordsPerPageOptions"
	| "isLoading"
	| "defaultColumnSize"
	| "excludeColumns"
>;

export default function ICAdvancedFilterGrid<T extends Record<string, unknown>>(props: Props<T>) {
	const store = useStore(
		props.store,
		useShallow((state) => ({
			page: state.variables.page,
			limit: state.variables.limit,
			setPage: state.setPage,
			setLimit: state.setLimit,
			includeCondition: state.includeCondition,
			excludeCondition: state.excludeCondition,
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

	const modifiedColumns: TanStackDataTableColumnColDef<T>[] = useMemo(() => {
		return props.columns
			.filter((column) => !props.excludeColumns?.includes(column.accessor))
			.map((column) => ({
				...column,
				minSize: props.minColumnSize,
				width: props.defaultColumnSize,
				render: (record, row, rowIndex) => (
					<ICAdvancedFilterGridRow
						isFormattedCell
						cellMenu={(visibleParent) =>
							cellMenu({
								cellValue: record[column.accessor],
								columnName: column.accessor,
								excludeCondition,
								includeCondition,
								onCopy: () => onCopyValue(record[column.accessor]),
								run: props.run,
								visibleParent,
							})
						}
						cellRenderValue={
							column.render ? column.render(record, row, rowIndex) : (record[column.accessor] as ReactNode)
						}
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

	const firstDataObject = props.data?.[0];

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
					render: (record) => (
						<ICAdvancedFilterGridRow
							isFormattedCell={false}
							cellMenu={(visibleParent) =>
								cellMenu({
									cellValue: record[key],
									columnName: key,
									excludeCondition,
									includeCondition,
									onCopy: () => onCopyValue(record[key]),
									run: props.run,
									visibleParent: visibleParent,
								})
							}
							cellRenderValue={record[key] as ReactNode}
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
			h={props.height}
			withTableBorder
			withColumnBorders
			fetching={props.isLoading}
			withRowBorders
			rowHeight={32}
			idAccessor={props.idAccessor}
			columns={differedColumns}
			records={differedRecords}
			totalRecords={props.totalRecords}
			page={store.page}
			recordsPerPage={store.limit}
			onPageChange={(page) => store.setPage(page)}
			onRecordsPerPageChange={(limit) => store.setLimit(limit)}
			recordsPerPageOptions={props.recordsPerPageOptions || [25, 50, 100]}
		/>
	);
}
