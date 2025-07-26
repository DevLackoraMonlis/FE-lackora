import type { Row, Table } from "@tanstack/react-table";
import type React from "react";
import type { TanStackGridProps } from "../index.types";
import TanStackCellItem from "./TanStackCellItem";
import TanStackExpandedRowItem from "./TanStackExpandedRowItem";

export default function TanStackRowItemNonVirtual<T extends Record<string, unknown>>(
	props: {
		row: Row<T>;
		index: number;
		tableContainerRef: React.RefObject<HTMLDivElement | null>;
		table: Table<T>;
	} & Pick<
		TanStackGridProps<T>,
		| "onSelectedRecordsChange"
		| "onRowClick"
		| "onRowDoubleClick"
		| "rowHeight"
		| "rowExpansion"
		| "withPaddingCells"
	>,
) {
	const { row, index } = props;
	const visibleCells = row.getVisibleCells();

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<tr
			key={row.id}
			onClick={() => {
				if (props.onSelectedRecordsChange) {
					row.getToggleSelectedHandler();
				} else {
					props.onRowClick?.({ record: row.original, index: row.index });
				}
			}}
			onDoubleClick={() => props.onRowDoubleClick?.({ record: row.original, index: row.index })}
			data-index={row?.index} //needed for dynamic row height measurement
			style={{
				display: "flex",
				position: "relative",
				width: "100%",
				...(row.getIsExpanded() && { flexWrap: "wrap" }),
			}}
		>
			{visibleCells.map((cell) => {
				return (
					<TanStackCellItem<T>
						withPaddingCells={props.withPaddingCells}
						key={cell.id}
						cell={cell}
						rowHeight={props.rowHeight}
					/>
				);
			})}

			{row.getIsExpanded() && (
				<TanStackExpandedRowItem<T> index={index} row={row} rowExpansion={props.rowExpansion} />
			)}
		</tr>
	);
}
