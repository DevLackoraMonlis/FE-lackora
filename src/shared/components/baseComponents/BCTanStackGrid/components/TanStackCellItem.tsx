import { type Cell, type ColumnMeta, flexRender } from "@tanstack/react-table";
import type { CSSProperties } from "react";
import { TAN_STACK_EXCLUDE_COLUMNS_FROM_STYLES } from "../index.constants";
import { tanStackGetCommonPinningStyles } from "../index.helper";
import type { TanStackGridProps } from "../index.types";

export default function TanStackCellItem<T extends Record<string, unknown>>(
	props: {
		cell: Cell<T, unknown>;
	} & Pick<TanStackGridProps<T>, "rowHeight">,
) {
	const { cell } = props;
	const meta = cell.column.columnDef.meta as ColumnMeta<T, unknown> & {
		cellsStyle?: () => CSSProperties;
	};
	const cellsStyle = meta?.cellsStyle;

	let className = "defaultTdChild";
	if (TAN_STACK_EXCLUDE_COLUMNS_FROM_STYLES.includes(cell.column.id)) {
		className = "defaultNonStyleChild";
	}
	return (
		<td
			style={{
				height: `${props.rowHeight || 43}px`,
				display: "flex",
				width: cell.column.getSize(),
				justifyContent: TAN_STACK_EXCLUDE_COLUMNS_FROM_STYLES.includes(cell.column.id)
					? "center"
					: "flex-start",
				alignItems: "center",
				padding: "8px",
				...cellsStyle?.(),
				...tanStackGetCommonPinningStyles<T>(cell.column),
			}}
		>
			<div className={className} style={{ whiteSpace: "nowrap" }}>
				{flexRender(cell.column.columnDef.cell, cell.getContext())}
			</div>
		</td>
	);
}
