import { Badge, Flex, Highlight, LoadingOverlay, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";
import { sortBy } from "lodash";
import { useState } from "react";

import type { PaginationRq } from "@/http/end-points/GeneralService.types";
import BCDrawer from "@/shared/components/baseComponents/BCDrawer";
import BCSearchInput from "@/shared/components/baseComponents/BCSearchInput";
import BCTanStackGrid from "@/shared/components/baseComponents/BCTanStackGrid";
import type { TanStackGridProps } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import { useTableSort } from "@/shared/hooks/useTableSort";

import { useDiscoverySettingLastRun } from "../../../../index.hooks";
import type { ConfigurationRs } from "../../../../index.types";

type DiscoveryLastRunProps = Partial<ConfigurationRs> & {
	enabledQuery: boolean;
};

function DiscoveryLastRun(props: DiscoveryLastRunProps) {
	const { height } = useViewportSize();
	const { discoverySettingRunNow } = useDiscoverySettingLastRun(
		props.enabledQuery,
		props.adapterId || "",
		props.lastExecutionId || "",
	);

	const results = discoverySettingRunNow?.data?.results || [];
	const status = discoverySettingRunNow?.data?.status;

	const [{ search = "", ...queryParams }, setQueryParams] = useState<PaginationRq>({ limit: 25, page: 1 });
	const { generateSortIcons, sortStatus } = useTableSort<(typeof results)[number]>({
		columnAccessor: "discoveryTime",
		direction: "des",
	});

	const handleUpdateQueryParams = (params: Partial<PaginationRq>) => {
		setQueryParams((perParams) => ({ ...perParams, page: 1, ...params }));
	};

	const columns: TanStackGridProps<(typeof results)[number]>["columns"] = [
		{
			accessor: "ipAddress",
			title: (
				<Flex justify="space-between" align="center">
					<Text>IP Address</Text>
					{generateSortIcons("ipAddress")}
				</Flex>
			),
			render: ({ ipAddress }) => (
				<Highlight c="blue" highlight={[search]} highlightStyles={{}}>
					{ipAddress}
				</Highlight>
			),
		},
		{
			accessor: "macAddress",
			title: (
				<Flex justify="space-between" align="center">
					<Text>MAC Address</Text>
					{generateSortIcons("macAddress")}
				</Flex>
			),
			render: ({ macAddress }) => (
				<Highlight highlight={[search]} highlightStyles={{}}>
					{macAddress}
				</Highlight>
			),
		},
		{
			accessor: "discoveryTime",
			title: (
				<Flex justify="space-between" align="center">
					<Text>Time of Discovery</Text>
					{generateSortIcons("discoveryTime")}
				</Flex>
			),
			render: ({ discoveryTime }) => (
				<Highlight highlight={[search]} highlightStyles={{}}>
					{discoveryTime}
				</Highlight>
			),
		},
	];

	// data sorting
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

	if (discoverySettingRunNow.isLoading && props.enabledQuery) return <LoadingOverlay visible />;
	return (
		<Flex direction="column" p="sm" gap="xs" w="100%">
			<Flex gap="sm" align="center" justify="center" py="sm" bg="gray.1">
				<Badge color={status ? "green" : "red"} circle size="30px">
					{status ? <IconCheck color="white" /> : <IconX color="white" />}
				</Badge>
				<Text fz="lg" fw="bold" tt="capitalize">
					{status
						? `${discoverySettingRunNow?.data?.total ?? "-"} IPs discovered In ${
								discoverySettingRunNow?.data?.duration
							} From ${props.configurationIP}`
						: `${discoverySettingRunNow?.data?.message || "-"}`}
				</Text>
			</Flex>
			<Flex gap="sm" align="center" p="sm" bg="gray.1">
				<BCSearchInput
					clientSide
					onSubmitSearch={(value) => handleUpdateQueryParams({ search: value })}
					placeholder="Search by IP, MAC address and Time of Discovery"
					inputWidth="360px"
				/>
			</Flex>
			<BCTanStackGrid
				h={height - 290}
				withTableBorder
				withColumnBorders
				withRowBorders
				withPaddingCells
				disableVirtualize
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

type Props = Partial<ConfigurationRs> & {
	onClose: VoidFunction;
	opened: boolean;
};

export default function DiscoveryIPsDrawerModal({ onClose, opened, ...configs }: Props) {
	return (
		<BCDrawer onClose={onClose} opened={opened} title="Discovered IPs">
			<DiscoveryLastRun enabledQuery={true} {...configs} />
		</BCDrawer>
	);
}
