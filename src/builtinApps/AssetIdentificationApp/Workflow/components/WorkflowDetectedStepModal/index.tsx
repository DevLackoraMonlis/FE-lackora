import { Badge, Card, Flex, Highlight, LoadingOverlay, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { sortBy } from "lodash";
import { useState } from "react";

import type { PaginationRq } from "@/http/end-points/GeneralService.types";
import BCDrawer from "@/shared/components/baseComponents/BCDrawer";
import BCSearchInput from "@/shared/components/baseComponents/BCSearchInput";
import BCTanStackGrid from "@/shared/components/baseComponents/BCTanStackGrid";
import type { TanStackGridProps } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import { useTableSort } from "@/shared/hooks/useTableSort";

import { getWorkflowStatus } from "../../index.helper";
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
	const recordKeys = Object.entries(results.at(0) || {}).map(([key]) => key);
	const status = "completed";
	const { generateSortIcons, sortStatus } = useTableSort<(typeof results)[number]>();
	const handleUpdateQueryParams = (params: Partial<PaginationRq>) => {
		setQueryParams((perParams) => ({ ...perParams, page: 1, ...params }));
	};

	const columns: TanStackGridProps<(typeof results)[number]>["columns"] = recordKeys
		.filter((key) => key !== "key")
		.map((key) => ({
			accessor: key,
			title: (
				<Flex justify="space-between" align="center">
					<Text tt="capitalize">{key?.replaceAll("_", " ")}</Text>
					{generateSortIcons(key)}
				</Flex>
			),
			render: (record) => {
				return (
					<Highlight c={key === "ip" ? "blue" : ""} highlight={[search]} highlightStyles={{}}>
						{record[key] as string}
					</Highlight>
				);
			},
		}));

	// data sorting
	const sortedData = sortBy(
		results,
		(record) => (record as Record<string, string>)[sortStatus.columnAccessor],
	);
	if (sortStatus.direction === "des") sortedData.reverse();
	const filteredResults = sortedData.filter((record) =>
		Object.entries(record).some(([_, value = ""]) => (value as string)?.toLowerCase()?.includes(search)),
	);
	// pagination options
	const from = (queryParams.page - 1) * queryParams.limit;
	const to = from + queryParams.limit;
	const tableRecords = filteredResults.slice(from, to);
	const totalRecords = filteredResults?.length;

	if (stepDetails.isLoading) return <LoadingOverlay visible />;
	const statusParams = getWorkflowStatus(status || "");
	const Icon = statusParams.icon;
	return (
		<Flex direction="column" gap="xs">
			<Card bg="gray.1" p={0} m={0}>
				<Flex gap="sm" align="center" justify="center" py="sm">
					<Badge color={statusParams.color} circle size="30px">
						{Icon && <Icon />}
					</Badge>
					<Text fz="lg" fw="bold" tt="capitalize">
						{stepDetails?.data?.message}
					</Text>
				</Flex>
			</Card>
			<Card bg="gray.1" p={0} m={0}>
				<Flex gap="sm" align="center" p="sm">
					<BCSearchInput
						clientSide
						onSubmitSearch={(value) => handleUpdateQueryParams({ search: value })}
						placeholder="Search on columns"
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
