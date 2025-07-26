import { Badge, Card, Divider, Flex, Grid, Highlight, LoadingOverlay, ScrollArea, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";

import type { PaginationRq } from "@/http/end-points/GeneralService.types";
import BCSearchInput from "@/shared/components/baseComponents/BCSearchInput";

import { useWorkflowDetectedAssets } from "../../../../../index.hooks";

import type { ConfigurationRs } from "@/builtinApps/AssetIdentificationApp/DiscoverySettings/index.types";

type Props = Partial<ConfigurationRs> & {
	onClose: VoidFunction;
	opened: boolean;
	enabledQuery: boolean;
};

export default function WorkflowScanHistoryList(props: Props) {
	const { height } = useViewportSize();
	const { detectedAssets } = useWorkflowDetectedAssets(
		props.enabledQuery,
		props.adapterId || "",
		props.lastExecutionId || "",
	);

	const results = detectedAssets.data?.results || [];
	const status = detectedAssets.data?.status;

	const [{ search = "", ...queryParams }, setQueryParams] = useState<PaginationRq>({ limit: 25, page: 1 });

	const handleUpdateQueryParams = (params: Partial<PaginationRq>) => {
		setQueryParams((perParams) => ({ ...perParams, page: 1, ...params }));
	};

	// pagination options
	const from = (queryParams.page - 1) * queryParams.limit;
	const to = from + queryParams.limit;
	const tableRecords = results.slice(from, to);
	// const totalRecords = filteredResults?.length;

	if (detectedAssets.isLoading && props.enabledQuery) return <LoadingOverlay visible />;
	return (
		<Card m={0} p="xs" bg="gray.1" h="100%">
			<Flex direction="column">
				<BCSearchInput
					onSubmitSearch={(value) => handleUpdateQueryParams({ search: value })}
					placeholder="Search by scan ID"
					inputWidth="100%"
				/>
				<ScrollArea px="xs" h={height - 500}>
					{tableRecords?.map(({ ipAddress, key }) => {
						return (
							<Flex w="100%" direction="column" key={key}>
								<Divider />
								<Grid px="xs" py="2xs">
									<Grid.Col span={8}>
										<Flex gap="xl">
											<Text>{`${key}.`}</Text>
											<Highlight highlight={[search]} highlightStyles={{}}>
												{`${"hostname"} - ${ipAddress}`}
											</Highlight>
										</Flex>
									</Grid.Col>
									<Grid.Col span={4} ta="end">
										<Badge variant="dot" color={"cyan"}>
											{status}
										</Badge>
									</Grid.Col>
								</Grid>
							</Flex>
						);
					})}
				</ScrollArea>
			</Flex>
		</Card>
	);
}
