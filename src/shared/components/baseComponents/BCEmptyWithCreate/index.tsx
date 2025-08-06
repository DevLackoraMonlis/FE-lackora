import { Button, Flex, LoadingOverlay, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import type { ReactNode } from "react";

type Props = {
	title: string;
	description?: ReactNode;
	buttonText: string;
	icon: ReactNode;
	onCreate: VoidFunction;
};

export default function BCEmptyWithCreate({ icon, onCreate, title, description, buttonText }: Props) {
	return (
		<LoadingOverlay
			visible
			loaderProps={{
				children: (
					<Flex justify="center" align="center" direction="column" gap="xs">
						<Flex>{icon}</Flex>
						<Text component="span" fw="bold" fz="md">
							{title}
						</Text>
						<Text component="span" c="dimmed">
							{description}
						</Text>
						<Button onClick={onCreate} color={"main"} leftSection={<IconPlus size={20} />}>
							{buttonText}
						</Button>
					</Flex>
				),
			}}
			overlayProps={{ blur: 0, bg: "transparent" }}
		/>
	);
}
