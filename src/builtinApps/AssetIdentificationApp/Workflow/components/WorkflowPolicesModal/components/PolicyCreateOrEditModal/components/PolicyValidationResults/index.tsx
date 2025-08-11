import { Badge, Flex, Highlight, Text } from "@mantine/core";
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

type Props = {
	onClose: VoidFunction;
	opened: boolean;
	total: number;
	results: { ipAddress: string; status: string; key: string }[];
};

function PolicyValidationResults({ results, total }: Props) {
	const { height } = useViewportSize();
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
			accessor: "status",
			title: (
				<Flex justify="space-between" align="center">
					<Text>Status</Text>
					{generateSortIcons("status")}
				</Flex>
			),
			render: ({ status }) => (
				<Badge variant="dot">
					<Highlight highlight={[search]} highlightStyles={{}} fz="xs">
						{status}
					</Highlight>
				</Badge>
			),
		},
	];

	// data sorting
	const sortedData = sortBy(results, (record) => record[sortStatus.columnAccessor]);
	if (sortStatus.direction === "des") sortedData.reverse();
	const filteredResults = sortedData.filter(
		({ ipAddress, status }) => status.includes(search) || ipAddress.includes(search),
	);
	// pagination options
	const from = (queryParams.page - 1) * queryParams.limit;
	const to = from + queryParams.limit;
	const tableRecords = filteredResults.slice(from, to);
	const totalRecords = filteredResults?.length;

	return (
		<Flex direction="column" p="sm" gap="xs" w="100%">
			<Flex direction="column" align="center" gap="sm" py="sm" bg="gray.1">
				<Flex gap="sm" align="center" justify="center">
					<Badge color="green" circle size="30px">
						<IconCheck color="white" />
					</Badge>
					<Text fz="lg" fw="bold" tt="capitalize">
						{`${total.toLocaleString()} assets matched with your condition`}
					</Text>
				</Flex>
				<Text c="dimmed" fz="xs">
					Condition: If source IP is in blackPull Base and status is profiled
				</Text>
			</Flex>
			<Flex gap="sm" align="center" p="sm" bg="gray.1">
				<BCSearchInput
					clientSide
					onSubmitSearch={(value) => handleUpdateQueryParams({ search: value })}
					placeholder="Search by IP and Status"
				/>
			</Flex>
			<BCTanStackGrid
				h={height - 320}
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

export default function PolicyValidationResultsModal({ onClose, opened, ...configs }: Props) {
	return (
		<BCDrawer onClose={onClose} opened={opened} title="Matched Assets">
			<PolicyValidationResults {...configs} {...{ onClose, opened }} />
		</BCDrawer>
	);
}
