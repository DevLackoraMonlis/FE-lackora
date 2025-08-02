import { Badge, Card, Flex, Highlight, LoadingOverlay, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { sortBy } from "lodash";
import { useState } from "react";

import type { PaginationRq } from "@/http/end-points/GeneralService.types";
import BCSearchInput from "@/shared/components/baseComponents/BCSearchInput";
import BCTanStackGrid from "@/shared/components/baseComponents/BCTanStackGrid";
import type { TanStackGridProps } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import { useTableSort } from "@/shared/hooks/useTableSort";

import BCEmpty from "@/shared/components/baseComponents/BCEmpty";
import { getWorkflowStatus } from "../../../../index.helper";
import { useWorkflowHistoryDetail } from "../../../../index.hooks";
import type { WorkflowScan } from "../../../../index.types";

export default function WorkflowScanHistory({ selectedScan }: { selectedScan?: WorkflowScan }) {
	const { height } = useViewportSize();
	const [{ search = "", ...queryParams }, setQueryParams] = useState<PaginationRq>({ limit: 25, page: 1 });
	const { historyDetail } = useWorkflowHistoryDetail(selectedScan?.id || "", queryParams);
	const results = historyDetail.data?.results || [];

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
			accessor: "gateway",
			title: (
				<Flex justify="space-between" align="center">
					<Text>Gateway</Text>
					{generateSortIcons("gateway")}
				</Flex>
			),
			render: ({ gateway }) => (
				<Highlight highlight={[search]} highlightStyles={{}}>
					{gateway}
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
	const filteredResults = sortedData.filter((record) =>
		Object.entries(record).some(([_, value = ""]) => (value as string)?.toLowerCase()?.includes(search)),
	);
	// pagination options
	const from = (queryParams.page - 1) * queryParams.limit;
	const to = from + queryParams.limit;
	const tableRecords = filteredResults.slice(from, to);
	const totalRecords = filteredResults?.length;

	if (historyDetail.isFetching) return <LoadingOverlay visible />;
	if (!historyDetail?.data) return <BCEmpty />;

	const scanDetail = historyDetail.data;
	const statusParams = getWorkflowStatus(selectedScan?.status || "");
	const Icon = statusParams.icon;
	return (
		<Flex direction="column" gap="xs">
			<Card bg="gray.1" p={0} m={0}>
				<Flex direction="column" gap="xs" p="sm">
					<Flex align="center" justify="space-between">
						<Flex gap="xs" align="center">
							<Badge color={statusParams.color} circle size="25px">
								{Icon ? <Icon size={19} color="white" /> : null}
							</Badge>
							<Text fw="bold" fz="md">
								{`Scan: #${selectedScan?.scanId}`}
							</Text>
						</Flex>
						<Flex gap="xs" align="center">
							<Text>{`Scan Time: ${scanDetail?.scan_time} | Duration: ${scanDetail?.duration} | Status:`}</Text>
							<Badge color={statusParams.color} variant="light">
								{statusParams.label}
							</Badge>
						</Flex>
					</Flex>
					<Text fw="bold" tt="capitalize">
						{scanDetail?.message}
					</Text>
				</Flex>
			</Card>
			<Card bg="gray.1" p={0} m={0}>
				<Flex gap="sm" align="center" p="sm">
					<BCSearchInput
						clientSide
						onSubmitSearch={(value) => handleUpdateQueryParams({ search: value })}
						placeholder="Search on columns"
						inputWidth="360px"
					/>
				</Flex>
			</Card>
			<BCTanStackGrid
				idAccessor="key"
				withTableBorder
				withColumnBorders
				withRowBorders
				withPaddingCells
				disableVirtualize
				columns={columns}
				records={tableRecords}
				totalRecords={totalRecords}
				page={queryParams.page}
				recordsPerPage={queryParams.limit}
				onPageChange={(page) => handleUpdateQueryParams({ page })}
				onRecordsPerPageChange={(limit) => handleUpdateQueryParams({ limit })}
				recordsPerPageOptions={[25, 50, 100]}
				h={height - 300}
			/>
		</Flex>
	);
}
