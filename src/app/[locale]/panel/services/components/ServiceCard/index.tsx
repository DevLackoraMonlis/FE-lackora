import { Card, Flex, Group, Image, RingProgress, Text, useMantineTheme } from "@mantine/core";
import { useDebouncedValue, useHover } from "@mantine/hooks";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import classes from "./index.module.css";
import classesBack from "./index.module.css";

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

const stats = [
	{ title: "Distance", value: "27.4 km" },
	{ title: "Avg. speed", value: "9.6 km/h" },
	{ title: "Score", value: "88/100" },
];

const stateBack = [
	{ value: 447, label: "Remaining" },
	{ value: 76, label: "In progress" },
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

	const items = stats.map((stat) => (
		<div key={stat.title}>
			<Text size="xs" c="dimmed">
				{stat.title}
			</Text>
			<Text fw={500} size="sm">
				{stat.value}
			</Text>
		</div>
	));

	const theme = useMantineTheme();
	const completed = 1887;
	const total = 2334;
	const itemsBack = stateBack.map((stat) => (
		<div key={stat.label}>
			<Text className={classes.label}>{stat.value}</Text>
			<Text size="xs" c="dimmed">
				{stat.label}
			</Text>
		</div>
	));

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
				h="268px"
				ref={refDescription}
				style={{ display: !isFlipped ? "none" : "block" }}
				bd="2px dotted primarySecondary"
			>
				<Card.Section p="xs" style={{ overflowY: "auto", transform: "scaleX(-1)" }}>
					<Flex className={classesBack.inner} justify={"space-between"}>
						<div>
							<Text fz="xl" className={classesBack.label}>
								Project tasks
							</Text>
							<div>
								<Text className={classesBack.lead} mt={30}>
									1887
								</Text>
								<Text fz="xs" c="dimmed">
									Completed
								</Text>
							</div>
							<Group mt="lg">{itemsBack}</Group>
						</div>
						<div className={classesBack.ring}>
							<RingProgress
								roundCaps
								thickness={6}
								size={200}
								sections={[{ value: (completed / total) * 100, color: theme.primaryColor }]}
								label={
									<div>
										<Text ta="center" fz="lg" className={classesBack.label}>
											{((completed / total) * 100).toFixed(0)}%
										</Text>
										<Text ta="center" fz="xs" c="dimmed">
											Completed
										</Text>
									</div>
								}
							/>
						</div>
					</Flex>
				</Card.Section>
			</Card>
			{/* FrontCard */}
			<Card
				h="268px"
				style={{ display: isFlipped ? "none" : "block" }}
				withBorder
				shadow="sm"
				bd="2px dotted primary"
			>
				<Card.Section>
					<Image src="./login-bg-min.png" alt="Running challenge" height={100} />
				</Card.Section>
				<Group justify="space-between" mt="lg">
					<Text className={classes.title}>Running challenge</Text>
					<Group gap={5}>
						<Text fz="xs" c="dimmed">
							80% completed
						</Text>
						<RingProgress size={18} thickness={2} sections={[{ value: 80, color: "blue" }]} />
					</Group>
				</Group>
				<Text mt="sm" mb="md" c="dimmed" fz="xs" ref={ref}>
					56 km this month • 17% improvement compared to last month • 443 place in global scoreboard
				</Text>
				<Card.Section className={classes.footer}>{items}</Card.Section>
			</Card>
		</MotionDiv>
	);
}
