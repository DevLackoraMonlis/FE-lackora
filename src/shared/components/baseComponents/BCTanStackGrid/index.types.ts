import type React from "react";
import type { CSSProperties, ReactNode, RefObject } from "react";

import type { MantineSize } from "@mantine/core";
import type {
	Column,
	ColumnDef,
	ColumnDefTemplate,
	ColumnMeta,
	HeaderContext,
	Row,
	RowSelectionState,
} from "@tanstack/react-table";

export type TanStackColumnDef<T> = Omit<ColumnDef<T>, "header">;

export type DataTableColumnTextAlign = "left" | "center" | "right";

export type TanStackColumnHeader<T> =
	| ColumnDefTemplate<HeaderContext<T, unknown>>
	| undefined;

export type TanStackGridProps<T> = {
	records: T[];
	columns: TanStackDataTableColumnColDef<T>[];
	h?: number | string;
	w?: number | string;
	withColumnBorders?: boolean;
	withRowBorders?: boolean;
	withTableBorder?: boolean;
	idAccessor: string;
	rowHeight?: number;
	fetching?: boolean;
	pinLastColumn?: boolean;
	rowExpansion?: BRTanStackRowExpansion<T>;
	selectedRecords?: T[];
	tableClassName?: string;
	disableVirtualize?: boolean;
	tableContainerClassName?: string;
	tableRootClassName?: string;
	onRowClick?: (params: { record: T; index: number }) => void;
	onRowDoubleClick?: (params: { record: T; index: number }) => void;
	onSelectedRecordsChange?: (selectedRecords: T[] | undefined) => void;
	paginationSize?: number | MantineSize | string;
	/*
		const inputRef = useRef<TanStackDataTableRef>(null);
	 */
	ref?: RefObject<TanStackDataTableRef | null>;
} & TanStackGridPagination;

export type TanStackDataTableRef = {
	clear: VoidFunction;
	getRowSelection: () => RowSelectionState;
};

export type DataTableColumnTitleFn<T> = (
	values: Column<T, unknown>,
) => ReactNode;

export type TanStackColumnMeta<T> = ColumnMeta<T, unknown> & {
	cellsStyle?: () => CSSProperties;
	titleStyle?: () => CSSProperties;
	wrap?: boolean;
};

export type TanStackDataTableColumnColDef<T> = {
	accessor: string;
	wrap?: boolean;
	textAlign?: DataTableColumnTextAlign;
	width?: number;
	cellsStyle?: () => CSSProperties;
	titleStyle?: () => CSSProperties;
	title?: DataTableColumnTitleFn<T> | ReactNode | Element;
	render?: (record: T, row: Row<T>, rowIndex: number) => ReactNode;
	hidden?: boolean;
} & TanStackColumnDef<T>;

export type BRTanStackRowExpansion<T> = {
	expandable?: (params: { record: T; index: number }) => boolean;
	content: (params: { record: T; index: number }) => React.ReactNode;
};

export type TanStackGridPagination = {
	totalRecords?: number;
	page?: number;
	recordsPerPage?: number;
	onPageChange?: (pageNumber: number) => void;
	onRecordsPerPageChange?: (pageSize: number) => void;
	recordsPerPageOptions?: number[];
};
