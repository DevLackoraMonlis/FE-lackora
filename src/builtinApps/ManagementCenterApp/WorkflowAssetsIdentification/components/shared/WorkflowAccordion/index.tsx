import { Accordion, Badge, Card, Flex, Progress, Text, Timeline, getGradient } from "@mantine/core";
import { IconCheck, IconLineScan } from "@tabler/icons-react";
import type { ReactNode } from "react";

type WorkflowStep = {
	title: string;
	status: "COMPLETED" | "INPROGRESS" | "PENDING";
	description?: string;
	assets?: string;
	timeInfo?: string;
	progress?: { value: number; label: string };
	icon: ReactNode;
	color?: string;
};

type WorkflowAccordionProps = {
	value: string;
	defaultOpen?: boolean;
	title: string;
	status: string;
	completedCount: number;
	totalDurationMin: number;
	badgeColor?: string;
	timelineActiveStep: number;
	steps: WorkflowStep[];
};

function getBadgeColor(status: WorkflowStep["status"]) {
	switch (status) {
		case "COMPLETED":
			return "teal";
		case "INPROGRESS":
			return "blue";
		case "PENDING":
			return "gray";
		default:
			return "gray";
	}
}

export default function WorkflowAccordion({
	value,
	defaultOpen,
	title,
	status,
	completedCount,
	totalDurationMin,
	badgeColor = "green",
	timelineActiveStep,
	steps,
}: WorkflowAccordionProps) {
	return (
		value && (
			<Accordion variant="separated" defaultValue={defaultOpen ? value : ""}>
				<Accordion.Item value={value}>
					<Accordion.Control>
						<Flex align="center" justify="space-between">
							<Flex gap="sm">
								<Card
									w={50}
									h={50}
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
										<IconLineScan size={40} />
									</Flex>
								</Card>
								<Flex direction="column" gap="2xs">
									<Text fw="bold" fz="md">
										{title}
									</Text>
									<Flex align="center" gap="2xs">
										<IconCheck color="green" size={18} />
										<Text fz="xs">{`Completed: ${completedCount} | Duration: ${totalDurationMin}min`}</Text>
									</Flex>
								</Flex>
							</Flex>
							<Flex align="center" gap="xs" px="sm">
								<Badge w="130px" variant="light" color={badgeColor} px="sm" py="lg">
									<Text p="2xs" tt="capitalize">
										{status}
									</Text>
								</Badge>
							</Flex>
						</Flex>
					</Accordion.Control>

					<Accordion.Panel px="3xl">
						<Timeline active={timelineActiveStep} bulletSize={20} lineWidth={3} mt="md" color="green">
							{steps.map((step) => (
								<Timeline.Item
									key={step.title}
									bullet={step.icon}
									color={step.color || "gray"}
									title={
										<Flex align="center" justify="space-between">
											<Text fw="bold">{step.title}</Text>
											<Badge color={getBadgeColor(step.status)} variant="light">
												{step.status}
											</Badge>
										</Flex>
									}
								>
									{step.assets && (
										<Text size="sm" c="blue">
											{step.assets}
										</Text>
									)}

									{step.progress && (
										<Flex gap="xs">
											<Progress value={step.progress.value} mt="xs" size="xs" style={{ flex: 4 }} />
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
		)
	);
}
