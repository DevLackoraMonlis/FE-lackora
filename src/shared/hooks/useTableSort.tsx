import { ActionIcon } from "@mantine/core";
import { IconArrowsSort, IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { useState } from "react";

type SortState<TableDatasource extends Record<string, unknown>> = {
	columnAccessor: keyof TableDatasource;
	direction: "asc" | "des" | "";
};

export function useTableSort<TableDatasource extends Record<string, unknown>>(
	defaultSortState?: SortState<TableDatasource>,
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
		let iconWithTitle = { icon: <IconArrowsSort size={15} aria-label="sort-none" />, title: "Sort None" };
		if (accessor === sortStatus.columnAccessor) {
			if (sortStatus.direction === "asc") {
				iconWithTitle = {
					icon: <IconSortAscending size={15} aria-label="sort-ascending" />,
					title: "Sort Ascending",
				};
			}
			if (sortStatus.direction === "des") {
				iconWithTitle = {
					icon: <IconSortDescending size={15} aria-label="sort-descending" />,
					title: "Sort Descending",
				};
			}
		}

		return (
			<ActionIcon
				variant="transparent"
				c="dimmed"
				title={iconWithTitle.title}
				onClick={() => handleSortOnTable(accessor)}
			>
				{iconWithTitle.icon}
			</ActionIcon>
		);
	};

	return { sortStatus, generateSortIcons };
}
