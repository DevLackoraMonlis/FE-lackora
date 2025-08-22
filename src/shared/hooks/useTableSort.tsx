import { ActionIcon } from "@mantine/core";
import { IconArrowsSort, IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { useState } from "react";

type SortState<TableDatasource extends Record<string, string>> = {
	sort: keyof TableDatasource;
	order: "asc" | "des" | "";
};

export function useTableSort<TableDatasource extends Record<string, string>>(
	defaultSortState?: SortState<TableDatasource>,
) {
	const [sortStatus, setSortStatus] = useState<SortState<TableDatasource>>(
		defaultSortState || {
			sort: "",
			order: "",
		},
	);

	const handleSortOnTable = (accessor: SortState<TableDatasource>["sort"]) => {
		setSortStatus(({ sort, order }) => {
			if (sort === accessor) {
				if (order === "asc") {
					order = "des";
				} else if (order === "des") {
					order = "";
				} else {
					order = "asc";
				}
			} else {
				sort = accessor;
				order = "asc";
			}
			return { sort, order };
		});
	};

	const generateSortIcons = (accessor: SortState<TableDatasource>["sort"]) => {
		let iconWithTitle = { icon: <IconArrowsSort size={15} aria-label="sort-none" />, title: "Sort None" };
		if (accessor === sortStatus.sort) {
			if (sortStatus.order === "asc") {
				iconWithTitle = {
					icon: <IconSortAscending size={15} aria-label="sort-ascending" />,
					title: "Sort Ascending",
				};
			}
			if (sortStatus.order === "des") {
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
