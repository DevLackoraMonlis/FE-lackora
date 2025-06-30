import type { Row } from "@tanstack/react-table";
import type { TanStackGridProps } from "../index.types";

export default function TanStackExpandedRowItem<T extends Record<string, unknown>>(
	props: {
		row: Row<T>;
		index: number;
	} & Pick<TanStackGridProps<T>, "rowExpansion">,
) {
	const { row, index } = props;

	return (
		<td
			key={`expanded-row-${row.id}`}
			style={{
				display: "flex",
				width: "100%",
				justifyContent: "flex-start",
				alignItems: "center",
				padding: "8px",
			}}
			colSpan={props.row.getAllCells().length}
		>
			{props.rowExpansion?.content({
				record: row.original as T,
				index,
			})}
		</td>
	);
}
