import { Accordion, Badge, Card, Flex, Progress, Text, Timeline, getGradient } from "@mantine/core";
import { IconCheck, IconLineScan } from "@tabler/icons-react";
import type { ReactNode } from "react";

type WorkflowStatus = "failed" | "completed" | "inprogress" | "idle";

type WorkflowStep = {
	title: string;
	status: WorkflowStatus;
	description?: string;
	assets?: string;
	timeInfo?: string;
	progress?: { value: number; label: string };
	icon: ReactNode;
	color?: string;
};

type WorkflowAccordionProps = {
	type: string;
	status: WorkflowStatus;
	title: string;
	description: { label: string; progress: boolean; value: number };
	steps: WorkflowStep[];
};

function getBadgeColor(status: WorkflowStep["status"]) {
	switch (status) {
		case "completed":
			return "green";
		case "inprogress":
			return "blue";
		case "idle":
			return "gray";
		case "failed":
			return "red";
		default:
			return "gray";
	}
}

export default function WorkflowAccordion({
	type,
	status,
	title,
	description,
	steps,
}: WorkflowAccordionProps) {
	if (!type) return null;
	const timelineActiveStep = steps?.findIndex(({ status }) => status === "inprogress");
	return (
		<Accordion variant="separated" defaultValue={status === "inprogress" ? type : ""}>
			<Accordion.Item value={type}>
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
							<Badge w="130px" variant="light" color={getBadgeColor(status)} px="sm" py="lg">
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
