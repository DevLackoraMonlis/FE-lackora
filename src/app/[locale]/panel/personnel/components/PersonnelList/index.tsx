import { ActionIcon, Avatar, Flex, Group, Highlight, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconEdit, IconLocationShare, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

import type { PaginationRq } from "@/http/end-points/GeneralService.types";
import { useI18n } from "@/locales/client";
import BCTanStackGrid from "@/shared/components/baseComponents/BCTanStackGrid";
import type { TanStackGridProps } from "@/shared/components/baseComponents/BCTanStackGrid/index.types";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";
import { useTableSearch } from "@/shared/hooks/useTableSearch";
import { useTableSort } from "@/shared/hooks/useTableSort";

import { usePersonnelList } from "../../lib/index.hooks";

type Props = {
	assignService: VoidFunction;
	editPersonnel: VoidFunction;
};
export default function UsersList(props: Props) {
	const t = useI18n();
	const { isSm } = useBreakpoint();
	const { height } = useViewportSize();
	const [queryParams, setQueryParams] = useState<PaginationRq>({ limit: 25, page: 1 });
	const { generateSortIcons, sortStatus } = useTableSort<(typeof results)[number]>();
	const { searchState, generateSearchIcons } = useTableSearch<(typeof results)[number]>();

	const { userList } = usePersonnelList({ ...queryParams, ...sortStatus, ...searchState });
	const results = userList.data?.results || [];
	const total = userList.data?.total || 0;

	const handleUpdateQueryParams = (params: Partial<PaginationRq>) => {
		setQueryParams((perParams) => ({ ...perParams, page: 1, ...params }));
	};

	const columns: TanStackGridProps<(typeof results)[number]>["columns"] = [
		{
			accessor: "name",
			title: (
				<Flex justify="space-between" align="center">
					<Text>{t("personnel.name")}</Text>
					<Flex gap="3xs">
						{generateSearchIcons("name", t("personnel.name"))}
						{generateSortIcons("name")}
					</Flex>
				</Flex>
			),
			render: ({ name }) => (
				<Group gap="xs">
					<Avatar size={30} src={name} radius="lg" />
					<Highlight highlight={[searchState.name || ""]} highlightStyles={{}}>
						{name || "-"}
					</Highlight>
				</Group>
			),
		},
		{
			accessor: "branch",
			title: (
				<Flex justify="space-between" align="center">
					<Text>{t("personnel.branch")}</Text>
					<Flex gap="3xs">
						{generateSearchIcons("branch", t("personnel.branch"))}
						{generateSortIcons("branch")}
					</Flex>
				</Flex>
			),
			render: ({ branch }) => (
				<Highlight highlight={[searchState.branch || ""]} highlightStyles={{}}>
					{branch || "-"}
				</Highlight>
			),
		},
		{
			accessor: "job",
			title: (
				<Flex justify="space-between" align="center">
					<Text>{t("personnel.job")}</Text>
					<Flex gap="3xs">
						{generateSearchIcons("job", t("personnel.job"))}
						{generateSortIcons("job")}
					</Flex>
				</Flex>
			),
			render: ({ job }) => (
				<Highlight highlight={[searchState.job || ""]} highlightStyles={{}}>
					{job || "-"}
				</Highlight>
			),
		},
		{
			accessor: "phone",
			title: (
				<Flex justify="space-between" align="center">
					<Text>{t("personnel.phone")}</Text>
					<Flex gap="3xs">
						{generateSearchIcons("phone", t("personnel.phone"))}
						{generateSortIcons("phone")}
					</Flex>
				</Flex>
			),
			render: ({ phone }) => (
				<Highlight highlight={[searchState.phone || ""]} highlightStyles={{}}>
					{phone || "-"}
				</Highlight>
			),
		},
		{
			accessor: "actions",
			title: (
				<Flex justify="space-between" align="center">
					<Text>{t("personnel.action")}</Text>
				</Flex>
			),
			render: () => (
				<Flex gap={"md"} align={"center"}>
					{/* <ActionIcon variant="transparent" c={"blue"} size={"sm"}>
            <IconInfoCircle />
          </ActionIcon> */}
					<ActionIcon variant="transparent" c={"orange"} size={"sm"} onClick={props.editPersonnel}>
						<IconEdit />
					</ActionIcon>
					<ActionIcon variant="transparent" c={"green"} size={"sm"} onClick={props.assignService}>
						<IconLocationShare />
					</ActionIcon>
					<ActionIcon variant="transparent" c={"red"} size={"sm"}>
						<IconTrash />
					</ActionIcon>
				</Flex>
			),
		},
	];

	return (
		<>
			<BCTanStackGrid
				h={height - (isSm ? 170 : 210)}
				withTableBorder
				withColumnBorders
				withRowBorders
				withPaddingCells
				disableVirtualize
				idAccessor="id"
				columns={columns}
				records={results}
				totalRecords={total}
				page={queryParams.page}
				recordsPerPage={queryParams.limit}
				onPageChange={(page) => handleUpdateQueryParams({ page })}
				onRecordsPerPageChange={(limit) => handleUpdateQueryParams({ limit })}
				recordsPerPageOptions={[25, 50, 100]}
			/>
		</>
	);
}
