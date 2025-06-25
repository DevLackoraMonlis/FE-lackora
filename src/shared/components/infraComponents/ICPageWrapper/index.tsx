"use client";
import ICPanelSidebarPopoverMenu from "@/shared/components/infraComponents/ICPanelSidebar/components/ICPanelSidebarPopoverMenu";
import type { ICPanelSidebarPopoverMenuGroupProps } from "@/shared/components/infraComponents/ICPanelSidebar/index.types";
import { Flex, Text, Tooltip } from "@mantine/core";
import { IconChevronDown, IconInfoCircle } from "@tabler/icons-react";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
	title: string;
	menuGroup?: Omit<ICPanelSidebarPopoverMenuGroupProps, "target">;
	description?: string;
	prevHref?: string;
}>;

export default function ICPageWrapper(props: Props) {
	return (
		<Flex direction={"column"}>
			<Flex justify={"flex-start"} align={"center"} gap={"xs"}>
				<Text c={"primary.1"} size={"md"}>
					{props.title}
				</Text>
				<Flex gap={"xs"} align={"center"} justify={"center"}>
					{props.menuGroup && (
						<ICPanelSidebarPopoverMenu
							trigger={"click"}
							position={"bottom-start"}
							arrowPosition={"center"}
							{...props.menuGroup}
							target={
								<Flex
									style={{ cursor: "pointer" }}
									justify={"center"}
									align={"center"}
								>
									<IconChevronDown height={24} color={"black"} />
								</Flex>
							}
						/>
					)}
					{props.description && (
						<Tooltip position={"bottom-start"} label={props.description}>
							<IconInfoCircle color={"black"} size={14} />
						</Tooltip>
					)}
				</Flex>
			</Flex>

			{props.children}
		</Flex>
	);
}
