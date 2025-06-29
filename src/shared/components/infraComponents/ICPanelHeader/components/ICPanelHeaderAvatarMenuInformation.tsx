"use client";

import { Avatar, Badge, Flex, Text } from "@mantine/core";

type Props = {
	profileSrc?: string;
	profileName?: string;
	profileEmail?: string;
	leftDays?: string;
};

export default function ICPanelHeaderAvatarMenuInformation(props: Props) {
	return (
		<Flex
			direction="column"
			align="center"
			justify="center"
			className="gap-y-1 pb-4"
		>
			<Avatar
				size={64}
				alt={props.profileName}
				src={props.profileSrc}
				radius="xl"
			/>
			<Text ta="center" size="md">
				{props.profileName}
			</Text>
			<Text ta="center" size="xs">
				{props.profileEmail}
			</Text>
			<div>
				{props.leftDays && (
					<Badge color="yellow" variant="outline" radius="sm">
						Protection ends <b>{props.leftDays}</b> days
					</Badge>
				)}
			</div>
		</Flex>
	);
}
