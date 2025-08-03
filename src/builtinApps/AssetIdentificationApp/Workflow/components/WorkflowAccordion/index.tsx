import { Badge, Box, Card, Flex, Menu, Text, Timeline } from "@mantine/core";
import { Accordion, Progress, getGradient } from "@mantine/core";
import { IconCheck, IconDotsVertical, IconEye, IconSettings, IconX } from "@tabler/icons-react";
import { useMemo } from "react";

import { WorkflowStatus } from "@/shared/enums/index.enums";

import { workflowIcons } from "../../index.constants";
import { getWorkflowStatus } from "../../index.helper";
import type { WorkflowHandles, WorkflowPhase } from "../../index.types";
import AccordionStepDescription from "./components/AccordionStepDescription";

type Props = WorkflowPhase & WorkflowHandles & { defaultOpened: boolean };

export default function WorkflowAccordion({ type, status, title, description, steps, ...props }: Props) {
	if (!type) return null;
	const phaseStatus = useMemo(() => getWorkflowStatus(status), [status]);
	const timelineActiveStep = useMemo(() => steps?.length, [status]);
	const disabledAccordion = useMemo(() => description.failed || description.idle, [description]);
	const openedAccordionType = useMemo(
		() => (status === "inprogress" || props.defaultOpened ? (disabledAccordion ? "" : type) : ""),
		[status, type, disabledAccordion, props.defaultOpened],
	);
	return (
		<Accordion variant="separated" defaultValue={openedAccordionType}>
			<Accordion.Item value={type}>
				<Accordion.Control h="66px" disabled={disabledAccordion} data-testid="workflow-accordion-phase">
					<Flex align="center" justify="space-between">
						<Flex gap="sm">
							<Card
								w={45}
								h={45}
								variant="light"
								shadow="none"
								padding={0}
								styles={(theme) => ({
									root: {
										background: getGradient({ deg: 180, from: "primary.4", to: "primary.9" }, theme),
										color: theme.white,
									},
								})}
							>
								<Flex justify="center" align="center" m="auto">
									{workflowIcons[type as keyof typeof workflowIcons]}
								</Flex>
							</Card>
							<Flex direction="column">
								<Text fw="bold" fz="md" tt="uppercase">
									{title}
								</Text>
								{description.isProgress ? (
									<Flex gap="xs" w="550px" align="center">
										<Progress
											value={Number(description.value)}
											size="md"
											style={{ flex: 3 }}
											bg="white"
											animated
										/>
										<Text fz="xs" style={{ flex: 1 }} tw="nowrap">
											{description.message}
										</Text>
									</Flex>
								) : (
									<Flex align="center" gap="2xs">
										{description.failed ? (
											<IconX color="red" size={18} />
										) : (status as string) === WorkflowStatus.Completed ? (
											<IconCheck color="green" size={18} />
										) : (
											""
										)}
										<Text fz="xs">{description.message}</Text>
									</Flex>
								)}
							</Flex>
						</Flex>
						<Flex align="center" gap="xs" px="sm">
							<Badge variant="light" color={phaseStatus?.color} px="sm" py="md">
								<Text p="2xs" tt="capitalize">
									{phaseStatus?.label}
								</Text>
							</Badge>
						</Flex>
					</Flex>
				</Accordion.Control>
				{/* Panel */}
				<Accordion.Panel px="3xl">
					<Timeline active={timelineActiveStep} bulletSize={25} lineWidth={3} mt="md" color="green">
						{steps?.map((step) => {
							const stepParams = getWorkflowStatus(step.status || "");
							const Icon = stepParams.icon;
							return (
								<Timeline.Item
									key={step.title}
									bullet={Icon ? <Icon size={15} /> : null}
									color={stepParams.color}
									title={
										<Flex align="center" justify="space-between">
											<Text fw="bold">{step.title}</Text>
											<Flex align="center">
												<Badge color={stepParams.color} variant="light">
													{stepParams.label}
												</Badge>
												<Menu trigger="hover" shadow="md">
													<Menu.Target>
														<Box data-testid="workflow-menu-icon">
															<IconDotsVertical size={20} />
														</Box>
													</Menu.Target>
													<Menu.Dropdown>
														<Menu.Item
															data-testid="workflow-submenu-redirect"
															leftSection={<IconSettings size={15} />}
															onClick={props.onOpenApp}
														>
															Go to Gateway Configuration
														</Menu.Item>
														<Menu.Item
															disabled={stepParams.value !== WorkflowStatus.Completed}
															data-testid="workflow-submenu-view"
															leftSection={<IconEye size={15} />}
															onClick={() => props.handleViewMatchedAssets(step.id)}
														>
															View Results
														</Menu.Item>
													</Menu.Dropdown>
												</Menu>
											</Flex>
										</Flex>
									}
								>
									<AccordionStepDescription
										step={step}
										handleViewMatchedAssets={() => props.handleViewMatchedAssets(step.id)}
									/>
								</Timeline.Item>
							);
						})}
					</Timeline>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
}
