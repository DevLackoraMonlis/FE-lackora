"use client";

import { Grid, ScrollArea } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

import WorkflowAssetDiscoveryAccordionItem from "./components/WorkflowAssetDiscoveryAccordion";
import WorkflowScanAccordionItem from "./components/WorkflowScanAccordion";
import WorkflowPlayerTracking from "./components/shared/WorkflowPlayerTracking";

export default function WorkflowAssetsIdentification() {
	const { height } = useViewportSize();
	return (
		<Grid p="xs" pt="lg">
			<Grid.Col span={8} offset={2} pos="relative">
				<ScrollArea px="xs" h={height - 160}>
					<WorkflowScanAccordionItem />
					<WorkflowPlayerTracking statusColor="gray.4" />
					<WorkflowAssetDiscoveryAccordionItem />
				</ScrollArea>
			</Grid.Col>
		</Grid>
	);
}
