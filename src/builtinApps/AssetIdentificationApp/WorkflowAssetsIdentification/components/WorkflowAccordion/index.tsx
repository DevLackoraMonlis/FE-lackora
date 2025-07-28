import { Accordion, Badge, Card, Flex, Menu, Progress, Text, Timeline, getGradient } from "@mantine/core";
import { IconCheck, IconDotsVertical, IconEye, IconSettings, IconX } from "@tabler/icons-react";
import { useMemo } from "react";

import { workflowIcons } from "../../index.constants";
import { getWorkflowStatusColor } from "../../index.helper";
import type { WorkflowAccordionProps, WorkflowHandles } from "../../index.types";
import AccordionStepDescription from "./components/AccordionStepDescription";

type Props = WorkflowAccordionProps &
	WorkflowHandles & {
		failed: boolean;
	};

export default function WorkflowAccordion({ type, status, title, description, steps, ...props }: Props) {
	if (!type) return null;
	const timelineActiveStep = useMemo(
		() =>
			status === "completed" ? steps?.length : steps?.findIndex(({ status }) => status === "inprogress"),
		[status, steps],
	);

	return (
		<Accordion variant="separated" defaultValue={status === "inprogress" ? type : ""}>
			<Accordion.Item value={type}>
				<Accordion.Control h="66px" disabled={props.failed}>
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
								{description.progress ? (
									<Flex gap="xs" w="550px" align="center">
										<Progress value={Number(description.value)} size="md" style={{ flex: 3 }} />
										<Text fz="xs" style={{ flex: 1 }} tw="nowrap">
											{description.label}
										</Text>
									</Flex>
								) : (
									<Flex align="center" gap="2xs">
										{props.failed ? <IconX color="red" size={18} /> : <IconCheck color="green" size={18} />}
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
						{steps?.map((step) => (
							<Timeline.Item
								key={step.title}
								bullet={workflowIcons[step.status as keyof typeof workflowIcons]}
								color={getWorkflowStatusColor(step.status)}
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
														onClick={() => props.handleGatewayConfiguration()}
													>
														Go to Gateway Configuration
													</Menu.Item>
													<Menu.Item
														leftSection={<IconEye size={15} />}
														onClick={() => props.handleViewMatchedAssets()}
													>
														View Matched Assets
													</Menu.Item>
												</Menu.Dropdown>
											</Menu>
										</Flex>
									</Flex>
								}
							>
								<AccordionStepDescription
									step={step}
									handleViewMatchedAssets={() => props.handleViewMatchedAssets()}
								/>
							</Timeline.Item>
						))}
					</Timeline>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
}
