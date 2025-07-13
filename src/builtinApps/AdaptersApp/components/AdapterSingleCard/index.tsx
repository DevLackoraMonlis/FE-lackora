import { ActionIcon, Badge, Card, Flex, Image, Menu, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconDotsVertical, IconRefresh, IconTrash } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";

const MotionDiv = motion.div;

type Props = {
	cardIcon?: string | null;
	tagIcon: ReactNode;
	adapterType: string;
	name: string;
	version: number;
	description?: string | null;
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
				h="200px"
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
				h="200px"
				shadow="xs"
				radius="sm"
				bg="gray.2"
				bd="2px solid gray.2"
				style={{ display: isFlipped ? "none" : "block" }}
			>
				<Card.Section inheritPadding p="xs">
					<Flex justify="space-between" align="start">
						<Card w={50} h={50} variant="light" p="xs" shadow="none">
							<Image w={30} h={30} radius="md" src={props.cardIcon} />
						</Card>
						<Flex align="center">
							<Badge component="span" h="35px" radius="xs" variant="light" rightSection={props.tagIcon}>
								{props.adapterType || "-"}
							</Badge>
							<Menu withinPortal position="bottom-end" shadow="sm">
								<Menu.Target>
									<ActionIcon variant="transparent" color="gray">
										<IconDotsVertical size={30} />
									</ActionIcon>
								</Menu.Target>
								<Menu.Dropdown>
									<Menu.Item leftSection={<IconRefresh size={15} />}>Update Adapter</Menu.Item>
									<Menu.Item leftSection={<IconTrash size={15} />} color="red">
										Delete
									</Menu.Item>
								</Menu.Dropdown>
							</Menu>
						</Flex>
					</Flex>
				</Card.Section>
				<Card.Section p="xs">
					<Text fw="bold" fz="h5" lineClamp={1}>
						{props.name || "-"}
					</Text>
					<Text lineClamp={1}>Version {props.version || "-"}</Text>
					<Text c="dimmed" mt="xs" lineClamp={2} className="cursor-pointer" ref={ref}>
						{props.description || "-"}
					</Text>
				</Card.Section>
			</Card>
		</MotionDiv>
	);
}
