"use client";

import { Button, Flex, Grid, LoadingOverlay, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

import BCSideFilter, { type BCSideFilterItem } from "@/shared/components/baseComponents/BCSideFilter";

import AdapterSingleCard from "./components/AdapterSingleCard";
import type { AdaptersFilters } from "./index.types";

const total = 115;
export default function AdapterManagementLandingPage() {
	const { height } = useViewportSize();
	const [queryParams, setQueryParams] = useState<AdaptersFilters>({ type: "discovery" });
	console.log(queryParams);
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
						<Text fw="bold" fz="h4">{`Adapters ( ${total ?? "-"} )`}</Text>
						<Button leftSection={<IconPlus size={20} />}>Import/Update Adapters</Button>
					</Flex>
					<Grid gutter="sm" mt="md">
						<Grid.Col span={{ xs: 12, md: 6, lg: 4 }}>
							<AdapterSingleCard />
						</Grid.Col>
						<Grid.Col span={{ xs: 12, md: 6, lg: 4 }}>
							<AdapterSingleCard />
						</Grid.Col>
						<Grid.Col span={{ xs: 12, md: 6, lg: 4 }}>
							<AdapterSingleCard />
						</Grid.Col>
					</Grid>
				</Flex>
			</Grid.Col>
		</Grid>
	);
}
