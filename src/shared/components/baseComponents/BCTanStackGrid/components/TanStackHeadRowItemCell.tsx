import { type Header, type Table, flexRender } from "@tanstack/react-table";
import { TAN_STACK_EXCLUDE_COLUMNS_FROM_STYLES } from "../index.constants";
import { tanStackGetCommonPinningStyles } from "../index.helper";
import type { TanStackColumnMeta, TanStackGridProps } from "../index.types";

export default function TanStackHeadRowItemCell<T extends Record<string, unknown>>(
	props: {
		header: Header<T, unknown>;
		table: Table<T>;
	} & Pick<TanStackGridProps<T>, "withPaddingCells">,
) {
	const { header, table } = props;
	const meta = header?.column.columnDef.meta as TanStackColumnMeta<T> | undefined;
	const titleStyle = meta?.titleStyle;

	let className = TAN_STACK_EXCLUDE_COLUMNS_FROM_STYLES.includes(header.column.id) ? "" : "ellipsis";

	if (props.withPaddingCells) {
		className += " defaultPadding";
	}
	return (
		<th
			key={header.id}
			style={{
				display: "flex",
				width: header.getSize(),
				justifyContent: TAN_STACK_EXCLUDE_COLUMNS_FROM_STYLES.includes(header.column.id)
					? "center"
					: "flex-start",
				alignItems: "center",
				...titleStyle?.(),
				//IMPORTANT: This is where the magic happens!
				...tanStackGetCommonPinningStyles<T>(header.column),
			}}
		>
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
