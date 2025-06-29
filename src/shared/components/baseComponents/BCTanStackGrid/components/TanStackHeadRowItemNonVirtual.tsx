import type { HeaderGroup, Table } from "@tanstack/react-table";
import TanStackHeadRowItemCell from "./TanStackHeadRowItemCell";

export function TanStackHeadRowItemNonVirtual<T extends Record<string, unknown>>(props: {
	headerGroup: HeaderGroup<T>;
	table: Table<T>;
}) {
	const { headerGroup } = props;

	const visibleHeaders = headerGroup.headers;

	return (
		<tr style={{ display: "flex", width: "100%" }}>
			{visibleHeaders.map((header) => {
				return <TanStackHeadRowItemCell<T> key={header.id} table={props.table} header={header} />;
			})}
		</tr>
	);
}
