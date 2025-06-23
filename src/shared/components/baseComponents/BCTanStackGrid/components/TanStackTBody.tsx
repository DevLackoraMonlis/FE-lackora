import type { Row, Table } from "@tanstack/react-table";
import type { Virtualizer } from "@tanstack/react-virtual";
import type React from "react";
import type { TanStackGridProps } from "../index.types";
import TanStackRowItem from "./TanStackRowItem";

export function TanStackTBody<T extends Record<string, unknown>>(
	props: {
		tableBodyRef: React.RefObject<HTMLTableSectionElement | null>;
		table: Table<T>;
		tableContainerRef: React.RefObject<HTMLDivElement | null>;
		rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
		columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
		rows: Row<T>[];
	} & Pick<
		TanStackGridProps<T>,
		| "rowHeight"
		| "onRowDoubleClick"
		| "onRowClick"
		| "onSelectedRecordsChange"
		| "rowExpansion"
		| "idAccessor"
	>,
) {
	return (
		<tbody
			ref={props.tableBodyRef}
			style={{
				display: "grid",
				height: `${props.rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
				position: "relative", //needed for absolute positioning of rows
			}}
		>
			{props.rowVirtualizer.getVirtualItems().map((virtualRow) => {
				const row = props.rows[virtualRow.index] as Row<T>;
				return (
					<TanStackRowItem<T>
						columnVirtualizer={props.columnVirtualizer}
						tableContainerRef={props.tableContainerRef}
						table={props.table}
						key={row.id}
						index={virtualRow.index}
						row={row}
						rowVirtualizer={props.rowVirtualizer}
						virtualRow={virtualRow}
						rowHeight={props.rowHeight}
						onRowDoubleClick={props.onRowDoubleClick}
						onRowClick={props.onRowClick}
						onSelectedRecordsChange={props.onSelectedRecordsChange}
						rowExpansion={props.rowExpansion}
					/>
				);
			})}
		</tbody>
	);
}
