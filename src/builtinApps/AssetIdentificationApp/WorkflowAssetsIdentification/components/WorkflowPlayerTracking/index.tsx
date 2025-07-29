import { Flex } from "@mantine/core";
import { IconPlayerTrackPrevFilled } from "@tabler/icons-react";

import { getWorkflowStatus } from "../../index.helper";

type Props = {
	status: string;
};
export default function WorkflowPlayerTracking({ status }: Props) {
	const color = getWorkflowStatus(status)?.c;
	return (
		<Flex direction="column" py="2xs" c={color}>
			<IconPlayerTrackPrevFilled size={16} style={{ transform: "rotate(270deg)" }} />
			<IconPlayerTrackPrevFilled size={16} style={{ transform: "rotate(270deg)" }} />
		</Flex>
	);
}
