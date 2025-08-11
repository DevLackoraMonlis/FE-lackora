import { Flex, LoadingOverlay, Text } from "@mantine/core";
import { IconDatabaseSearch } from "@tabler/icons-react";
import type { ReactNode } from "react";

type Props = {
	iconSize?: number;
	title?: string;
	description?: ReactNode;
	icon?: ReactNode;
	visible?: boolean;
};

export default function BCEmptyOrOverlay({
	iconSize = 50,
	title,
	description = "",
	icon,
	visible = true,
}: Props) {
	return (
		<LoadingOverlay
			visible={visible}
			loaderProps={{
				children: (
					<Flex justify="center" align="center" direction="column">
						<Text component="span" c="primary.5">
							{icon || <IconDatabaseSearch size={iconSize} />}
						</Text>
						<Text component="span" fw="bold" fz="md">
							{title ?? "No date found!"}
						</Text>
						<Text component="span" c="dimmed">
							{description}
						</Text>
					</Flex>
				),
			}}
		/>
	);
}
