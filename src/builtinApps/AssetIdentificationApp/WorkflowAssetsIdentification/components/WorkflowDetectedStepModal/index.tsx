import { Badge, Card, Flex, Highlight, LoadingOverlay, Text } from "@mantine/core";
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

import { useWorkflowStep } from "../../index.hooks";

type Props = {
	onClose: VoidFunction;
	opened: boolean;
	stepId?: string;
};

function WorkflowDetectedStep({ stepId = "" }: Props) {
	const { height } = useViewportSize();
	const [{ search = "", ...queryParams }, setQueryParams] = useState<PaginationRq>({ limit: 25, page: 1 });

	const { stepDetails } = useWorkflowStep(stepId);
	const results = stepDetails.data?.results || [];
	const status = "failed";
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
			accessor: "gateway",
			title: (
				<Flex justify="space-between" align="center">
					<Text>Time of Discovery</Text>
					{generateSortIcons("gateway")}
				</Flex>
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

	if (stepDetails.isLoading) return <LoadingOverlay visible />;
	return (
		<Flex direction="column" gap="xs">
			<Card bg="gray.1" p={0} m={0}>
				<Flex gap="sm" align="center" justify="center" py="sm">
					<Badge color={status ? "green" : "red"} circle size="30px">
						{status ? <IconCheck color="white" /> : <IconX color="white" />}
					</Badge>
					<Text fz="lg" fw="bold" tt="capitalize">
						{status
							? `${stepDetails?.data?.total ?? "-"} IPs discovered by ${stepDetails?.data} in scan ${"---"}`
							: `${stepDetails?.data?.message || "-"}`}
					</Text>
				</Flex>
			</Card>
			<Card bg="gray.1" p={0} m={0}>
				<Flex gap="sm" align="center" p="sm">
					<BCSearchInput
						clientSide
						onSubmitSearch={(value) => handleUpdateQueryParams({ search: value })}
						placeholder="Search by IP , MAC address or Time of Discovery"
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
				h={height - 270}
			/>
		</Flex>
	);
}

export default function WorkflowDetectedStepModal({ onClose, opened, stepId }: Props) {
	return (
		<BCDrawer size="50%" onClose={onClose} opened={opened} title="Detected Assets">
			<WorkflowDetectedStep onClose={onClose} opened={opened} stepId={stepId} />
		</BCDrawer>
	);
}
