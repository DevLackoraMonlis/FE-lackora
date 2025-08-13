import { Badge, Flex, Highlight, LoadingOverlay, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import { sortBy } from "lodash";
import { useState } from "react";

import type { PaginationRq } from "@/http/end-points/GeneralService.types";
import BCDrawer from "@/shared/components/baseComponents/BCDrawer";
import BCSearchInput from "@/shared/components/baseComponents/BCSearchInput";
import BCTanStackGrid from "@/shared/components/baseComponents/BCTanStackGrid";
import type { TanStackGridProps } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import { useTableSort } from "@/shared/hooks/useTableSort";

import { toFormattedDate } from "@/shared/lib/dayJs";
import type { ProfilingInventoryRules } from "../../index.enum";
import { useInventoryRuleMatchedAssets } from "../../index.hooks";

type Props = {
	onClose: VoidFunction;
	opened: boolean;
	inventoryRuleId: string;
	type: ProfilingInventoryRules;
};

function PushBaseMatchedAssets({ inventoryRuleId }: Props) {
	const { height } = useViewportSize();
	const { matchedAssets } = useInventoryRuleMatchedAssets(inventoryRuleId);
	const results = matchedAssets.data?.results || [];
	const total = matchedAssets.data?.total || 0;
	const scanId = matchedAssets.data?.scan_id || 0;
	const ruleName = matchedAssets.data?.rule_name;
	const lastMatched = toFormattedDate(matchedAssets.data?.last_matched, "MMMM D, YYYY [at] HH:mm") || "";

	const [{ search = "", ...queryParams }, setQueryParams] = useState<PaginationRq>({ limit: 25, page: 1 });
	const { generateSortIcons, sortStatus } = useTableSort<(typeof results)[number]>();

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
			accessor: "activity",
			title: (
				<Flex justify="space-between" align="center">
					<Text>Activity</Text>
					{generateSortIcons("activity")}
				</Flex>
			),
			render: ({ activity }) => {
				return (
					<Badge variant="light" color={activity ? "green" : "red"}>
						<Highlight highlight={[search]} highlightStyles={{}} fz="xs">
							{activity ? "Connected" : "Disconnected"}
						</Highlight>
					</Badge>
				);
			},
		},
		{
			accessor: "inventoryTime",
			title: (
				<Flex justify="space-between" align="center">
					<Text>Time of Inventory</Text>
					{generateSortIcons("inventoryTime")}
				</Flex>
			),
			render: ({ inventoryTime }) => (
				<Highlight highlight={[search]} highlightStyles={{}}>
					{inventoryTime}
				</Highlight>
			),
		},
	];

	// data sorting
	const sortedData = sortBy(results, (record) => record[sortStatus.columnAccessor]);
	if (sortStatus.direction === "des") sortedData.reverse();
	const filteredResults = sortedData.filter(
		({ ipAddress, status, inventoryTime, macAddress }) =>
			status.includes(search) ||
			ipAddress.includes(search) ||
			inventoryTime.includes(search) ||
			macAddress.includes(search),
	);
	// pagination options
	const from = (queryParams.page - 1) * queryParams.limit;
	const to = from + queryParams.limit;
	const tableRecords = filteredResults.slice(from, to);
	const totalRecords = filteredResults?.length;

	if (matchedAssets.isLoading) return <LoadingOverlay visible />;
	return (
		<Flex direction="column" p="sm" gap="xs" w="100%">
			<Flex direction="column" align="center" gap="sm" py="sm" bg="gray.1">
				<Flex gap="sm" align="center" justify="center">
					<Badge color="green" circle size="30px">
						<IconCheck color="white" />
					</Badge>
					<Text fz="lg" fw="bold" tt="capitalize">
						{`${total.toLocaleString()} assets matched with ${ruleName}`}
					</Text>
				</Flex>
				<Highlight c="dimmed" highlight={[lastMatched, `${scanId}`]} fz="xs">
					{`Last matched: ${lastMatched} | Scan ID: #${scanId}`}
				</Highlight>
			</Flex>
			<Flex gap="sm" align="center" p="sm" bg="gray.1">
				<BCSearchInput
					clientSide
					onSubmitSearch={(value) => handleUpdateQueryParams({ search: value })}
					placeholder="Search on columns"
				/>
			</Flex>
			<BCTanStackGrid
				h={height - 350}
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

export default function PushBaseMatchedAssetsModal({ onClose, opened, ...configs }: Props) {
	return (
		<BCDrawer size="50%" onClose={onClose} opened={opened} title="Matched Assets">
			<PushBaseMatchedAssets {...configs} {...{ onClose, opened }} />
		</BCDrawer>
	);
}
