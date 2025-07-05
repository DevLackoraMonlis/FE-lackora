import { Box, Flex, Text, TextInput, type TextInputProps, Textarea, type TextareaProps } from "@mantine/core";
import type { ReactNode } from "react";

type Props = {
	connectionSettingSection: ReactNode;
	connectionNameInputProps: TextInputProps;
	connectionDescriptionInputProps: TextareaProps;
};

export default function ConnectionCreateFormSections(props: Props) {
	return (
		<Flex direction={"column"}>
			<Text c={"gray.6"}>General Info</Text>
			<Flex gap={"xs"} direction={"column"} p={"lg"}>
				<TextInput required label={"Connection Name"} {...props.connectionNameInputProps} />
				<Textarea
					rows={3}
					placeholder={"Summary about connection"}
					label={"Description"}
					{...props.connectionDescriptionInputProps}
				/>
			</Flex>
			<Text c={"gray.6"}>Connection Settings</Text>
			<Box p={"lg"}>{props.connectionSettingSection}</Box>
		</Flex>
	);
}
