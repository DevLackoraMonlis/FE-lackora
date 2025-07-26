import { Accordion, Badge, Card, Flex, Menu, Progress, Text, Timeline, getGradient } from "@mantine/core";
import { IconCheck, IconDotsVertical, IconEye, IconSettings } from "@tabler/icons-react";

import { getWorkflowStatusColor } from "../../../index.helper";
import type { WorkflowAccordionProps, WorkflowHandles } from "../../../index.types";

type Props = WorkflowAccordionProps & WorkflowHandles;

export default function WorkflowAccordion({
	type,
	status,
	title,
	description,
	icon,
	steps,
	...handles
}: Props) {
	if (!type) return null;
	const timelineActiveStep = steps?.findIndex(({ status }) => status === "inprogress");
	return (
		<Accordion variant="separated" defaultValue={status === "inprogress" ? type : ""}>
			<Accordion.Item value={type}>
				<Accordion.Control h="56px">
					<Flex align="center" justify="space-between">
						<Flex gap="sm">
							<Card
								w={40}
								h={40}
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
									{icon}
								</Flex>
							</Card>
							<Flex direction="column">
								<Text fw="bold" fz="md">
									{title}
								</Text>
								{description.progress ? (
									<Flex gap="xs" w="550px" align="center">
										<Progress value={Number(description.value)} size="md" style={{ flex: 3 }} />
										<Text fz="xs" style={{ flex: 1 }} tw="nowrap">
											{description.label}
										</Text>
									</Flex>
								) : (
									<Flex align="center" gap="2xs">
										<IconCheck color="green" size={18} />
										<Text fz="xs">{description.label}</Text>
									</Flex>
								)}
							</Flex>
						</Flex>
						<Flex align="center" gap="xs" px="sm">
							<Badge w="130px" variant="light" color={getWorkflowStatusColor(status)} px="sm" py="md">
								<Text p="2xs" tt="capitalize">
									{status}
								</Text>
							</Badge>
						</Flex>
					</Flex>
				</Accordion.Control>
				{/* Panel */}
				<Accordion.Panel px="3xl">
					<Timeline active={timelineActiveStep} bulletSize={25} lineWidth={3} mt="md" color="green">
						{steps.map((step) => (
							<Timeline.Item
								key={step.title}
								bullet={step.icon}
								color={step.color || "gray"}
								title={
									<Flex align="center" justify="space-between">
										<Text fw="bold">{step.title}</Text>
										<Flex align="center">
											<Badge color={getWorkflowStatusColor(step.status)} variant="light">
												{step.status}
											</Badge>
											<Menu trigger="hover" shadow="md">
												<Menu.Target>
													<IconDotsVertical size={20} />
												</Menu.Target>
												<Menu.Dropdown>
													<Menu.Item
														leftSection={<IconSettings size={15} />}
														onClick={() => handles.handleGatewayConfiguration()}
													>
														Go to Gateway Configuration
													</Menu.Item>
													<Menu.Item
														leftSection={<IconEye size={15} />}
														onClick={() => handles.handleViewMatchedAssets()}
													>
														View Matched Assets
													</Menu.Item>
												</Menu.Dropdown>
											</Menu>
										</Flex>
									</Flex>
								}
							>
								{step.assets && (
									<Text size="sm" c="blue">
										{step.assets}
									</Text>
								)}
								{step.progress && (
									<Flex gap="xs" align="center">
										<Progress value={step.progress.value} size="md" style={{ flex: 4 }} />
										<Text fz="xs" style={{ flex: 1 }}>
											{step.progress.label}
										</Text>
									</Flex>
								)}
								{step.timeInfo && (
									<Text fz="xs" c="dimmed">
										{step.timeInfo}
									</Text>
								)}
								{step.description && (
									<Text fz="xs" c="dimmed" mt={4} w="50%">
										{step.description}
									</Text>
								)}
							</Timeline.Item>
						))}
					</Timeline>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
}
