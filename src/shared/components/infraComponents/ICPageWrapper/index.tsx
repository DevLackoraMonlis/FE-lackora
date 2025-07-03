"use client";
import type { ICPanelSidebarPopoverMenuGroupProps } from "@/shared/components/infraComponents/ICPanelSidebar/index.types";
import { Flex, Text } from "@mantine/core";
import type { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
	title: ReactNode;
	menuGroup?: Omit<ICPanelSidebarPopoverMenuGroupProps, "target">;
	description?: string;
	prevHref?: string;
}>;

export default function ICPageWrapper(props: Props) {
	return (
		<Flex direction={"column"}>
			<Flex pl={"xs"} align={"center"} bg={"gray.2"} h={48}>
				<Text fz={"lg"} fw={"bolder"}>
					{props.title}
				</Text>
			</Flex>
			{props.children}
		</Flex>
	);
}
