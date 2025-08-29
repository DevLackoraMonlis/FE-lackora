import { Card, Flex, Grid, Image, Menu, Text } from "@mantine/core";
import { DEFAULT_THEME, Indicator, RingProgress, ScrollArea } from "@mantine/core";
import { useDebouncedValue, useHover } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { IconDotsVertical, IconEdit, IconToggleRight } from "@tabler/icons-react";

import img from "./login-bg-min.jpg";

const MotionDiv = motion.div;
const { colors } = DEFAULT_THEME;

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

type Props = {
	handleOpenedService: (categoryId: string) => void;
};
export default function ServiceSingleCard(props: Props) {
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
									<Indicator position="middle-start" color={"primary"} />
									<Text fz="xs" fw="bold" c={"primary"}>
										Active
									</Text>
								</Flex>
								<ScrollArea h={180} type="never">
									<Flex direction={"column"} px="md">
										{serviceList.map((item, idx) => {
											return (
												<Flex
													key={item}
													justify={"space-between"}
													align={"center"}
													w="100%"
													opacity={idx ? 1 : 0.3}
													title={idx ? "" : "Service deactivated"}
												>
													<Flex gap="xs" align={"center"} pt="2px">
														<Indicator
															position="middle-start"
															processing={!!idx}
															withBorder
															color={Object.values(colors)[idx + 2][4]}
														/>
														<Text fz="xs">{item}</Text>
													</Flex>
													<Flex gap="2xs">
														<Text fz={"xs"}>30%</Text>
														<RingProgress
															size={22}
															thickness={3}
															sections={[{ value: 30, color: Object.values(colors)[idx + 2][4] }]}
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
					<Image src={img.src} alt={"img."} height={130} fit="cover" />
				</Card.Section>
				<Flex justify="space-between" align={"center"} mt="md">
					<Flex align={"center"} gap={"md"}>
						<Text fw="bold">Hair Services</Text>
						<Flex gap="xs" align={"center"} pt="2px">
							<Indicator position="middle-start" color={"primary"} />
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
								<Menu.Item leftSection={<IconEdit size={15} />} onClick={() => props.handleOpenedService("")}>
									Edit services
								</Menu.Item>
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
