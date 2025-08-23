import { Card, Flex, Grid, Image, Indicator, Menu, RingProgress, ScrollArea, Text } from "@mantine/core";
import { useDebouncedValue, useHover } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { IconDotsVertical, IconEdit, IconToggleRight } from "@tabler/icons-react";

import img from "./login-bg-min.png";
const MotionDiv = motion.div;

// type Props = {
//   serviceIconPath?: string | null;
//   serviceBadge: ReactNode;
//   serviceType: string;
//   name: string;
//   version: number;
//   description?: string | null;
//   onUpdateService: VoidFunction;
//   onDeleteService: VoidFunction;
// };

const serviceList = [
	"Pedicure",
	"Eyebrows",
	"Eyelashes",
	"Cosmetology",
	"Waxing",
	"Sugaring",
	"Massage",
	"Daytime Makeup",
	"Permanent Makeup",
	"Laser",
	"Manicure",
	"Hair Cut",
];
export default function ServiceSingleCard() {
	const [isFlipped, setIsFlip] = useState(false);
	const { hovered, ref } = useHover();
	const { hovered: hDescription, ref: refDescription } = useHover();
	const [debouncedHovered] = useDebouncedValue(hovered, 500);
	const [debouncedDescription] = useDebouncedValue(hDescription, 500);

	useEffect(() => {
		if (debouncedHovered && !debouncedDescription) {
			setIsFlip(true);
		} else if (!debouncedDescription) {
			setIsFlip(false);
		}
	}, [debouncedHovered, debouncedDescription]);

	useEffect(() => {
		setIsFlip(true);
		setTimeout(() => {
			setIsFlip(false);
		}, 2000);
	}, []);

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
				h="240px"
				ref={refDescription}
				style={{ display: !isFlipped ? "none" : "block" }}
				bd="2px dotted primarySecondary"
			>
				<Card.Section p="xs" style={{ overflowY: "auto", transform: "scaleX(-1)" }}>
					<Grid>
						<Grid.Col span={6}>
							<Flex gap={"sm"} direction={"column"}>
								<Flex gap="xs" align={"center"} pt="2px">
									<Text fw="bold">Hair Services</Text>
									<Indicator position="middle-start" processing color={"primary"} />
									<Text fz="xs" fw="bold" c={"primary"}>
										Active
									</Text>
								</Flex>
								<ScrollArea h={180} type="never">
									<Flex direction={"column"} px="md">
										{serviceList.map((item) => {
											return (
												<Flex key={item} justify={"space-between"} align={"center"} w="100%">
													<Flex gap="xs" align={"center"} pt="2px">
														<Indicator
															position="middle-start"
															processing
															withBorder
															color="primarySecondary"
														/>
														<Text fz="xs" c={"primarySecondary"}>
															{item}
														</Text>
													</Flex>
													<Flex gap="2xs">
														<Text fz={"xs"}>30%</Text>
														<RingProgress
															size={22}
															thickness={3}
															sections={[{ value: 30, color: "primarySecondary" }]}
														/>
													</Flex>
												</Flex>
											);
										})}
									</Flex>
								</ScrollArea>
							</Flex>
						</Grid.Col>
						<Grid.Col span={6}>
							<RingProgress
								roundCaps
								thickness={6}
								size={220}
								sections={[{ value: 30, color: "primary" }]}
								label={
									<Flex direction={"column"}>
										<Text ta="center" fz="lg">
											30%
										</Text>
										<Text ta="center" fz="xs" c="dimmed">
											Request
										</Text>
									</Flex>
								}
							/>
						</Grid.Col>
					</Grid>
				</Card.Section>
			</Card>
			{/* FrontCard */}
			<Card
				h="240px"
				style={{ display: isFlipped ? "none" : "block" }}
				withBorder
				shadow="sm"
				bd="2px dotted primary"
			>
				<Card.Section>
					<Image src={img.src} alt="Running challenge" height={120} fit="fill" />
				</Card.Section>
				<Flex justify="space-between" align={"center"} mt="md">
					<Flex align={"center"} gap={"md"}>
						<Text fw="bold">Hair Services</Text>
						<Flex gap="xs" align={"center"} pt="2px">
							<Indicator position="middle-start" processing color={"primary"} />
							<Text fz="xs" fw="bold" c={"primary"}>
								Active
							</Text>
						</Flex>
					</Flex>
					<Flex gap="sm">
						<Text>30% request</Text>
						<RingProgress size={22} thickness={3} sections={[{ value: 30, color: "primary" }]} />
						<Menu trigger="click-hover">
							<Menu.Target>
								<IconDotsVertical size={20} />
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item leftSection={<IconToggleRight size={15} />}>Change status</Menu.Item>
								<Menu.Item leftSection={<IconEdit size={15} />}>Edit services</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Flex>
				</Flex>
				<Text mt="sm" mb="md" c="dimmed" fz="xs" ref={ref} className="cursor-alias">
					Hair Service, It includes 10 services, which together account for 30% of salon requests.
				</Text>
			</Card>
		</MotionDiv>
	);
}
