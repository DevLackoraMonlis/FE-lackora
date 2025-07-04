"use client";
import type { ICPanelSidebarPopoverMenuGroupProps } from "@/shared/components/infraComponents/ICPanelSidebar/index.types";
import { Box, Flex, Text } from "@mantine/core";
import type { PropsWithChildren, ReactNode } from "react";
import classes from "./index.module.css";
type Props = PropsWithChildren<{
	title: ReactNode;
	menuGroup?: Omit<ICPanelSidebarPopoverMenuGroupProps, "target">;
	description?: string;
	prevHref?: string;
}>;

export default function ICPageWrapper(props: Props) {
	return (
		<Flex direction={"column"} h={"100%"}>
			<Flex pl={"xs"} align={"center"} bg={"gray.2"} h={48}>
				<Text fz={"lg"} fw={"bolder"}>
					{props.title}
				</Text>
			</Flex>
			<Box className={classes.root}>{props.children}</Box>
		</Flex>
	);
}
