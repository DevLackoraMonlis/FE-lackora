"use client";
import type { ICPanelSidebarPopoverMenuGroupProps } from "@/shared/components/infraComponents/ICPanelSidebar/index.types";
import { Box, Card, Flex, Text } from "@mantine/core";
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
			<Card p={0} m={0}>
				<Flex pl={"2xs"} align={"center"} h={48}>
					<Text fz={"lg"} fw={"bolder"}>
						{props.title}
					</Text>
				</Flex>
			</Card>
			<Box className={classes.root}>{props.children}</Box>
		</Flex>
	);
}
