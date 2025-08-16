import { Button, Flex, LoadingOverlay, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import type { ReactNode } from "react";

type Props = {
	title: string;
	description?: ReactNode;
	buttonText: string;
	icon: ReactNode;
	onCreate: VoidFunction;
	visible?: boolean;
};

export default function BCEmptyWithCreate({
	icon,
	onCreate,
	title,
	description,
	buttonText,
	visible = true,
}: Props) {
	return (
		<LoadingOverlay
			visible={visible}
			loaderProps={{
				children: (
					<Flex justify="center" align="center" direction="column" gap="xs">
						<Flex>{icon}</Flex>
						<Text component="span" fw="bold" fz="md">
							{title}
						</Text>
						<Text component="span" c="dimmed" w="70%" ta="center">
							{description}
						</Text>
						<Button onClick={() => onCreate()} leftSection={<IconPlus size={20} />}>
							{buttonText}
						</Button>
					</Flex>
				),
			}}
			overlayProps={{ blur: 2, bg: "transparent" }}
		/>
	);
}
