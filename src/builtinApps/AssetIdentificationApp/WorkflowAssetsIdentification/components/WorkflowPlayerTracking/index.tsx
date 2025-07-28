import { Flex } from "@mantine/core";
import { IconPlayerTrackPrevFilled } from "@tabler/icons-react";

import { getWorkflowStatusColor } from "../../index.helper";
import type { WorkflowStatus } from "../../index.types";

type Props = {
	status: WorkflowStatus;
};
export default function WorkflowPlayerTracking({ status }: Props) {
	const color = getWorkflowStatusColor(status);
	return (
		<Flex direction="column" py="2xs" c={color}>
			<IconPlayerTrackPrevFilled size={16} style={{ transform: "rotate(270deg)" }} />
			<IconPlayerTrackPrevFilled size={16} style={{ transform: "rotate(270deg)" }} />
		</Flex>
	);
}
