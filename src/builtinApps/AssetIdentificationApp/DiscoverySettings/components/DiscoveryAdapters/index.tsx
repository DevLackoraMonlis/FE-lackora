import { Badge, Card, Flex, Grid, Image, ScrollArea, Text } from "@mantine/core";
import { Accordion } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";

import BCSideFilter, { type BCSideFilterItem } from "@/shared/components/baseComponents/BCSideFilter";
import { useRenderFilterLabels } from "@/shared/hooks/useRenderFilterLabels";
import { useStableData } from "@/shared/hooks/useStableData";

import { useDiscoveryAdapters } from "../../index.hooks";
import type { DiscoveryAdapterFilters } from "../../index.types";
import DiscoveryAdapterGateways from "./components/DiscoveryAdapterComponent";
import DiscoveryAdapterSkelton from "./components/DiscoveryAdapterSkelton";

export default function DiscoverySettingsDiscoveryAdapters() {
	const { height } = useViewportSize();
	const { renderLabel } = useRenderFilterLabels();
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
				items: filter.items.map((item) => ({ ...item, renderLabel })),
				label: filter.label,
				name: filter.param,
				type: "CheckedList",
			}) satisfies BCSideFilterItem,
	);

	return (
		<Grid p="sm" pt="md">
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
			<Grid.Col span={9} pos="relative">
				<ScrollArea px="xs" h={height - 160}>
					{discoveryAdapters.isLoading ? (
						<DiscoveryAdapterSkelton count={6} />
					) : (
						<Accordion variant="separated" onChange={setActiveAccordion}>
							{discoveryAdapters?.data?.results?.map((item) => (
								<Accordion.Item key={item.id} value={item.id} mb="xs">
									<Accordion.Control h="56px">
										<Flex align="center" justify="space-between">
											<Flex gap="sm" align="center">
												<Card w={40} h={40} variant="light" shadow="none" padding={0}>
													<Flex justify="center" align="center" m="auto">
														{item.icon ? (
															<Image
																w={30}
																h={30}
																fit="cover"
																radius="md"
																src={item.icon}
																alt={item.display_name}
															/>
														) : null}
													</Flex>
												</Card>
												<Flex direction="column">
													<Text fw="bold">{item.display_name}</Text>
													<Text c="gray.6">{item.caption || "-"}</Text>
												</Flex>
											</Flex>
											<Flex align="center" gap="xs" px="sm">
												<Badge variant="light" color={item.is_used ? "green" : "gray"} p="sm">
													<Text p="2xs">{item.is_used ? "USED" : "UNUSED"}</Text>
												</Badge>
												<Badge variant="light" radius="xs" p="md">
													<Text tt="capitalize" p="2xs">
														Configure
													</Text>
												</Badge>
											</Flex>
										</Flex>
									</Accordion.Control>
									<Accordion.Panel>
										<Text py="xs" c="gray.6">
											Added Configurations
										</Text>
										<DiscoveryAdapterGateways
											enabled={activeAccordion === item.id}
											adapterId={item.id}
											fields={item.fields}
											refetchDiscoveryAdapters={discoveryAdapters.refetch}
										/>
									</Accordion.Panel>
								</Accordion.Item>
							))}
						</Accordion>
					)}
				</ScrollArea>
			</Grid.Col>
		</Grid>
	);
}
