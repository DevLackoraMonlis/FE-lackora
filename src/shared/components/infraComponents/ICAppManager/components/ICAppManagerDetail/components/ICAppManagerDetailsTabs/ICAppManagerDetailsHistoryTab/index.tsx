import BCTanStackGrid from "@/shared/components/baseComponents/BCTanStackGrid";
import { useGetPluginHistory } from "@/shared/components/infraComponents/ICAppManager/hooks/useAppManagerDetail";
import { useTablePagination } from "@/shared/hooks/useTablePagination";
import { ActionIcon, Flex, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import React, { useEffect } from "react";
import type {
	AppManagerHistoryRs,
	ICAppManagerAxiosApiFn,
	ICAppManagerHistoryRq,
	PaginationRs,
} from "../../../../../index.types";
import { useHistoryTableColumns } from "./index.hooks";
import classes from "./index.module.css";

type Props = {
	name?: string;
	getPluginHistory: ICAppManagerAxiosApiFn<
		ICAppManagerHistoryRq,
		PaginationRs<AppManagerHistoryRs>
	>;
};

export default function ICAppManagerDetailsHistoryTab(props: Props) {
	const { name, getPluginHistory } = props;
	const [searchName, setSearchName] = React.useState<string>("");
	const [searchInputValue, setSearchInputValue] = React.useState("");
	const { setTotalRecords, tablePagination } = useTablePagination();

	const { columns } = useHistoryTableColumns();
	const { pluginHistory, pluginHistoryLoading } = useGetPluginHistory({
		getPluginHistory: getPluginHistory,
		payload: {
			name: name || "",
			pagination: {
				page: tablePagination.page,
				limit: tablePagination.recordsPerPage,
				sort: "id",
				order: "asc",
				search: searchInputValue || "",
			},
		},
	});

	const handleSetSearch = (value: string) => {
		setSearchInputValue(value);
	};

	useEffect(() => {
		if (pluginHistory?.data.total) {
			setTotalRecords(pluginHistory.data.total);
		}
	}, [pluginHistory?.data.total, setTotalRecords]);

	return (
		<Flex direction="column" gap={10}>
			<Flex align="center" gap={5}>
				<TextInput
					classNames={classes}
					id="data-test-input-search"
					value={searchName}
					onChange={(e) => setSearchName(e.target.value)}
					onKeyDown={getHotkeyHandler([
						["Enter", () => handleSetSearch(searchName)],
					])}
				/>
				<ActionIcon
					size="lg"
					onClick={() => handleSetSearch(searchName)}
					loading={pluginHistoryLoading}
				>
					<IconSearch size={16} />
				</ActionIcon>
			</Flex>
			<Flex w="100%" direction="column" h="677px">
				<BCTanStackGrid<AppManagerHistoryRs>
					{...tablePagination}
					withRowBorders
					idAccessor={"id"}
					withTableBorder
					fetching={pluginHistoryLoading}
					records={pluginHistory?.data?.results || []}
					columns={columns as []}
				/>
			</Flex>
		</Flex>
	);
}
