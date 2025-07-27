"use client";

import { Grid, ScrollArea } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";

import WorkflowScanAccordion from "./components/WorkflowScanAccordion";

import WorkflowAssetDiscovery from "./components/WorkflowAssetDiscovery";
import WorkflowAssetProfiling from "./components/WorkflowAssetProfiling";
import WorkflowChangeDetection from "./components/WorkflowChangeDetection";

import WorkflowDetectedAssetsModal from "./components/shared/WorkflowDetectedAssetsModal";

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
			<WorkflowDetectedAssetsModal
				onClose={handleDetectedAssets.close}
				opened={openedDetectedAssets}
				enabledQuery={false}
			/>
			<Grid p="xs" pt="lg">
				<Grid.Col span={8} offset={2} pos="relative">
					<ScrollArea px="xs" h={height - 130}>
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
