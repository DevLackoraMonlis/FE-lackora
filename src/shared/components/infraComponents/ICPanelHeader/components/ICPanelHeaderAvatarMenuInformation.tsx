import { Avatar, Flex, Text } from "@mantine/core";

type Props = {
	profileSrc?: string;
	profileName?: string;
	profileEmail?: string;
	profileRole?: string;
};

const avatarStyles = {
	image: {
		color: "var(--mantine-color-primary)",
	},
	placeholder: {
		color: "var(--mantine-color-primary-2)",
	},
};

export default function ICPanelHeaderAvatarMenuInformation(props: Props) {
	return (
		<Flex align="center" gap={"sm"} my={"sm"}>
			<Avatar size={55} alt={props.profileName} src={props.profileSrc} radius={"sm"} styles={avatarStyles} />
			<Flex direction={"column"}>
				<Text tt="capitalize" fw="bold">
					{props.profileName}
				</Text>
				<Text fz="xs">{props.profileEmail}</Text>
				<Text fz="xs">{props.profileRole}</Text>
			</Flex>
		</Flex>
	);
}
