import { Center, LoadingOverlay, Pagination, ScrollArea } from "@mantine/core";
import { Badge, Card, Flex, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";

import type { PaginationRq } from "@/http/end-points/GeneralService.types";
import BCSearchInput from "@/shared/components/baseComponents/BCSearchInput";
import { useTablePagination } from "@/shared/hooks/useTablePagination";

import { getWorkflowStatusColor } from "../../../../index.helper";
import { useWorkflowScanHistory } from "../../../../index.hooks";

import type { ConfigurationRs } from "@/builtinApps/AssetIdentificationApp/DiscoverySettings/index.types";

type Props = Partial<ConfigurationRs> & {
	onClose: VoidFunction;
	opened: boolean;
};

const data = Array(200)
	.fill({
		key: "record.ip",
		status: "completed",
	})
	.map((item, idx) => ({ ...item, scanId: idx, key: `${item.key + idx.toString()}` }));

export default function WorkflowScanHistoryList(_props: Props) {
	const { height } = useViewportSize();

	const [{ search = "", ...queryParams }, setQueryParams] = useState<PaginationRq & { scanId?: string }>({
		limit: 25,
		page: 1,
	});
	const { detectedAssets } = useWorkflowScanHistory(true, queryParams);
	const results = detectedAssets.data?.results || [...data];
	const total = detectedAssets?.data?.total || results?.length;

	const { tablePagination, page, pageSize, totalRecords, setTotalRecords } = useTablePagination({
		defaultPageSize: 12,
	});
	const showPagination = totalRecords > pageSize;

	const handleUpdateQueryParams = (params: Partial<PaginationRq & { scanId: string }>) => {
		setQueryParams((perParams) => ({ ...perParams, page: 1, ...params }));
	};

	useEffect(() => {
		setTotalRecords(total || 0);
	}, [total]);

	if (detectedAssets.isLoading) return <LoadingOverlay visible />;
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
						{results?.map(({ key, scanId, status }) => {
							return (
								<Card
									key={key}
									m={0}
									p="xs"
									radius="md"
									bd="1px solid gray.4"
									className="cursor-pointer"
									onClick={() => handleUpdateQueryParams({ scanId })}
								>
									<Flex justify="space-between" align="center">
										<Text fw="bold">{`Scan #${scanId}`}</Text>
										<Badge variant="light" color={getWorkflowStatusColor(status)}>
											{status}
										</Badge>
									</Flex>
								</Card>
							);
						})}
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
