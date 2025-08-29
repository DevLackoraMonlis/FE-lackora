"use client";

import { Button, Flex, ScrollArea, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

import { useBreakpoint } from "@/shared/hooks/useBreakpoint";

import BranchCard from "./BranchCard";

export default function Branches() {
	const { height } = useViewportSize();
	const { isMd, isSm } = useBreakpoint();
	return (
		<Flex direction={"column"} p={"lg"} gap={"md"}>
			<Flex justify={"space-between"} align={isMd ? "center" : ""} gap={"xs"}>
				<Text size="xl" fz={isSm ? "h3" : ""} fw={"bold"}>
					Branches
				</Text>
				<Flex align={"center"} gap={"xs"}>
					<Button leftSection={<IconPlus size={15} />} size={isMd ? "sm" : "xs"}>
						Add new branch
					</Button>
				</Flex>
			</Flex>
			<ScrollArea h={height - 130} scrollbars="y" type="never">
				<Flex direction={"column"} gap={"xs"}>
					<BranchCard />
					<BranchCard />
				</Flex>
			</ScrollArea>
		</Flex>
	);
}
