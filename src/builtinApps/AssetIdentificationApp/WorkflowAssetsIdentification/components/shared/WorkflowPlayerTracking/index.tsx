import { Flex } from "@mantine/core";
import { IconPlayerTrackPrevFilled } from "@tabler/icons-react";

type Props = {
	statusColor: "red" | "gray.4" | "green" | "blue";
};
export default function WorkflowPlayerTracking({ statusColor }: Props) {
	return (
		<Flex direction="column" py="2xs" c={statusColor}>
			<IconPlayerTrackPrevFilled size={12} style={{ transform: "rotate(270deg)" }} />
			<IconPlayerTrackPrevFilled size={12} style={{ transform: "rotate(270deg)" }} />
		</Flex>
	);
}
