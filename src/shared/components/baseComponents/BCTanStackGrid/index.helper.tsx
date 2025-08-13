import { Button, Checkbox, type MantineSize } from "@mantine/core";
import { IconCircleChevronDown, IconCircleChevronRight } from "@tabler/icons-react";
import {
	type Column,
	type ColumnDef,
	type ExpandedState,
	type HeaderContext,
	type OnChangeFn,
	type RowSelectionState,
	type TableOptions,
	getCoreRowModel,
	getExpandedRowModel,
} from "@tanstack/react-table";
import type React from "react";
import type { CSSProperties } from "react";
import { TAN_STACK_DEFAULT_COLUMN_SIZE } from "./index.constants";
import type {
	DataTableColumnTitleFn,
	TanStackColumnHeader,
	TanStackDataTableColumnColDef,
	TanStackGridProps,
} from "./index.types";

type Props<T> = TanStackGridProps<T> & {
	paginationSize?: MantineSize | string | number;
};

export function tanStackGetCommonPinningStyles<T>(column: Column<T>): CSSProperties {
	const isPinned = column.getIsPinned();
	const isLastLeftPinnedColumn = isPinned === "left" && column.getIsLastColumn("left");
	const isFirstRightPinnedColumn = isPinned === "right" && column.getIsFirstColumn("right");

	return {
		boxShadow: isLastLeftPinnedColumn
			? "-4px 0 4px -4px gray inset"
			: isFirstRightPinnedColumn
				? "4px 0 4px -4px gray inset"
				: undefined,
		left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
		right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
		opacity: isPinned ? 0.95 : 1,
		position: isPinned ? "sticky" : "relative",
		width: column.getSize(),
		zIndex: isPinned ? 1 : 0,
	};
}

export function tanStackGetExtendedWidth<T>(params: {
	viewportWidth: number;
	totalDefaultWidth: number;
	columns: TanStackDataTableColumnColDef<T>[];
	index: number;
	recordCount: number;
	pinLastColumn?: boolean;
	hasRowExpansion?: boolean;
	hasRowSelection?: boolean;
	hasHorizontalScroll?: boolean;
	hasVerticalScroll?: boolean;
}) {
	if (params.viewportWidth > params.totalDefaultWidth) {
		let remainWidth = params.viewportWidth - params.totalDefaultWidth - (params.hasVerticalScroll ? 14 : 1);

		if (params.hasRowExpansion) {
			remainWidth -= 50;
		}

		if (params.hasRowSelection) {
			remainWidth -= 50;
		}

		let emptyWidthColumCount = params.columns.filter((item) => !item.width).length;

		if (!emptyWidthColumCount) {
			emptyWidthColumCount = params.columns.length;
		}

		if (params.pinLastColumn) {
			emptyWidthColumCount -= 1;
		}

		return {
			extendedWidth: Math.floor(remainWidth / emptyWidthColumCount),
			getExtend:
				!(params.pinLastColumn && params.index === params.columns.length - 1) &&
				!params.columns[params.index].width,
		};
	}
}

export function tanStackGenerateColumns<T>(
	params: {
		viewportWidth: number;
		recordCount: number;
		hasHorizontalScroll: boolean;
		hasVerticalScroll: boolean;
	} & Pick<
		Props<T>,
		| "columns"
		| "pinLastColumn"
		| "recordsPerPage"
		| "page"
		| "rowExpansion"
		| "onSelectedRecordsChange"
		| "defaultColumnWidth"
	>,
): ColumnDef<T>[] {
	const { viewportWidth, defaultColumnWidth } = params;

	const defaultWidth = defaultColumnWidth || TAN_STACK_DEFAULT_COLUMN_SIZE;

	const filteredColumns = params.columns.filter((item) => !item.hidden);

	const totalDefaultWidth = filteredColumns.reduce((sum, column) => sum + (column.width || defaultWidth), 0);

	const defaultColumns = filteredColumns.map(({ hidden: _hidden, wrap, accessor, ...column }, index) => {
		const columnTitle =
			typeof column.title === "function" ? (column.title as DataTableColumnTitleFn<T>) : undefined;
		const header = columnTitle
			? (info: HeaderContext<T, unknown>) => columnTitle?.(info.column)
			: column.title;

		const extend = tanStackGetExtendedWidth<T>({
			viewportWidth,
			totalDefaultWidth,
			columns: filteredColumns,
			index,
			recordCount: params.recordCount,
			pinLastColumn: params.pinLastColumn,
			hasRowExpansion: !!params.rowExpansion,
			hasRowSelection: !!params.onSelectedRecordsChange,
			hasHorizontalScroll: params.hasHorizontalScroll,
			hasVerticalScroll: params.hasVerticalScroll,
		});

		const fixedTitle = column.title
			? (header as TanStackColumnHeader<T>)
			: column.title === ""
				? ""
				: accessor;

		const mappedColumn: ColumnDef<T> = {
			...column,
			accessorKey: accessor,
			size: (column.width || defaultWidth) + (extend?.getExtend ? extend.extendedWidth || 0 : 0),
			id: accessor,
			enablePinning: index === filteredColumns.length - 1 && params.pinLastColumn,
			meta: {
				wrap,
			},
			header: fixedTitle,
		};

		if (column.render) {
			mappedColumn.cell = (info) => {
				const rowIndex = info.row.index + 1 + ((params.page || 1) - 1) * (params.recordsPerPage || 0);
				return column.render?.(info.row.original, info.row, rowIndex);
			};
		}

		return mappedColumn;
	});

	// 2. Add an "expander" column:
	const expansionColumn: ColumnDef<T> = {
		id: "expander",
		accessorKey: "expander",
		header: "", // or "Expand"
		size: 20,
		enablePinning: false,
		enableResizing: false,
		cell: ({ row }) => {
			return (
				<Button
					disabled={!row.getCanExpand()}
					size="xs"
					p={0}
					variant="transparent"
					onClick={row.getToggleExpandedHandler()}
				>
					{!row.getIsExpanded() ? <IconCircleChevronDown /> : <IconCircleChevronRight />}
				</Button>
			);
		},
		meta: {
			cellsStyle: undefined,
			titleStyle: undefined,
			wrap: false,
		},
	};

	if (params.rowExpansion?.expandable) {
		defaultColumns.unshift(expansionColumn);
	}

	if (params.onSelectedRecordsChange) {
		const selectionColumn: ColumnDef<T> = {
			accessorKey: "selection-column",
			size: 20,
			id: "selection-column",
			header: ({ table }) => (
				<Checkbox
					size={"xs"}
					checked={table.getIsAllRowsSelected()}
					indeterminate={table.getIsSomeRowsSelected()}
					onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					size={"xs"}
					checked={row.getIsSelected()}
					disabled={!row.getCanSelect()}
					onChange={row.getToggleSelectedHandler()}
				/>
			),
			meta: {
				cellsStyle: undefined,
				titleStyle: undefined,
				wrap: false,
			},
		};
		defaultColumns.unshift(selectionColumn);
	}

	return defaultColumns;
}

export function getTanStackTableOptions<T extends Record<string, unknown>>(
	params: {
		offsetWidth?: number;
		columns: ColumnDef<T>[];
		setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
		rowSelection: RowSelectionState;
		expanded: ExpandedState;
		setExpanded: OnChangeFn<ExpandedState>;
	} & Pick<
		TanStackGridProps<T>,
		"records" | "onSelectedRecordsChange" | "rowExpansion" | "page" | "idAccessor" | "pinLastColumn"
	>,
): TableOptions<T> {
	const getColumnCount = () => {
		return params.columns.length - (params.pinLastColumn ? 1 : 0);
	};

	const options: TableOptions<T> = {
		data: params.records,
		columns:
			getColumnCount() > 0
				? params.columns
				: [
						{
							accessorKey: "empty-column",
							id: "empty-column",
							header: "",
							size: params.offsetWidth ? params.offsetWidth - 118 : 800,
						},
					],
		columnResizeMode: "onChange",
		defaultColumn: {
			minSize: 50,
		},
		enableMultiRowSelection: !!params.onSelectedRecordsChange,
		onRowSelectionChange: params.setRowSelection,
		paginateExpandedRows: false,
		enableExpanding: !!params.rowExpansion,
		getRowCanExpand: (row) =>
			!!params.rowExpansion?.expandable?.({
				record: row.original,
				index: row.index,
			}),
		onExpandedChange: params.setExpanded,
		columnResizeDirection: "ltr",
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		manualPagination: !!params.page,
		state: {
			rowSelection: params.rowSelection,
			expanded: params.expanded,
		},

		getRowId: (row) => {
			return `${row[params.idAccessor as keyof T]}`;
		},
	};

	return options;
}
