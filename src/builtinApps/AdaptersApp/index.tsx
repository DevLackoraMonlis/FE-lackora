"use client";

import { Button, Center, Flex, Grid, LoadingOverlay, Pagination, Text } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import BCSideFilter, { type BCSideFilterItem } from "@/shared/components/baseComponents/BCSideFilter";
import { useAdapterBadges } from "@/shared/hooks/badges/useAdapterBadges";
import { useStableData } from "@/shared/hooks/useStableData";
import { useTablePagination } from "@/shared/hooks/useTablePagination";

import AdapterSingleCard from "./components/AdapterSingleCard";
import { ImportAdapterModal, UpdateAdapterModal } from "./components/ImportAdapter";
import { useAdapterManagement } from "./index.hooks";
import type { AdaptersFilters } from "./index.types";

export default function AdapterManagementLandingPage() {
	const { height } = useViewportSize();
	const { renderAdapterBadge } = useAdapterBadges();

	const [openedImport, handleOpenedImport] = useDisclosure(false);
	const [openedUpdate, handleOpenedUpdate] = useDisclosure(false);
	const { tablePagination, page, pageSize, totalRecords, setTotalRecords } = useTablePagination({
		defaultPageSize: 12,
	});
	const showPagination = totalRecords > pageSize;
	const [queryParams, setQueryParams] = useState<AdaptersFilters>({});
	const { adapterManagement } = useAdapterManagement(queryParams);
	const filters = adapterManagement.data?.metadata?.filters;
	const total = adapterManagement?.data?.total;

	const handleUpdateQueryParams = (params: Partial<AdaptersFilters>) => {
		setQueryParams((perParams) => ({ ...perParams, ...params }));
	};

	const stableFilters = useStableData<typeof filters>(filters);
	const dynamicFilters = stableFilters?.map(
		(filter) =>
			({
				items: filter.items,
				label: filter.label,
				name: filter.param,
				type: "CheckedList",
			}) satisfies BCSideFilterItem,
	);

	useEffect(() => {
		setTotalRecords(total || 0);
	}, [total]);

	return (
		<>
			<ImportAdapterModal
				onClose={handleOpenedImport.close}
				opened={openedImport}
				refetchAdapters={adapterManagement.refetch}
			/>
			<UpdateAdapterModal
				onClose={handleOpenedUpdate.close}
				opened={openedUpdate}
				refetchAdapters={adapterManagement.refetch}
			/>
			{/* UI section */}
			<Grid p="sm" pt="lg" gutter="lg">
				<Grid.Col span={{ xs: 12, lg: 2.5 }}>
					<BCSideFilter
						height={height - 250}
						onChange={handleUpdateQueryParams}
						searchPlaceholder="Search by adapter Name"
						filterItems={dynamicFilters || []}
					/>
				</Grid.Col>
				<Grid.Col span={{ xs: 12, lg: 9.5 }}>
					<Flex direction="column">
						<Flex justify="space-between" align="center">
							<Text fw="bold" fz="h4">{`Adapters ( ${totalRecords ?? "-"} )`}</Text>
							<Button color="main" onClick={handleOpenedImport.open} leftSection={<IconPlus size={20} />}>
								Import/Update Adapter
							</Button>
						</Flex>
						<Grid
							gutter="sm"
							mt="md"
							pr="xs"
							style={{ overflowY: "auto" }}
							h={height - (showPagination ? 230 : 190)}
							pos="relative"
						>
							<LoadingOverlay visible={adapterManagement.isLoading} />
							{adapterManagement.data?.results?.map((item) => (
								<Grid.Col key={item.id} span={{ xs: 12, md: 6, lg: 4 }}>
									<AdapterSingleCard
										onDeleteAdapter={handleOpenedImport.open}
										onUpdateAdapter={handleOpenedUpdate.open}
										adapterIconPath={item.icon}
										adapterBadge={renderAdapterBadge({ iconType: item.adapterType, h: "35px" })}
										{...item}
									/>
								</Grid.Col>
							))}
						</Grid>
						{showPagination && (
							<Center>
								<Pagination
									mt="xs"
									withControls={false}
									value={page}
									total={Math.ceil(totalRecords / pageSize)}
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
