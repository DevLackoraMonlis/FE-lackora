"use client";

import { Button, Center, Flex, Grid, LoadingOverlay, Pagination, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

import BCSideFilter, { type BCSideFilterItem } from "@/shared/components/baseComponents/BCSideFilter";
import { useTablePagination } from "@/shared/hooks/useTablePagination";
import { useAdapterAndVendorIcons } from "@/shared/icons/hooks/useAdapterIcons";

import AdapterSingleCard from "./components/AdapterSingleCard";
import ImportAdapter from "./components/ImportAdapter";
import type { AdaptersFilters } from "./index.types";

export default function AdapterManagementLandingPage() {
	const { height } = useViewportSize();
	const { getAdapterAndVendorIcon } = useAdapterAndVendorIcons();
	const { tablePagination, page, pageSize, totalRecords } = useTablePagination({
		defaultPageSize: 12,
	});
	const paginationHidden = !(totalRecords > pageSize);
	const [queryParams, setQueryParams] = useState<AdaptersFilters>({
		type: "discovery",
		page,
		limit: pageSize,
	});
	console.info(queryParams);
	// const { discoveryAdapters } = useDiscoveryAdapters(queryParams);

	const handleUpdateQueryParams = (params: Partial<AdaptersFilters>) => {
		setQueryParams((perParams) => ({ ...perParams, ...params }));
	};

	const dynamicFilters: BCSideFilterItem[] = [];
	// discoveryAdapters?.data?.metadata?.filters?.map((filter) => {
	//   const filterItem: BCSideFilterItem = {
	//     items: filter.items,
	//     label: filter.label,
	//     name: filter.param,
	//     type: "CheckedList",
	//   };

	//   return filterItem;
	// }) ||
	return (
		<>
			<ImportAdapter onClose={() => {}} />
			{/* UI section */}
			<Grid p="sm" pt="lg" gutter="lg" pos="relative">
				<LoadingOverlay visible={false} />
				<Grid.Col span={{ xs: 12, lg: 2.5 }}>
					<BCSideFilter
						height={height - 250}
						onChange={handleUpdateQueryParams}
						searchPlaceholder="Search by adapter Name"
						filterItems={[
							...dynamicFilters,
							// {
							//   name: "used",
							//   type: "Switch",
							//   label: "Show only used adapters",
							// },
						]}
					/>
				</Grid.Col>
				<Grid.Col span={{ xs: 12, lg: 9.5 }}>
					<Flex direction="column">
						<Flex justify="space-between" align="center">
							<Text fw="bold" fz="h4">{`Adapters ( ${totalRecords ?? "-"} )`}</Text>
							<Button leftSection={<IconPlus size={20} />}>Import/Update Adapter</Button>
						</Flex>
						<Grid
							gutter="sm"
							mt="md"
							pr="xs"
							style={{ overflowY: "auto" }}
							h={height - (paginationHidden ? 190 : 230)}
						>
							{Array(12)
								.fill(null)
								.map((_, idx) => (
									<Grid.Col key={idx.toString()} span={{ xs: 12, md: 6, lg: 4 }}>
										<AdapterSingleCard
											cardIcon={getAdapterAndVendorIcon("aws", { size: 30 })}
											tagIcon={getAdapterAndVendorIcon("monitor", { size: 18 })}
										/>
									</Grid.Col>
								))}
						</Grid>
						{paginationHidden && (
							<Center>
								<Pagination
									mt="xs"
									withControls={false}
									value={page}
									total={totalRecords / pageSize}
									onChange={(value) => tablePagination.onPageChange(value)}
								/>
							</Center>
						)}
					</Flex>
				</Grid.Col>
			</Grid>
		</>
	);
}
