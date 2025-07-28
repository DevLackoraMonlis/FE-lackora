"use client";

import { Accordion, Badge, Button, Card, Flex, Grid, ScrollArea, Text } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconLineScan } from "@tabler/icons-react";
import { isNumber } from "lodash";
import { Fragment } from "react";

import {
	calculateNextScheduledScan,
	calculateScheduledScanDate,
	getWorkflowStatusColor,
	stepDescription,
} from "./index.helper";
import { useWorkflow } from "./index.hooks";

import { WorkflowStatus } from "@/shared/enums/index.enums";
import WorkflowAccordion from "./components/WorkflowAccordion";
import WorkflowDetectedAssetsModal from "./components/WorkflowDetectedAssetsModal";
import WorkflowPlayerTracking from "./components/WorkflowPlayerTracking";
import WorkflowScanHistoryModal from "./components/WorkflowScanHistoryModal";

export default function WorkflowAssetsIdentification() {
	const { height } = useViewportSize();
	const [openedDetectedAssets, handleDetectedAssets] = useDisclosure();
	const [openedScanHistory, handleScanHistory] = useDisclosure();
	const workflows = useWorkflow();

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
			<WorkflowScanHistoryModal
				onClose={handleScanHistory.close}
				opened={openedScanHistory}
				scanId={workflows.data?.id}
			/>
			<ScrollArea h={height - 130}>
				<Grid p="xs" pt="lg">
					<Grid.Col span={8} offset={2} pos="relative">
						{/* Workflow */}
						<Accordion
							defaultValue="scan"
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
												<Text fz="md" c="white">
													SCAN
												</Text>
												<Text c={getWorkflowStatusColor(workflows.data?.status)}>
													{workflows.data?.message || "-"}
												</Text>
											</Flex>
										</Flex>
										<Flex align="center" gap="xs" px="sm">
											<Badge variant="light" color="white" bg="main.5" p="md">
												<Text p="2xs" tt="none">
													{calculateNextScheduledScan(workflows.data?.next_runtime)}
												</Text>
											</Badge>
											<Badge variant="light" color={getWorkflowStatusColor(workflows.data?.status)} p="md">
												<Text p="2xs">{workflows.data?.mode || "-"}</Text>
											</Badge>
										</Flex>
									</Flex>
								</Accordion.Control>
								<Accordion.Panel>
									<Flex justify="space-between" px="3xl" align="center">
										<Flex direction="column" gap="2xs" miw="280px">
											<Flex align="center" justify="space-between">
												<Text c="white">Last Scan Time:</Text>
												<Text c="white">
													{calculateScheduledScanDate(workflows.data?.last_scan_time || "")}
												</Text>
											</Flex>
											<Flex align="center" justify="space-between">
												<Text c="white">Next Scheduled Scan:</Text>
												<Text c="white">{calculateScheduledScanDate(workflows.data?.next_runtime)}</Text>
											</Flex>
										</Flex>
										<Button variant="outline" color="white" onClick={handleScanHistory.open}>
											Scan History
										</Button>
									</Flex>
								</Accordion.Panel>
							</Accordion.Item>
						</Accordion>
						{/* PHASES */}
						{workflows.data?.phases?.map(({ steps, ...phase }) => {
							console.log({ phase });
							const progressPhase = (phase.current_processed / phase.total_processing) * 100;
							const failed = (phase.status as string) === WorkflowStatus.Failed;
							return (
								<Fragment key={phase.id}>
									<WorkflowPlayerTracking status={phase.status} />
									<WorkflowAccordion
										{...commonProps}
										failed={failed}
										type={phase.name}
										title={phase.display_name}
										status={phase.status}
										description={{
											label: failed
												? `${phase.progress} | Duration: ${phase.duration}`
												: `Completed: ${phase.progress} | Duration: ${phase.duration}`,
											progress: isNumber(progressPhase) && progressPhase < 100,
											value: progressPhase,
										}}
										steps={steps?.map((step) => {
											const progressStepValue = (step.current_processed / step.total_processing) * 100;
											const isProgress = isNumber(progressStepValue) && progressStepValue < 100;
											const description = stepDescription(
												step,
												isProgress || (step.status as string) === WorkflowStatus.Failed,
											);
											console.log({ step });
											return {
												type: step.name,
												progressStatus: step.progress_status,
												title: step.display_name,
												status: step.status,
												description: {
													isProgress,
													description,
													value: progressStepValue,
													resultMessage: step.result_message,
													resultCount: step.result_count,
													message: `${step.progress} |  Duration: ${step.duration}`,
												},
											};
										})}
									/>
								</Fragment>
							);
						})}
					</Grid.Col>
				</Grid>
			</ScrollArea>
		</>
	);
}
