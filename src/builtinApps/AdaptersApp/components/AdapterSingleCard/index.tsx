import { ActionIcon, Badge, Card, Flex, Menu, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconDotsVertical, IconFileZip, IconTrash } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";

const MotionDiv = motion.div;

type Props = {
	cardIcon: ReactNode;
	tagIcon: ReactNode;
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
						AWS EC2 Discovery Adapter
					</Text>
					<Text>version 1.5.4</Text>
					<Text c="dimmed" className="cursor-pointer" ta="justify">
						provides secure, encrypted remote access to Cisco Nexus devices provides secure, encrypted remote
						access to Cisco Nexus devices provides secure, encrypted remote access to Cisco Nexus devices
						provides secure, encrypted remote access to Cisco Nexus devices provides secure, encrypted remote
						access to Cisco Nexus devices provides secure, encrypted remote access to Cisco Nexus devices
						provides secure, encrypted remote access to Cisco Nexus devices provides secure, encrypted remote
						access to Cisco Nexus devices provides secure, encrypted remote access to Cisco Nexus devices
						provides secure, encrypted remote access to Cisco Nexus devices provides secure, encrypted remote
						access to Cisco Nexus devices provides secure, encrypted remote access to Cisco Nexus devices
						provides secure, encrypted remote access to Cisco Nexus devices
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
						<Card variant="light" p="xs" shadow="none">
							{props.cardIcon}
						</Card>
						<Flex align="center">
							<Badge component="span" h="35px" radius="xs" variant="light" rightSection={props.tagIcon}>
								Discovery Adapter
							</Badge>
							<Menu withinPortal position="bottom-end" shadow="sm">
								<Menu.Target>
									<ActionIcon variant="transparent" color="gray">
										<IconDotsVertical size={30} />
									</ActionIcon>
								</Menu.Target>
								<Menu.Dropdown>
									<Menu.Item leftSection={<IconFileZip size={15} />}>Download zip</Menu.Item>
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
						AWS EC2 Discovery Adapter
					</Text>
					<Text lineClamp={1}>version 1.5.4</Text>
					<Text c="dimmed" mt="xs" lineClamp={2} className="cursor-pointer" ref={ref}>
						provides secure, encrypted remote access to Cisco Nexus devices
					</Text>
				</Card.Section>
			</Card>
		</MotionDiv>
	);
}
