import type { TanStackGridProps } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import type { Table } from "@tanstack/react-table";
import type { Virtualizer } from "@tanstack/react-virtual";
import { TanStackHeadRowItem } from "./TanStackHeadRowItem";

export function TanStackTHead<T extends Record<string, unknown>>(
	props: {
		table: Table<T>;
		columnVirtualizer: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
	} & Pick<TanStackGridProps<T>, "withPaddingCells">,
) {
	return (
		<thead
			style={{
				display: "grid",
				position: "sticky",
				top: 0,
				zIndex: 1,
			}}
		>
			{props.table.getHeaderGroups().map((headerGroup) => (
				<TanStackHeadRowItem<T>
					withPaddingCells={props.withPaddingCells}
					columnVirtualizer={props.columnVirtualizer}
					key={headerGroup.id}
					headerGroup={headerGroup}
					table={props.table}
				/>
			))}
		</thead>
	);
}
