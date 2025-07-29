import { Flex, Progress, Text } from "@mantine/core";

import { WorkflowStatus } from "@/shared/enums/index.enums";
import type { WorkflowHandles, WorkflowStep } from "../../../../index.types";

type Props = {
	step: WorkflowStep;
	handleViewMatchedAssets: WorkflowHandles["handleViewMatchedAssets"];
};

export default function AccordionStepDescription({ step, handleViewMatchedAssets }: Props) {
	const description = step?.description || {};
	return (
		<>
			{description.isProgress ? (
				<>
					<Flex gap="xs" align="center">
						<Progress value={description.value} size="md" style={{ flex: 3 }} />
						<Text fz="xs" style={{ flex: 1 }} tw="nowrap">
							{description.message}
						</Text>
					</Flex>
					<Text c="dimmed">{description.description}</Text>
				</>
			) : step.status === WorkflowStatus.Completed ? (
				<>
					<Flex align="center" gap="2xs">
						<Text
							component="span"
							c="blue"
							td="underline"
							className="cursor-pointer"
							onClick={handleViewMatchedAssets}
						>
							{description.resultCount}
						</Text>
						<Text component="span">{description.resultMessage}</Text>
					</Flex>
					<Text fz="xs" c="dimmed" component="span">
						{description.description}
					</Text>
				</>
			) : (
				<>
					<Flex align="center" gap="2xs">
						<Text c={step.status === WorkflowStatus.Failed ? "red" : ""} component="span">
							{description.message}
						</Text>
					</Flex>
					<Text fz="xs" c="dimmed" component="span">
						{description.description}
					</Text>
				</>
			)}
		</>
	);
}
