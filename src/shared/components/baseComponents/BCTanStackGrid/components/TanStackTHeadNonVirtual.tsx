import type { TanStackGridProps } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import type { Table } from "@tanstack/react-table";
import { TanStackHeadRowItemNonVirtual } from "./TanStackHeadRowItemNonVirtual";

export function TanStackTHeadNonVirtual<T extends Record<string, unknown>>(
	props: { table: Table<T> } & Pick<TanStackGridProps<T>, "withPaddingCells">,
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
				<TanStackHeadRowItemNonVirtual<T>
					withPaddingCells={props.withPaddingCells}
					key={headerGroup.id}
					headerGroup={headerGroup}
					table={props.table}
				/>
			))}
		</thead>
	);
}
