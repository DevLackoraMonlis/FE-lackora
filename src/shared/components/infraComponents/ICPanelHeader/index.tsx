"use client";

import { Divider, Flex } from "@mantine/core";

import ICPanelHeaderAvatarMenu from "./components/ICPanelHeaderAvatarMenu";
import ICPanelHeaderThemeModeSelect from "./components/ICPanelHeaderThemeModeSelect";
import type { ICPanelHeaderProps } from "./index.types";

export default function ICPanelHeader(props: ICPanelHeaderProps) {
	return (
		<Flex w="100%" h="48px" style={props.style} justify="space-between" align="center">
			<Flex justify="flex-start" align="center">
				{props.applicationLogo}
			</Flex>
			<Flex align="center">
				{props.notification}
				<Divider orientation={"vertical"} mx={"md"} my={"md"} color="white" />
				<ICPanelHeaderThemeModeSelect />
				<Divider orientation={"vertical"} mx={"md"} my={"md"} color="white" />
				<ICPanelHeaderAvatarMenu {...props} />
			</Flex>
		</Flex>
	);
}
