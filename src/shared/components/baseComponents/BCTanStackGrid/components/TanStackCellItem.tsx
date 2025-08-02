import { type Cell, flexRender } from "@tanstack/react-table";
import { useMemo } from "react";
import { TAN_STACK_EXCLUDE_COLUMNS_FROM_STYLES } from "../index.constants";
import { tanStackGetCommonPinningStyles } from "../index.helper";
import type { TanStackGridProps } from "../index.types";

export default function TanStackCellItem<T extends Record<string, unknown>>(
	props: {
		cell: Cell<T, unknown>;
	} & Pick<TanStackGridProps<T>, "rowHeight" | "withPaddingCells">,
) {
	const { cell } = props;

	let className = "defaultTdChild";
	if (TAN_STACK_EXCLUDE_COLUMNS_FROM_STYLES.includes(cell.column.id)) {
		className = "defaultNonStyleChild";
	}
	if (props.withPaddingCells) {
		className += " defaultPadding";
	}

	const isCentered = TAN_STACK_EXCLUDE_COLUMNS_FROM_STYLES.includes(cell.column.id);

	const cellStyle = useMemo(
		() => ({
			height: `${props.rowHeight || 43}px`,
			width: cell.column.getSize(),
			justifyContent: isCentered ? "center" : "flex-start",
			...tanStackGetCommonPinningStyles<T>(cell.column),
		}),
		[props.rowHeight, cell.column.getSize(), isCentered],
	);

	return (
		<td className={"tanStackCellItem"} style={cellStyle}>
			<div className={`${className} tanStackNoWrap`}>
				{flexRender(cell.column.columnDef.cell, cell.getContext())}
			</div>
		</td>
	);
}
