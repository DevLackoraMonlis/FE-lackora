import { ActionIcon, Badge, Flex, Highlight, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconArrowsSort, IconCheck, IconSortAscending, IconSortDescending, IconX } from "@tabler/icons-react";
import { sortBy } from "lodash";
import { useState } from "react";

import type { PaginationRq } from "@/http/end-points/GeneralService.types";
import BCSearchInput from "@/shared/components/baseComponents/BCSearchInput";
import BCTanStackGrid from "@/shared/components/baseComponents/BCTanStackGrid";
import type { TanStackGridProps } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";

import { useDiscoverySettingQuickDiscovery } from "../../../../index.hooks";
import type { ConfigurationRs } from "../../../../index.types";

type Props = Partial<ConfigurationRs> & {
	enabledQuery: boolean;
};

export function DiscoveryQuickResults(props: Props) {
	const { height } = useViewportSize();

	const { discoverySettingRunNow } = useDiscoverySettingQuickDiscovery(
		props.enabledQuery,
		props.adapterId || "",
		props.configurationId || "",
	);
	const results = discoverySettingRunNow?.data?.results || [];
	const status = discoverySettingRunNow?.data?.status;
	const message = discoverySettingRunNow?.data?.message;
	const total = discoverySettingRunNow?.data?.total;

	const [{ search = "", ...queryParams }, setQueryParams] = useState<PaginationRq>({ limit: 25, page: 1 });
	const [sortStatus, setSortStatus] = useState<{
		columnAccessor: keyof (typeof results)[number];
		direction: "asc" | "des" | "";
	}>({
		columnAccessor: "discoveryTime",
		direction: "des",
	});

	const handleUpdateQueryParams = (params: Partial<PaginationRq>) => {
		setQueryParams((perParams) => ({ ...perParams, page: 1, ...params }));
	};

	const sortedData = sortBy(results, (record) => record[sortStatus.columnAccessor]);
	if (sortStatus.direction === "des") sortedData.reverse();
	const filteredResults = sortedData.filter(
		({ macAddress, ipAddress, discoveryTime }) =>
			macAddress.includes(search) || ipAddress.includes(search) || discoveryTime.includes(search),
	);
	// pagination options
	const from = (queryParams.page - 1) * queryParams.limit;
	const to = from + queryParams.limit;
	const tableRecords = filteredResults.slice(from, to);
	const totalRecords = filteredResults?.length;

	const handleSortTable = (accessor: keyof (typeof results)[number]) => {
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

	const TitleWithSortAction = ({
		title,
		accessor,
	}: {
		title: string;
		accessor: keyof (typeof results)[number];
	}) => {
		const { columnAccessor, direction } = sortStatus;
		let Icon = <IconArrowsSort size={15} />;
		if (columnAccessor === accessor) {
			if (direction === "asc") Icon = <IconSortAscending size={15} />;
			if (direction === "des") Icon = <IconSortDescending size={15} />;
		}
		return (
			<Flex justify="space-between" align="center">
				<Text>{title}</Text>
				<ActionIcon variant="transparent" c="dimmed" onClick={() => handleSortTable(accessor)}>
					{Icon}
				</ActionIcon>
			</Flex>
		);
	};
	const columns: TanStackGridProps<(typeof results)[number]>["columns"] = [
		{
			accessor: "ipAddress",
			title: <TitleWithSortAction title="IP Address" accessor="ipAddress" />,
			render: ({ ipAddress }) => (
				<Highlight c="blue" highlight={[search]} highlightStyles={{}}>
					{ipAddress}
				</Highlight>
			),
		},
		{
			accessor: "macAddress",
			title: <TitleWithSortAction title="MAC Address" accessor="macAddress" />,
			render: ({ macAddress }) => (
				<Highlight highlight={[search]} highlightStyles={{}}>
					{macAddress}
				</Highlight>
			),
		},
		{
			accessor: "discoveryTime",
			title: <TitleWithSortAction title="Time of Discovery" accessor="discoveryTime" />,
			render: ({ discoveryTime }) => (
				<Highlight highlight={[search]} highlightStyles={{}}>
					{discoveryTime}
				</Highlight>
			),
		},
	];
	return (
		<Flex direction="column" p="sm" gap="xs" w="100%">
			<Flex gap="sm" align="center" justify="center" py="sm" bg="gray.1">
				<Badge color={status ? "green" : "red"} circle size="30px">
					{status ? <IconCheck color="white" /> : <IconX color="white" />}
				</Badge>
				<Text fz="lg" fw="bold" tt="capitalize">
					{status ? `${total} IPs discovered From ${props.configurationIP}` : `${message}`}
				</Text>
			</Flex>
			<Flex gap="sm" align="center" p="sm" bg="gray.1">
				<BCSearchInput
					clientSide
					onSubmitSearch={(value) => handleUpdateQueryParams({ search: value })}
					placeholder="Search by IP , MAC address or Time of Discovery"
					inputWidth="360px"
				/>
			</Flex>
			<BCTanStackGrid
				h={height - 390}
				withTableBorder
				withColumnBorders
				withRowBorders
				idAccessor="key"
				columns={columns}
				records={tableRecords}
				totalRecords={totalRecords}
				page={queryParams.page}
				recordsPerPage={queryParams.limit}
				onPageChange={(page) => handleUpdateQueryParams({ page })}
				onRecordsPerPageChange={(limit) => handleUpdateQueryParams({ limit })}
				recordsPerPageOptions={[25, 50, 100]}
			/>
		</Flex>
	);
}
