"use client";

import { Grid, ScrollArea } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

import WorkflowScanAccordion from "./components/WorkflowScanAccordion";

import WorkflowAssetDiscovery from "./components/WorkflowAssetDiscovery";

export default function WorkflowAssetsIdentification() {
	const { height } = useViewportSize();
	return (
		<Grid p="xs" pt="lg">
			<Grid.Col span={8} offset={2} pos="relative">
				<ScrollArea px="xs" h={height - 160}>
					<WorkflowScanAccordion />
					<WorkflowAssetDiscovery />
				</ScrollArea>
			</Grid.Col>
		</Grid>
	);
}
