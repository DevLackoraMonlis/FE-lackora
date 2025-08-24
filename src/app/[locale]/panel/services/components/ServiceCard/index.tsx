import { ActionIcon, Flex, Indicator, Transition, useMantineColorScheme } from "@mantine/core";
import { Box, Card, Container, type MantineColor, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconEdit, IconPlayerEject, IconTrash } from "@tabler/icons-react";

type Props = {
	c: MantineColor;
	title: string;
	description: string;
	icon: typeof IconEdit;
};
export default function FeaturesAsymmetrical({ c, title, description, icon }: Props) {
	const { hovered, ref } = useHover();
	const { colorScheme } = useMantineColorScheme();
	const Icon = icon;
	return (
		<Container h={160} ref={ref} className="cursor-pointer">
			<Indicator inline position="top-start" processing color={`${c}.3`} offset={3} title="Activate">
				<Box pos={"relative"} pt={"xl"} pl={"xl"}>
					<Card
						pos={"absolute"}
						h={100}
						w={100}
						top={0}
						left={0}
						bg={colorScheme === "dark" ? "" : `${c}.1`}
					/>
					<Box pos={"relative"}>
						<Box c={c}>{Icon && <Icon size={30} />}</Box>
						<Flex gap={"md"} align={"center"} my={"2xs"}>
							<Text fw={"bold"} fz="lg">
								{title}
							</Text>
							<Transition mounted={hovered} transition="fade-right" duration={500} timingFunction="ease">
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
						<Text c="dimmed" fz="sm">
							{description}
						</Text>
					</Box>
				</Box>
			</Indicator>
		</Container>
	);
}
