import { Badge, Card, Flex, Grid, LoadingOverlay, Text } from "@mantine/core";
import { Accordion } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";

import BCSideFilter, { type BCSideFilterItem } from "@/shared/components/baseComponents/BCSideFilter";
import { useVendorIcons } from "@/shared/hooks/icons/useVendorIcons";
import { useStableData } from "@/shared/hooks/useStableData";

import { useDiscoveryAdapters } from "../../index.hooks";
import type { DiscoveryAdapterFilters } from "../../index.types";
import DiscoveryAdapterGateways from "./components/DiscoveryAdapterGateways";

export default function DiscoverySettingsDiscoveryAdapters() {
	const { height } = useViewportSize();
	const { getVendorIcon } = useVendorIcons();

	const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
	const [queryParams, setQueryParams] = useState<DiscoveryAdapterFilters>({ type: "discovery" });
	const { discoveryAdapters } = useDiscoveryAdapters(queryParams);
	const filters = discoveryAdapters?.data?.metadata?.filters;

	const handleUpdateQueryParams = (params: Partial<DiscoveryAdapterFilters>) => {
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

	return (
		<Grid overflow="hidden" p="sm" pt="lg" gutter="lg">
			<Grid.Col span={3}>
				<BCSideFilter
					height={height - 300}
					onChange={handleUpdateQueryParams}
					searchPlaceholder="Search by adapter Name"
					filterItems={[
						{
							name: "used",
							type: "Switch",
							label: "Show only used adapters",
						},
						...(dynamicFilters || []),
					]}
				/>
			</Grid.Col>
			<Grid.Col span={9} h={height - 150} pos="relative">
				<LoadingOverlay visible={discoveryAdapters.isLoading} />
				<Accordion variant="separated" onChange={setActiveAccordion}>
					{discoveryAdapters?.data?.results?.map((item) => (
						<Accordion.Item key={item.id} value={item.id}>
							<Accordion.Control>
								<Flex align="center" justify="space-between">
									<Flex gap="sm">
										<Card variant="light" p="xs">
											{getVendorIcon(item.vendor, { size: 30 })}
										</Card>
										<Flex direction="column" gap="2xs">
											<Text fw="bold">{item.display_name}</Text>
											<Text fz="sm" c="gray.6">
												{item.description || "-"}
											</Text>
										</Flex>
									</Flex>
									<Flex align="center" gap="xs" px="sm">
										<Badge variant="light" color={item.is_used ? "green" : "gray"} p="md">
											<Text p="2xs">{item.is_used ? "USED" : "UNUSED"}</Text>
										</Badge>
										<Badge variant="light" radius="xs" p="lg">
											<Text tt="capitalize" p="2xs">
												Configure
											</Text>
										</Badge>
									</Flex>
								</Flex>
							</Accordion.Control>
							<Accordion.Panel>
								<Text py="xs" c="gray.6">
									Added Gateways
								</Text>
								<DiscoveryAdapterGateways
									enabled={activeAccordion === item.id}
									adapterId={item.id}
									fields={item.fields}
								/>
							</Accordion.Panel>
						</Accordion.Item>
					))}
				</Accordion>
			</Grid.Col>
		</Grid>
	);
}
