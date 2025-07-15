import { Badge, Flex, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import type { DataTableProps, DataTableSortStatus } from "mantine-datatable";
import { useState } from "react";

import { useDiscoverySettingQuickDiscovery } from "../../../../index.hooks";
import type { ConfigurationRs } from "../../../../index.types";

type Props = Partial<ConfigurationRs> & {
	enabledQuery: boolean;
};

export function DiscoveryQuickResults(props: Props) {
	const { discoverySettingRunNow } = useDiscoverySettingQuickDiscovery(
		props.enabledQuery,
		props.adapterId || "",
		props.configurationId || "",
	);
	const results = discoverySettingRunNow?.data?.results || [];
	const status = discoverySettingRunNow?.data?.status;
	const message = discoverySettingRunNow?.data?.message;
	const total = discoverySettingRunNow?.data?.total;

	const [page, setPage] = useState(1);
	const [sortStatus, setSortStatus] = useState<DataTableSortStatus<(typeof results)[number]>>({
		columnAccessor: "name",
		direction: "asc",
	});

	const handleSortStatusChange = (status: DataTableSortStatus<(typeof results)[number]>) => {
		setPage(1);
		setSortStatus(status);
	};

	const columns: DataTableProps<(typeof results)[number]>["columns"] = [
		{
			accessor: "ipAddress",
			title: "IP Address",
			noWrap: true,
			sortable: true,
			render: ({ ipAddress }) => (
				<Text c="blue" fz="sm" className="cursor-pointer">
					{ipAddress}
				</Text>
			),
		},
		{
			accessor: "macAddress",
			title: "MAC Address",
			sortable: true,
		},
		{
			accessor: "discoveryTime",
			title: "Time of Discovery",
			sortable: true,
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
				<Badge color={status ? "green" : "red"} circle size="30px">
					{status ? <IconCheck color="white" /> : <IconX color="white" />}
				</Badge>
				<Text fz="lg" fw="bold" tt="capitalize">
					{status ? `${total} IPs discovered From ${props.configurationIP}` : `${message}`}
				</Text>
			</Flex>
			<DataTable
				scrollAreaProps={{ h: 400 }}
				withTableBorder
				highlightOnHover
				borderRadius="sm"
				withColumnBorders
				striped
				verticalAlign="top"
				pinLastColumn
				border={2}
				columns={columns}
				page={page}
				onPageChange={setPage}
				recordsPerPage={25}
				records={results}
				totalRecords={total}
				sortStatus={sortStatus}
				onSortStatusChange={handleSortStatusChange}
			/>
		</Flex>
	);
}
