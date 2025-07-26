import { type Header, type Table, flexRender } from "@tanstack/react-table";
import { useMemo } from "react";
import { TAN_STACK_EXCLUDE_COLUMNS_FROM_STYLES } from "../index.constants";
import { tanStackGetCommonPinningStyles } from "../index.helper";
import type { TanStackGridProps } from "../index.types";

export default function TanStackHeadRowItemCell<T extends Record<string, unknown>>(
	props: {
		header: Header<T, unknown>;
		table: Table<T>;
	} & Pick<TanStackGridProps<T>, "withPaddingCells">,
) {
	const { header, table } = props;

	let className = TAN_STACK_EXCLUDE_COLUMNS_FROM_STYLES.includes(header.column.id) ? "" : "ellipsis";

	if (props.withPaddingCells) {
		className += " defaultPadding";
	}

	const isCentered = TAN_STACK_EXCLUDE_COLUMNS_FROM_STYLES.includes(header.column.id);

	const headStyle = useMemo(
		() => ({
			display: "flex",
			width: header.getSize(),
			justifyContent: isCentered ? "center" : "flex-start",
			alignItems: "center",
			...tanStackGetCommonPinningStyles<T>(header.column),
		}),
		[header.getSize(), header.column, isCentered],
	);

	return (
		<th key={header.id} style={headStyle}>
			<div className={className}>
				{props.header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
			</div>
			<div
				{...{
					onClick: () => header.column.getToggleSortingHandler(),
					onDoubleClick: () => header.column.resetSize(),
					onMouseDown: header.getResizeHandler(),
					onTouchStart: header.getResizeHandler(),
					className: ` resizer ${table.options.columnResizeDirection} ${header.column.getIsResizing() ? "isResizing" : ""}`,
				}}
			/>
		</th>
	);
}
