import type { DataTableProps, DataTableSortStatus } from "mantine-datatable";
import { DataTable } from "mantine-datatable";
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
			accessor: "name",
			noWrap: true,
			sortable: true,
		},
		{
			accessor: "email",
			sortable: true,
		},
		{
			accessor: "department.company.name",
			title: "Company",
			noWrap: true,
			sortable: true,
		},
	];

	return (
		<DataTable
			height="70dvh"
			minHeight={400}
			maxHeight={1000}
			withTableBorder
			highlightOnHover
			borderRadius="sm"
			withColumnBorders
			striped
			verticalAlign="top"
			pinLastColumn
			columns={columns}
			page={page}
			onPageChange={setPage}
			records={discoverySettingRunNow?.data?.results}
			totalRecords={discoverySettingRunNow?.data?.results?.length}
			recordsPerPage={25}
			sortStatus={sortStatus}
			onSortStatusChange={handleSortStatusChange}
		/>
	);
}
