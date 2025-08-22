import { Avatar, Flex, Group, Text } from "@mantine/core";
import { IconAt, IconPhoneCall } from "@tabler/icons-react";

type Props = {
	profileSrc?: string;
	profileName?: string;
	profileEmail?: string;
	profileRole?: string;
	profilePhone?: string;
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
		<Flex wrap="nowrap" gap={"xs"} pt={"xs"}>
			<Avatar src={props.profileSrc} size={60} radius="md" styles={avatarStyles} />
			<Flex direction={"column"}>
				<Text fz="xs" tt="uppercase" fw={"bold"} c="dimmed">
					{props.profileRole}
				</Text>

				<Text fw={"bold"}>{props.profileName}</Text>

				<Group wrap="nowrap" gap={10} mt={3}>
					<IconAt stroke={1.5} size={16} />
					<Text fz="xs" c="dimmed">
						{props.profileEmail}
					</Text>
				</Group>

				<Group wrap="nowrap" gap={10} mt={5}>
					<IconPhoneCall stroke={1.5} size={16} />
					<Text fz="xs" c="dimmed">
						{props.profilePhone || "+11 (876) 890 56 23"}
					</Text>
				</Group>
			</Flex>
		</Flex>
	);
}
