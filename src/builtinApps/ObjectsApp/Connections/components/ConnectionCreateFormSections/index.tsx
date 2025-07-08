import { Box, Flex, Text } from "@mantine/core";
import type { ReactNode } from "react";

type Props = {
	connectionSettingSection: ReactNode;
	generalInfoSection: ReactNode;
};

export default function ConnectionCreateFormSections(props: Props) {
	return (
		<Flex direction={"column"}>
			<Text c={"gray.6"}>General Info</Text>
			{props.generalInfoSection}
			<Text c={"gray.6"}>Connection Settings</Text>
			<Box p={"lg"}>{props.connectionSettingSection}</Box>
		</Flex>
	);
}
