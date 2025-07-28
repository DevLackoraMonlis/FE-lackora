"use client";

import { Grid, ScrollArea } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconCheck, IconSearch, IconSettings, IconWorld } from "@tabler/icons-react";
import { IconDeviceDesktopSearch, IconDeviceLaptop } from "@tabler/icons-react";

import WorkflowScanAccordion from "./components/WorkflowScanAccordion";
import WorkflowAccordion from "./components/shared/WorkflowAccordion";
import WorkflowDetectedAssetsModal from "./components/shared/WorkflowDetectedAssetsModal";
import WorkflowPlayerTracking from "./components/shared/WorkflowPlayerTracking";

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
			<ScrollArea h={height - 130}>
				<Grid p="xs" pt="lg">
					<Grid.Col span={8} offset={2} pos="relative">
						{/* Workflow */}
						<WorkflowScanAccordion />
						{/* PHASES */}
						<>
							<WorkflowPlayerTracking statusColor="blue" />
							<WorkflowAccordion
								{...commonProps}
								type="WorkflowAssetDiscovery"
								title="ASSET DISCOVERY"
								status="completed"
								description={{ value: 100, label: "3/7 steps | 00:15min", progress: true }}
								icon={<IconSearch size={30} />}
								steps={[
									{
										title: "IP discovery from gateways",
										status: "completed",
										icon: <IconCheck size={15} />,
										assets: "540 assets discovered",
										timeInfo: "Start at 08:02 – End at 08:06 | Duration: 4min",
										color: "teal",
									},
									{
										title: "Sync VLANs with new detected IPs",
										status: "completed",
										icon: <IconCheck size={15} />,
										assets: "100 assets detected",
										timeInfo: "Start at 08:06 – End at 08:10 | Duration: 4min",
										color: "teal",
									},
									{
										title: "Port detection (None Credential)",
										status: "inprogress",
										icon: <IconSearch size={15} />,
										progress: { value: 25, label: "100/400 ports | 00:08min" },
										timeInfo: "Start at 08:02",
										color: "blue",
									},
									{
										title: "Detect web services (None Credential)",
										status: "idle",
										icon: <IconWorld size={15} />,
										description:
											"Description about this step, show before running\nYou’ve created new branch fix - notifications from master",
									},
									{
										title: "Detect systems' vendors based on MAC address (None Credential)",
										status: "idle",
										icon: <IconDeviceLaptop size={15} />,
										description:
											"Description about this step, show before running\nYou’ve created new branch fix - notifications from master",
									},
									{
										title: "Detect SIP Phones models (None Credential)",
										status: "idle",
										icon: <IconSettings size={15} />,
										description:
											"Description about this step, show before running\nYou’ve created new branch fix - notifications from master",
									},
									{
										title: "Windows hostname & domain detection (None Credential)",
										status: "idle",
										icon: <IconDeviceDesktopSearch size={15} />,
										description:
											"Description about this step, show before running\nYou’ve created new branch fix - notifications from master",
									},
								]}
							/>
						</>
					</Grid.Col>
				</Grid>
			</ScrollArea>
		</>
	);
}
