import { ActionIcon } from "@mantine/core";
import { IconArrowsSort, IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { useState } from "react";

type SortState<TableDatasource extends Record<string, unknown>> = {
	columnAccessor: keyof TableDatasource;
	direction: "asc" | "des" | "";
};

export function useTableSort<TableDatasource extends Record<string, unknown>>(
	defaultSortState: SortState<TableDatasource>,
) {
	const [sortStatus, setSortStatus] = useState<SortState<TableDatasource>>(
		defaultSortState || {
			columnAccessor: "",
			direction: "",
		},
	);

	const handleSortOnTable = (accessor: SortState<TableDatasource>["columnAccessor"]) => {
		setSortStatus(({ columnAccessor, direction }) => {
			if (columnAccessor === accessor) {
				if (direction === "asc") {
					direction = "des";
				} else if (direction === "des") {
					direction = "";
				} else {
					direction = "asc";
				}
			} else {
				columnAccessor = accessor;
				direction = "asc";
			}
			return { columnAccessor, direction };
		});
	};

	const generateSortIcons = (accessor: SortState<TableDatasource>["columnAccessor"]) => {
		let Icon = <IconArrowsSort size={15} />;
		if (accessor === sortStatus.columnAccessor) {
			if (sortStatus.direction === "asc") Icon = <IconSortAscending size={15} />;
			if (sortStatus.direction === "des") Icon = <IconSortDescending size={15} />;
		}

		return (
			<ActionIcon variant="transparent" c="dimmed" onClick={() => handleSortOnTable(accessor)}>
				{Icon}
			</ActionIcon>
		);
	};

	return { sortStatus, generateSortIcons };
}
