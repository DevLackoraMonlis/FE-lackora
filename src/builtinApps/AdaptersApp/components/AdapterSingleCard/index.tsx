import { ActionIcon, Badge, Card, Center, Flex, Image, Menu, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconBuildingSkyscraper, IconDotsVertical, IconRefresh, IconTrash } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";

const MotionDiv = motion.div;

type Props = {
	adapterIconPath?: string | null;
	adapterBadge: ReactNode;
	adapterType: string;
	name: string;
	version: number;
	description?: string | null;
	onUpdateAdapter: VoidFunction;
	onDeleteAdapter: VoidFunction;
};

export default function AdapterSingleCard(props: Props) {
	const [isFlipped, setIsFlip] = useState(false);
	const { hovered, ref } = useHover();
	const { hovered: hDescription, ref: refDescription } = useHover();

	useEffect(() => {
		if (hovered && !hDescription) {
			setIsFlip(true);
		} else if (!hDescription) {
			setIsFlip(false);
		}
	}, [hovered, hDescription]);

	return (
		<MotionDiv
			className="animate-card-container"
			transition={{ duration: 0.8 }}
			animate={isFlipped ? "flipped" : "unFlipped"}
			variants={{
				flipped: { rotateY: 180 },
				unFlipped: { rotateY: 0 },
			}}
		>
			{/* BackCard */}
			<Card
				h="160px"
				shadow="xs"
				radius="sm"
				bg="transparent"
				bd="2px solid primary.2"
				ref={refDescription}
				style={{ display: !isFlipped ? "none" : "block" }}
			>
				<Card.Section p="xs" h="200px" style={{ overflowY: "auto", transform: "scaleX(-1)" }}>
					<Text fw="bold" fz="h5">
						{props.name || "-"}
					</Text>
					<Text>Version {props.version || "-"}</Text>
					<Text c="dimmed" className="cursor-pointer" ta="justify">
						{props.description || "-"}
					</Text>
				</Card.Section>
			</Card>
			{/* FrontCard */}
			<Card
				h="160px"
				shadow="xs"
				radius="sm"
				bg="gray.2"
				bd="2px solid gray.2"
				style={{ display: isFlipped ? "none" : "block" }}
			>
				<Card.Section inheritPadding p="xs" withBorder>
					<Flex gap="xs">
						<Card w={80} h={62} variant="light" shadow="none" padding={0} pt="2xs">
							<Center>
								{props.adapterIconPath ? (
									<Image fit="fill" radius="md" src={props.adapterIconPath} alt={props.name} />
								) : (
									<IconBuildingSkyscraper size={50} strokeWidth={1} />
								)}
							</Center>
						</Card>
						<Flex direction="column" gap="2xs" w="100%">
							<Flex justify="space-between">
								<Text fw="bold" fz="h5" lineClamp={1}>
									{props.name || "-"}
								</Text>
								<Menu withinPortal position="bottom-end" shadow="sm">
									<Menu.Target>
										<ActionIcon variant="transparent" color="gray">
											<IconDotsVertical size={30} />
										</ActionIcon>
									</Menu.Target>
									<Menu.Dropdown>
										<Menu.Item leftSection={<IconRefresh size={15} />} onClick={props.onUpdateAdapter}>
											Update Adapter
										</Menu.Item>
										<Menu.Item
											leftSection={<IconTrash size={15} />}
											color="red"
											onClick={props.onDeleteAdapter}
										>
											Delete
										</Menu.Item>
									</Menu.Dropdown>
								</Menu>
							</Flex>
							<Flex gap="xs">
								<Badge component="span" h="30px" radius="xs" variant="light" color="gray">
									<Text lineClamp={1} tt="capitalize">
										Version {props.version || "-"}
									</Text>
								</Badge>
								{props.adapterBadge}
							</Flex>
						</Flex>
					</Flex>
				</Card.Section>
				<Card.Section px="xs">
					<Text c="dimmed" mt="xs" lineClamp={2} className="cursor-pointer" ref={ref}>
						{props.description || "-"}
					</Text>
				</Card.Section>
			</Card>
		</MotionDiv>
	);
}
