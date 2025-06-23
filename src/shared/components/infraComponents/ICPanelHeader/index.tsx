"use client";

import { Divider, Flex } from "@mantine/core";
import ICPanelHeaderAvatarMenu from "./components/ICPanelHeaderAvatarMenu";
import ICPanelHeaderThemeModeSelect from "./components/ICPanelHeaderThemeModeSelect";
import type { ICPanelHeaderProps } from "./index.types";

export default function ICPanelHeader(props: ICPanelHeaderProps) {
	return (
		<Flex
			w="100%"
			h="48px"
			style={props.style}
			justify="space-between"
			align="center"
		>
			<Flex px={"xs"} justify="center" align="center">
				{props.applicationLogo}
			</Flex>
			<Flex align="center">
				{props.notification}
				{props.showChangeThemeButton && <ICPanelHeaderThemeModeSelect />}
				<Divider orientation={"vertical"} mx={"md"} my={"md"} />
				<ICPanelHeaderAvatarMenu {...props} />
			</Flex>
		</Flex>
	);
}
