import { ActionIcon, Popover } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

import BCSearchInput from "../components/baseComponents/BCSearchInput";

type SearchState<TableDatasource extends Record<string, string>> = {
	param: keyof TableDatasource;
	search: string;
};

export function useTableSearch<TableDatasource extends Record<string, string>>(
	defaultSearchState?: SearchState<TableDatasource>,
) {
	const [searchState, setSearchStatus] = useState<SearchState<TableDatasource>>(
		defaultSearchState || {
			param: "",
			search: "",
		},
	);

	const generateSearchIcons = (accessor: SearchState<TableDatasource>["param"], title: string) => {
		return (
			<Popover trapFocus position="bottom" withArrow shadow="md">
				<Popover.Target>
					<ActionIcon variant="transparent" c="dimmed" title="search-icon">
						<IconSearch size={15} />
					</ActionIcon>
				</Popover.Target>
				<Popover.Dropdown>
					<BCSearchInput
						onSubmitSearch={(value) => {
							setSearchStatus({
								param: accessor,
								search: value,
							});
						}}
						placeholder={`Search by ${title}`}
					/>
				</Popover.Dropdown>
			</Popover>
		);
	};
	return { generateSearchIcons, searchState: { [searchState.param]: searchState.search } };
}
