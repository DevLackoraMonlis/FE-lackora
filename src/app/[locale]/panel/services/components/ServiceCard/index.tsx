import { ActionIcon, Flex, Indicator, Transition, useMantineColorScheme } from "@mantine/core";
import { Box, Card, Container, type MantineColor, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconEdit, IconPlayerEject, IconTrash } from "@tabler/icons-react";

type Props = {
	color: MantineColor;
	title: string;
	description: string;
	icon: typeof IconEdit;
	editable?: boolean;
	activation?: boolean;
};
export default function ServiceSingleCard({
	color,
	title,
	description,
	icon,
	editable = true,
	activation = true,
}: Props) {
	const { hovered, ref } = useHover();
	const { colorScheme } = useMantineColorScheme();
	const Icon = icon;
	return (
		<Container h={160} ref={ref} className="cursor-pointer">
			<Indicator
				inline
				position="top-start"
				processing={activation}
				color={color}
				offset={3}
				title="Activate"
			>
				<Box pos={"relative"} pt={"xl"} pl={"xl"}>
					<Card
						pos={"absolute"}
						h={100}
						w={100}
						top={0}
						left={0}
						bg={colorScheme === "dark" ? "" : `${color}1a`}
					/>
					<Box pos={"relative"}>
						<Box c={color}>{Icon && <Icon size={30} />}</Box>
						<Flex gap={"md"} align={"center"} my={"2xs"}>
							<Text fw={"bold"} fz="lg">
								{title}
							</Text>
							<Transition
								mounted={hovered && editable}
								transition="fade-right"
								duration={500}
								timingFunction="ease"
							>
								{(styles) => (
									<Flex style={styles} gap={"2xs"} align={"center"}>
										<ActionIcon variant="transparent" c={"orange"} size={"sm"} title="Edit">
											<IconEdit />
										</ActionIcon>
										<ActionIcon variant="transparent" c={"blue"} size={"sm"} title="Deactivate">
											<IconPlayerEject />
										</ActionIcon>
										<ActionIcon variant="transparent" c={"red"} size={"sm"} title="Delete">
											<IconTrash />
										</ActionIcon>
									</Flex>
								)}
							</Transition>
						</Flex>
						<Text c="dimmed" fz="sm" lineClamp={2} tw="no-wrap">
							{description}
						</Text>
					</Box>
				</Box>
			</Indicator>
		</Container>
	);
}
