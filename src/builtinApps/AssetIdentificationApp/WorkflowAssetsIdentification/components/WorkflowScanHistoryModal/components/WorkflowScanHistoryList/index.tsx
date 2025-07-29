import { Center, Pagination, ScrollArea } from "@mantine/core";
import { Badge, Card, Flex, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";

import type { PaginationRq } from "@/http/end-points/GeneralService.types";
import BCSearchInput from "@/shared/components/baseComponents/BCSearchInput";
import { useTablePagination } from "@/shared/hooks/useTablePagination";

import { getWorkflowStatus } from "../../../../index.helper";
import { useWorkflowScanHistory } from "../../../../index.hooks";
import type { WorkflowScan } from "../../../../index.types";
import WorkflowScanHistoryListSkelton from "../WorkflowScanHistoryListSkelton";

type Props = {
	setSelectedScan: (id: WorkflowScan) => void;
	selectedScan?: WorkflowScan;
};
export default function WorkflowScanHistoryList({ setSelectedScan, selectedScan }: Props) {
	const { height } = useViewportSize();
	const [{ search = "", ...queryParams }, setQueryParams] = useState<PaginationRq>({
		limit: 10,
		page: 1,
	});
	const { scanHistoryList } = useWorkflowScanHistory(queryParams);
	const results = scanHistoryList.data?.results || [];
	const total = scanHistoryList?.data?.total;

	const { tablePagination, page, pageSize, totalRecords, setTotalRecords } = useTablePagination({
		defaultPageSize: 10,
	});
	const showPagination = totalRecords > pageSize;

	const handleUpdateQueryParams = (params: Partial<PaginationRq>) => {
		setQueryParams((perParams) => ({ ...perParams, page: 1, ...params }));
	};

	useEffect(() => {
		const lastScan = results?.[0];
		if (lastScan) {
			setTotalRecords(total || 0);
			setSelectedScan(lastScan);
		}
	}, [total]);

	return (
		<Card m={0} p="xs" bg="gray.1" h="100%" pos="relative">
			<Flex direction="column">
				<BCSearchInput
					onSubmitSearch={(value) => handleUpdateQueryParams({ search: value })}
					placeholder="Search by scan ID"
					inputWidth="100%"
				/>
				<ScrollArea h={height - 200}>
					<Flex gap="2xs" direction="column" mt="xs">
						{scanHistoryList.isLoading ? (
							<WorkflowScanHistoryListSkelton />
						) : (
							results?.map(({ id, scanId, status }) => {
								const statusParams = getWorkflowStatus(status);
								return (
									<Card
										key={id}
										m={0}
										p="xs"
										radius="md"
										shadow={selectedScan?.id === id ? "md" : "xs"}
										bd={`2px solid ${selectedScan?.id === id ? "primary.3" : "gray.4"}`}
										className="cursor-pointer"
										onClick={() => setSelectedScan({ id, scanId, status })}
									>
										<Flex justify="space-between" align="center">
											<Text fw="bold">{`Scan #${scanId}`}</Text>
											<Badge variant="light" color={statusParams?.color}>
												{statusParams?.label}
											</Badge>
										</Flex>
									</Card>
								);
							})
						)}
					</Flex>
				</ScrollArea>
				{showPagination && (
					<Flex w="100%" pos="absolute" left={0} bottom="1%" bg="gray.1">
						<Center w="100%">
							<Pagination
								gap={4}
								size="sm"
								value={page}
								total={Math.ceil(totalRecords / pageSize)}
								onChange={(value) => tablePagination.onPageChange(value)}
							/>
						</Center>
					</Flex>
				)}
			</Flex>
		</Card>
	);
}
