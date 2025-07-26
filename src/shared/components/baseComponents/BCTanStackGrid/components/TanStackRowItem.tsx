import type { Row, Table } from "@tanstack/react-table";
import type { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import type React from "react";
import type { CSSProperties } from "react";
import { useMemo } from "react";
import type { TanStackGridProps } from "../index.types";
import TanStackCellItem from "./TanStackCellItem";
import TanStackExpandedRowItem from "./TanStackExpandedRowItem";

export default function TanStackRowItem<T extends Record<string, unknown>>(
	props: {
		row: Row<T>;
		virtualRow: VirtualItem;
		rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
		index: number;
		tableContainerRef: React.RefObject<HTMLDivElement | null>;
		columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
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
	const { row, virtualRow, rowVirtualizer } = props;
	const visibleCells = row.getVisibleCells();

	const virtualColumns = props.columnVirtualizer.getVirtualItems();

	//different virtualization strategy for columns - instead of absolute and translateY, we add empty columns to the left and right
	let virtualPaddingLeft: number | undefined;
	let virtualPaddingRight: number | undefined;

	if (props.columnVirtualizer && virtualColumns?.length) {
		virtualPaddingLeft = virtualColumns[0]?.start ?? 0;
		virtualPaddingRight =
			props.columnVirtualizer.getTotalSize() - (virtualColumns[virtualColumns.length - 1]?.end ?? 0);
	}

	const rowStyle = useMemo<CSSProperties>(
		() => ({
			display: "flex",
			position: "absolute",
			transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
			width: "100%",
			...(row.getIsExpanded() && { flexWrap: "wrap" }),
		}),
		[virtualRow.start, row.getIsExpanded()],
	);

	const trLeftStyle = useMemo<CSSProperties>(
		() => ({
			display: "flex",
			width: virtualPaddingLeft,
		}),
		[virtualPaddingLeft],
	);

	const trRightStyle = useMemo<CSSProperties>(
		() => ({
			display: "flex",
			width: virtualPaddingRight,
		}),
		[virtualPaddingRight],
	);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<tr
			key={row.id}
			data-index={virtualRow?.index}
			ref={rowVirtualizer.measureElement} //measure dynamic row height
			onClick={() => {
				if (props.onSelectedRecordsChange) {
					row.getToggleSelectedHandler();
				} else {
					props.onRowClick?.({ record: row.original, index: row.index });
				}
			}}
			onDoubleClick={() => props.onRowDoubleClick?.({ record: row.original, index: row.index })}
			style={rowStyle}
		>
			{virtualPaddingLeft ? <td style={trLeftStyle} /> : null}
			{virtualColumns.map((vc) => {
				const cell = visibleCells[vc.index];
				return (
					<TanStackCellItem<T>
						withPaddingCells={props.withPaddingCells}
						key={cell.id}
						cell={cell}
						rowHeight={props.rowHeight}
					/>
				);
			})}
			{virtualPaddingRight ? <td style={trRightStyle} /> : null}
			{row.getIsExpanded() && (
				<TanStackExpandedRowItem<T> index={virtualRow.index} row={row} rowExpansion={props.rowExpansion} />
			)}
		</tr>
	);
}
