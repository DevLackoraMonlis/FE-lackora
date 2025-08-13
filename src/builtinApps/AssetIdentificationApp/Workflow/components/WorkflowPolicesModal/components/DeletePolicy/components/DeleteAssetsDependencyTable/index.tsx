import { Badge, Divider, Flex, Grid, Highlight, ScrollArea, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";

import type { PaginationRq } from "@/http/end-points/GeneralService.types";
import BCSearchInput from "@/shared/components/baseComponents/BCSearchInput";
import { ASSETS_STATUS } from "@/shared/constants/assets";
import type { AssetsStatus } from "@/shared/enums/index.enums";

import type { DeletePolicy } from "../../../../../../index.types";

type Props = {
	results: DeletePolicy["results"];
};

export function DeleteAssetsDependencyTable({ results = [] }: Props) {
	const { height } = useViewportSize();
	const [{ search = "", ...queryParams }, setQueryParams] = useState<PaginationRq>({ limit: 25, page: 1 });

	const handleUpdateQueryParams = (params: Partial<PaginationRq>) => {
		setQueryParams((perParams) => ({ ...perParams, page: 1, ...params }));
	};

	// data sorting
	const filteredResults = results.filter(({ ipAddress }) => (ipAddress || "").includes(search));
	// pagination options
	const from = (queryParams.page - 1) * queryParams.limit;
	const to = from + queryParams.limit;
	const tableRecords = filteredResults.slice(from, to);
	const totalRecords = filteredResults?.length;

	return (
		<Flex direction="column" bg="white">
			<Flex align="center" justify="space-between" p="xs">
				<Text fw="bold">{`Matched Assets ( ${totalRecords} )`}</Text>
				<BCSearchInput
					clientSide
					onSubmitSearch={(value) => handleUpdateQueryParams({ search: value })}
					placeholder="Search by IP address"
					inputWidth="270px"
				/>
			</Flex>
			<ScrollArea px="xs" h={height - 550}>
				{tableRecords?.map(({ ipAddress, key, status }) => {
					const { color } = ASSETS_STATUS[status as AssetsStatus] || {};
					return (
						<Flex w="100%" direction="column" key={`${ipAddress}-${status}`}>
							<Divider />
							<Grid px="xs" py="2xs">
								<Grid.Col span={8}>
									<Flex gap="sm">
										<Text>{`${key}.`}</Text>
										<Highlight highlight={[search]} highlightStyles={{}}>
											{ipAddress || ""}
										</Highlight>
									</Flex>
								</Grid.Col>
								<Grid.Col span={4} ta="end">
									<Badge variant="dot" color={color}>
										{status}
									</Badge>
								</Grid.Col>
							</Grid>
						</Flex>
					);
				})}
			</ScrollArea>
		</Flex>
	);
}
