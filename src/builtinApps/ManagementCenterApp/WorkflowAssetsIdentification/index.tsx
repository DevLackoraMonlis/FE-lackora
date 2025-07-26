"use client";

import { Grid, ScrollArea } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";

import WorkflowScanAccordion from "./components/WorkflowScanAccordion";

import WorkflowAssetDiscovery from "./components/WorkflowAssetDiscovery";
import WorkflowAssetProfiling from "./components/WorkflowAssetProfiling";
import WorkflowChangeDetection from "./components/WorkflowChangeDetection";

import WorkflowDetectedAssets from "./components/shared/WorkflowDetectedAssets";

export default function WorkflowAssetsIdentification() {
	const { height } = useViewportSize();
	const [openedDetectedAssets, handleDetectedAssets] = useDisclosure();

	const handleGatewayConfiguration = () => {};
	const handleViewMatchedAssets = () => {
		handleDetectedAssets.open();
	};

	const commonProps = {
		handleGatewayConfiguration,
		handleViewMatchedAssets,
	};
	return (
		<>
			<WorkflowDetectedAssets
				onClose={handleDetectedAssets.close}
				opened={openedDetectedAssets}
				enabledQuery={false}
			/>
			<Grid p="xs" pt="lg">
				<Grid.Col span={8} offset={2} pos="relative">
					<ScrollArea px="xs" h={height - 160}>
						<WorkflowScanAccordion />
						<WorkflowAssetDiscovery {...commonProps} />
						<WorkflowAssetProfiling {...commonProps} />
						<WorkflowChangeDetection {...commonProps} />
					</ScrollArea>
				</Grid.Col>
			</Grid>
		</>
	);
}
