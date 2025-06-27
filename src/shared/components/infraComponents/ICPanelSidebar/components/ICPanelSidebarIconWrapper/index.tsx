import { Card, Flex } from "@mantine/core";
import type { PropsWithChildren } from "react";

export default function ICPanelSidebarIconWrapper(props: PropsWithChildren) {
	return (
		<Card radius={"xs"} p={0} bg={"#228BE626"} w={24} h={24}>
			<Flex justify={"center"} w={"100%"} h={"100%"} align={"center"}>
				{props.children}
			</Flex>
		</Card>
	);
}
