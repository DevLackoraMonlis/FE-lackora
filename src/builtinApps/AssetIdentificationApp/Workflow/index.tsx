"use client";

import { Accordion, Badge, Button, Card, Flex, Grid, ScrollArea, Skeleton, Text } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconLineScan } from "@tabler/icons-react";
import { Fragment, useState } from "react";

import { WORKFLOW_REDIRECT_PATH, WORKFLOW_REFETCH_INTERVAL } from "./index.constants";
import {
	calculateNextScheduledScan,
	calculateScheduledScanDate,
	getWorkflowStatus,
	phaseDescription,
	stepDescription,
} from "./index.helper";
import { useWorkflow } from "./index.hooks";

import { useAppRedirect } from "@/shared/hooks/useAppRedirect";
import WorkflowAccordion from "./components/WorkflowAccordion";
import WorkflowAccordionSkelton from "./components/WorkflowAccordionSkelton";
import WorkflowDetectedStepModal from "./components/WorkflowDetectedStepModal";
import WorkflowPlayerTracking from "./components/WorkflowPlayerTracking";
import WorkflowScanHistoryModal from "./components/WorkflowScanHistoryModal";

export default function WorkflowAssetsIdentification() {
	const { height } = useViewportSize();
	const [openedDetectedAssets, handleDetectedAssets] = useDisclosure();
	const [openedScanHistory, handleScanHistory] = useDisclosure();
	const { onOpenApp } = useAppRedirect();
	const { workflows, isLoading } = useWorkflow(WORKFLOW_REFETCH_INTERVAL);

	const [selectedStepId, setSelectedStepId] = useState<string>("");
	const handleGatewayConfiguration = () => {};
	const handleViewMatchedAssets = (id: string) => {
		setSelectedStepId(id);
		handleDetectedAssets.open();
	};

	const commonProps = {
		handleGatewayConfiguration,
		handleViewMatchedAssets,
		onOpenApp: () => onOpenApp(WORKFLOW_REDIRECT_PATH),
	};
	return (
		<>
			<WorkflowScanHistoryModal onClose={handleScanHistory.close} opened={openedScanHistory} />
			<WorkflowDetectedStepModal
				onClose={() => {
					setSelectedStepId("");
					handleDetectedAssets.close();
				}}
				opened={openedDetectedAssets}
				stepId={selectedStepId}
			/>
			<ScrollArea h={height - 130}>
				<Grid p="xs" pt="lg">
					<Grid.Col span={8} offset={2} pos="relative">
						{/* Workflow */}
						<Accordion
							value="scan"
							variant="separated"
							styles={({ colors, white, spacing }) => ({
								chevron: { color: white },
								panel: {
									background: colors.main[4],
									borderBottomLeftRadius: spacing["2xs"],
									borderBottomRightRadius: spacing["2xs"],
								},
								control: {
									background: colors.main[6],
									borderTopLeftRadius: spacing["2xs"],
									borderTopRightRadius: spacing["2xs"],
								},
							})}
						>
							<Accordion.Item value="scan">
								<Accordion.Control>
									<Flex align="center" justify="space-between">
										<Flex gap="sm">
											<Card w={50} h={50} variant="light" shadow="none" padding={0}>
												<Flex justify="center" align="center" m="auto">
													<IconLineScan size={40} />
												</Flex>
											</Card>
											<Flex direction="column" gap="2xs">
												<Text fz="md" c="white" data-testid="workflow-title">
													SCAN
												</Text>
												{isLoading ? (
													<Skeleton w="250px" h="10px" opacity={0.5} mt="2xs" />
												) : (
													<Text c={getWorkflowStatus(workflows.data?.status)?.color}>
														{workflows.data?.message || "-"}
													</Text>
												)}
											</Flex>
										</Flex>
										<Flex align="center" gap="xs" px="sm">
											<Badge variant="light" color="white" bg="main.5" p="md">
												{isLoading ? (
													<Skeleton w="200px" h="10px" opacity={0.5} mt="2xs" />
												) : (
													<Text p="2xs" tt="none">
														{calculateNextScheduledScan(workflows.data?.next_runtime)}
													</Text>
												)}
											</Badge>
											<Badge variant="light" color={getWorkflowStatus(workflows.data?.status)?.color} p="md">
												{isLoading ? (
													<Skeleton w="100px" h="10px" opacity={0.5} mt="2xs" />
												) : (
													<Text p="2xs">{workflows.data?.mode || "-"}</Text>
												)}
											</Badge>
										</Flex>
									</Flex>
								</Accordion.Control>
								<Accordion.Panel>
									<Flex justify="space-between" px="3xl" align="center">
										<Flex direction="column" gap="2xs" miw="280px">
											<Flex align="center" justify="space-between">
												<Text c="white" data-testid="workflow-title-last-scan">
													Last Scan Time:
												</Text>
												{isLoading ? (
													<Skeleton w="100px" h="10px" opacity={0.5} mt="2xs" />
												) : (
													<Text c="white">
														{calculateScheduledScanDate(workflows.data?.last_scan_time || "")}
													</Text>
												)}
											</Flex>
											<Flex align="center" justify="space-between">
												<Text c="white" data-testid="workflow-title-next-scan">
													Next Scheduled Scan:
												</Text>
												{isLoading ? (
													<Skeleton w="100px" h="10px" opacity={0.5} mt="2xs" />
												) : (
													<Text c="white" tt="capitalize">
														{calculateScheduledScanDate(workflows.data?.next_runtime)}
													</Text>
												)}
											</Flex>
										</Flex>
										<Button
											data-testid="workflow-button-scan-history"
											loading={isLoading}
											variant="outline"
											color="white"
											onClick={handleScanHistory.open}
										>
											Scan History
										</Button>
									</Flex>
								</Accordion.Panel>
							</Accordion.Item>
						</Accordion>
						{/* PHASES */}
						{isLoading ? (
							<WorkflowAccordionSkelton count={3} />
						) : (
							workflows.data?.phases?.map(({ steps, ...phase }, _, array) => {
								const description = phaseDescription<typeof phase>(phase);
								return (
									<Fragment key={phase.id}>
										<WorkflowPlayerTracking status={phase.status} />
										<WorkflowAccordion
											{...commonProps}
											defaultOpened={array?.length === 1}
											type={phase.name}
											title={phase.display_name}
											status={phase.status}
											description={description}
											steps={steps?.map((step) => {
												const description = stepDescription(step as unknown as Record<string, unknown>);
												return {
													id: step.id || "",
													type: step.name,
													progressStatus: step.progress_status,
													title: step.display_name,
													status: step.status,
													description,
												};
											})}
										/>
									</Fragment>
								);
							})
						)}
					</Grid.Col>
				</Grid>
			</ScrollArea>
		</>
	);
}
