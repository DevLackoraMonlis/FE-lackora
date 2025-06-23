import type { Row, Table } from "@tanstack/react-table";
import type React from "react";
import type { TanStackGridProps } from "../index.types";
import TanStackRowItemNonVirtual from "./TanStackRowItemNonVirtual";

export function TanStackTBodyNonVirtual<T extends Record<string, unknown>>(
	props: {
		tableBodyRef: React.RefObject<HTMLTableSectionElement | null>;
		table: Table<T>;
		tableContainerRef: React.RefObject<HTMLDivElement | null>;
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
				height: "auto",
				position: "relative", //needed for absolute positioning of rows
			}}
		>
			{props.rows.map((row, index) => {
				// const row = props.rows[virtualRow.index] as Row<T>;
				// Check if current row is expanded
				return (
					<TanStackRowItemNonVirtual<T>
						tableContainerRef={props.tableContainerRef}
						table={props.table}
						key={row.id}
						index={index}
						row={row}
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
