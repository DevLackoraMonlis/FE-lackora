import type { ColumnDef, Row, Table } from "@tanstack/react-table";
import type { Virtualizer } from "@tanstack/react-virtual";
import type React from "react";
import { TAN_STACK_EXCLUDE_COLUMNS_FROM_STYLES } from "../index.constants";
import type { TanStackGridProps } from "../index.types";
import { TanStackTBody } from "./TanStackTBody";
import { TanStackTHead } from "./TanStackTHead";

export default function TanStackMainTable<T extends Record<string, unknown>>(
	props: {
		rows: Row<T>[];
		tableRef: React.RefObject<HTMLTableElement | null>;
		tableBodyRef: React.RefObject<HTMLTableSectionElement | null>;
		table: Table<T>;
		columns: ColumnDef<T>[];
		tableContainerRef: React.RefObject<HTMLDivElement | null>;
		rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
		columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
	} & Pick<
		TanStackGridProps<T>,
		| "rowExpansion"
		| "rowHeight"
		| "onRowClick"
		| "onRowDoubleClick"
		| "tableClassName"
		| "idAccessor"
		| "onSelectedRecordsChange"
	>,
) {
	return (
		<table
			ref={props.tableRef}
			className={props.tableClassName}
			style={{
				display: "grid",
				width: !props.columns.filter(
					(item) =>
						!TAN_STACK_EXCLUDE_COLUMNS_FROM_STYLES.includes(item.id as string),
				).length
					? "100%"
					: props.table.getCenterTotalSize(),
			}}
		>
			<TanStackTHead<T>
				table={props.table}
				columnVirtualizer={props.columnVirtualizer}
			/>
			<TanStackTBody<T>
				rows={props.rows}
				tableBodyRef={props.tableBodyRef}
				columnVirtualizer={props.columnVirtualizer}
				rowVirtualizer={props.rowVirtualizer}
				table={props.table}
				tableContainerRef={props.tableContainerRef}
				rowExpansion={props.rowExpansion}
				rowHeight={props.rowHeight}
				onSelectedRecordsChange={props.onSelectedRecordsChange}
				onRowClick={props.onRowClick}
				onRowDoubleClick={props.onRowDoubleClick}
				idAccessor={props.idAccessor}
			/>
		</table>
	);
}
