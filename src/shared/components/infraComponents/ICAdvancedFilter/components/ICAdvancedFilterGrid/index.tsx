import BCTanStackGrid from "@/shared/components/baseComponents/BCTanStackGrid";
import type { TanStackDataTableColumnColDef } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import ICAdvancedFilterGridColumn from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridColumn";
import ICAdvancedFilterGridRow from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridRow";
import ICAdvancedFilterGridRowCellMenu, {
	type ICAdvancedFilterGridRowCellMenuProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterGrid/ICAdvancedFilterGridRow/ICAdvancedFilterGridRowCellMenu";
import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { unsecuredCopyToClipboard } from "@/shared/lib/utils";
import { Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { type ReactNode, useDeferredValue } from "react";
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

	const onCopyValue = (value: unknown) => {
		unsecuredCopyToClipboard((value || "") as string);
		notifications.show({
			message: "Value copied to clipboard",
			withBorder: true,
		});
	};

	const getColumnOption = (columnName: string) => {
		return props.allColumns.find((column) => column.name === columnName);
	};

	const cellMenu = (params: ICAdvancedFilterGridRowCellMenuProps<T>) => {
		return <ICAdvancedFilterGridRowCellMenu {...params} />;
	};

	const includeCondition = (columnName: string, value: unknown) => {
		return store.includeCondition(columnName, value, props.allColumns);
	};

	const excludeCondition = (columnName: string, value: unknown) => {
		return store.excludeCondition(columnName, value, props.allColumns);
	};

	const modifiedColumns: TanStackDataTableColumnColDef<T>[] = props.columns
		.filter((column) => !props.excludeColumns?.includes(column.accessor))
		.map((column) => ({
			...column,
			minSize: props.minColumnSize,
			width: props.defaultColumnSize,
			render: (record, row, rowIndex) => {
				return (
					<ICAdvancedFilterGridRow
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
				);
			},
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

	const defaultColumns: TanStackDataTableColumnColDef<T>[] = props.data?.[0]
		? Object.keys(props.data?.[0])
				.filter((key) => !props.excludeColumns?.includes(key))
				.map((key) => {
					const findColumnInModified = modifiedColumns.find((item) => item.accessor === key);
					if (findColumnInModified) {
						return findColumnInModified;
					}
					return {
						accessor: key,
						minSize: props.minColumnSize,
						width: props.defaultColumnSize,
						render: (record) => (
							<ICAdvancedFilterGridRow
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
				})
		: [];

	const rowNumberColumn: TanStackDataTableColumnColDef<T> = {
		accessor: "row-number",
		title: (
			<Flex w="100%" align={"center"} justify={"center"}>
				#
			</Flex>
		),
		render: (_record, _row, rowIndex) => (
			<Flex w="100%" align={"center"} justify={"center"}>
				{rowIndex}
			</Flex>
		),
		width: 50,
	};

	defaultColumns.unshift(rowNumberColumn);

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
