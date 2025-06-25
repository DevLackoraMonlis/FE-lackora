import { Text } from "@mantine/core";
import type { DataTableColumn } from "mantine-datatable";
import type { ICAppManagerHistoryRs } from "../../../../../index.types";

export const useHistoryTableColumns = () => {
	const columns: DataTableColumn<ICAppManagerHistoryRs>[] = [
		{
			accessor: "createdTime",
			title: "Date and Time",
			textAlign: "left",
			render: (record) => (
				<Text fw={400} size="sm">
					{record?.createdTime ?? "-"}
				</Text>
			),
			sortable: false,
		},
		{
			accessor: "action",
			title: "Action",
			textAlign: "left",
			render: (record) => (
				<Text fw={400} size="sm">
					{record?.status ?? "-"}
				</Text>
			),
			sortable: false,
		},
		{
			accessor: "user",
			title: "User",
			textAlign: "left",
			render: (record) => (
				<Text fw={400} size="sm">
					{record?.user ?? "-"}
				</Text>
			),
			sortable: false,
		},
		{
			accessor: "activationToken",
			title: "Activation Code",
			textAlign: "left",
			render: (record) => (
				<Text fw={400} size="sm">
					{record.activationToken ?? "-"}
				</Text>
			),
			sortable: false,
		},
	];
	return { columns };
};
