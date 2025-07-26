import type { TanStackGridProps } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import type { HeaderGroup, Table } from "@tanstack/react-table";
import type { Virtualizer } from "@tanstack/react-virtual";
import { useMemo } from "react";
import TanStackHeadRowItemCell from "./TanStackHeadRowItemCell";

export function TanStackHeadRowItem<T extends Record<string, unknown>>(
	props: {
		headerGroup: HeaderGroup<T>;
		table: Table<T>;
		columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
	} & Pick<TanStackGridProps<T>, "withPaddingCells">,
) {
	const { headerGroup } = props;

	const virtualColumns = props.columnVirtualizer.getVirtualItems();
	//different virtualization strategy for columns - instead of absolute and translateY, we add empty columns to the left and right
	let virtualPaddingLeft: number | undefined;
	let virtualPaddingRight: number | undefined;

	if (props.columnVirtualizer && virtualColumns?.length) {
		virtualPaddingLeft = virtualColumns[0]?.start ?? 0;
		virtualPaddingRight =
			props.columnVirtualizer.getTotalSize() - (virtualColumns[virtualColumns.length - 1]?.end ?? 0);
	}

	const thLeftStyle = useMemo(
		() => ({
			display: "flex",
			width: virtualPaddingLeft,
		}),
		[virtualPaddingLeft],
	);

	const thRightStyle = useMemo(
		() => ({
			display: "flex",
			width: virtualPaddingRight,
		}),
		[virtualPaddingRight],
	);

	return (
		<tr className={"tanStackRowItem"}>
			{virtualPaddingLeft ? (
				//fake empty column to the left for virtualization scroll padding
				<th style={thLeftStyle} />
			) : null}
			{virtualColumns.map((virtualColumn) => {
				const header = headerGroup.headers[virtualColumn.index];
				return (
					<TanStackHeadRowItemCell<T>
						withPaddingCells={props.withPaddingCells}
						key={header.id}
						table={props.table}
						header={header}
					/>
				);
			})}
			{virtualPaddingRight ? (
				//fake empty column to the right for virtualization scroll padding
				<th style={thRightStyle} />
			) : null}
		</tr>
	);
}
