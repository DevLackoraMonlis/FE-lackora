import type { ColumnDef, Row, Table } from "@tanstack/react-table";
import type React from "react";
import { TAN_STACK_EXCLUDE_COLUMNS_FROM_STYLES } from "../index.constants";
import type { TanStackGridProps } from "../index.types";
import { TanStackTBodyNonVirtual } from "./TanStackTBodyNonVirtual";
import { TanStackTHeadNonVirtual } from "./TanStackTHeadNonVirtual";

export default function TanStackMainTableNonVirtual<T extends Record<string, unknown>>(
	props: {
		rows: Row<T>[];
		tableRef: React.RefObject<HTMLTableElement | null>;
		tableBodyRef: React.RefObject<HTMLTableSectionElement | null>;
		table: Table<T>;
		columns: ColumnDef<T>[];
		tableContainerRef: React.RefObject<HTMLDivElement | null>;
	} & Pick<
		TanStackGridProps<T>,
		| "rowExpansion"
		| "rowHeight"
		| "onRowClick"
		| "onRowDoubleClick"
		| "tableClassName"
		| "idAccessor"
		| "onSelectedRecordsChange"
		| "withPaddingCells"
	>,
) {
	return (
		<table
			ref={props.tableRef}
			className={props.tableClassName}
			style={{
				display: "grid",
				width: !props.columns.filter(
					(item) => !TAN_STACK_EXCLUDE_COLUMNS_FROM_STYLES.includes(item.id as string),
				).length
					? "100%"
					: props.table.getCenterTotalSize(),
			}}
		>
			<TanStackTHeadNonVirtual<T> withPaddingCells={props.withPaddingCells} table={props.table} />
			<TanStackTBodyNonVirtual<T>
				withPaddingCells={props.withPaddingCells}
				rows={props.rows}
				tableBodyRef={props.tableBodyRef}
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
