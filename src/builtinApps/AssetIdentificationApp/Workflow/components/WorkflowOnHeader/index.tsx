import { Avatar, Badge, Flex, Loader, Text, Transition } from "@mantine/core";
import { ActionIcon, RingProgress, getGradient, useMantineTheme } from "@mantine/core";
import { useHover, useInterval } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { useAppRedirect } from "@/shared/hooks/useAppRedirect";
import { WORKFLOW_REDIRECT_PATH, WORKFLOW_REFETCH_INTERVAL_HEADER } from "../../index.constants";
import { calculatePendingScheduledScan, getDifferenceDateTime, getWorkflowStatus } from "../../index.helper";
import { useWorkflow } from "../../index.hooks";
import { RingLoader, WorkflowLoader, WorkflowPending } from "./components/WorkflowLoader";

const WorkflowOnHeader = () => {
	const theme = useMantineTheme();
	const { hovered, ref } = useHover();
	const { onOpenApp } = useAppRedirect();
	const onRedirect = () => onOpenApp(WORKFLOW_REDIRECT_PATH);
	const { workflows, isLoading } = useWorkflow(WORKFLOW_REFETCH_INTERVAL_HEADER);
	const message = workflows?.data?.message || workflows?.data?.description || "Unhandled error message!";
	const scanId = workflows?.data?.scan_id || 0;
	const nextScan = workflows?.data?.next_runtime || "";
	const estimatedTime = workflows?.data?.estimate_time || "";
	const status = isLoading ? "" : workflows?.data?.status;
	const statusParams = getWorkflowStatus(status);

	const [timer, setTimer] = useState<string>("loading...");
	const interval = useInterval(() => {
		const { getDifference } = getDifferenceDateTime({
			date: status === "in_progress" ? estimatedTime : nextScan,
		});
		setTimer(getDifference);
	}, 1000);
	useEffect(() => {
		if (nextScan && (status === "completed" || status === "in_progress")) {
			interval.start();
		}
		return interval.stop;
	}, [nextScan]);

	switch (status) {
		case "completed": {
			const Icon = statusParams.icon;
			return (
				<Flex align="center">
					<Transition mounted={hovered} transition="fade-left" duration={500} timingFunction="ease">
						{(styles) => (
							<Flex align="center" gap="3xs" style={styles}>
								<Badge variant="light" color="gray.4" tt="capitalize" p="md">
									<Flex align="center" gap="2xs">
										<Text fz="xs">Next scan in</Text>
										<Text fz="xs" w="55px">
											{timer}
										</Text>
									</Flex>
								</Badge>
								<Badge variant="light" color={statusParams.bg} p="md" tt="capitalize">
									<Flex align="center" gap="2xs" className="cursor-pointer">
										{Icon && <Icon size={15} />}
										<Text fz="xs">{`Scan #${scanId} is Completed`}</Text>
									</Flex>
								</Badge>
							</Flex>
						)}
					</Transition>
					<Avatar.Group ref={ref} m={0} onClick={onRedirect} className="cursor-pointer">
						<Avatar size={22} bg="transparent" bd="none" m={0} p={0} mr={5}>
							<RingProgress
								size={25}
								thickness={3}
								roundCaps
								sections={[{ value: 60, color: "primary.3" }]}
							/>
						</Avatar>
						<Avatar size={13} bd="none" bg="transparent" mt={8}>
							<ActionIcon
								color={getGradient({ deg: 180, from: "primary.5", to: statusParams.color }, theme)}
								variant="filled"
								component="div"
							>
								<IconCheck size={9} strokeWidth={4} />
							</ActionIcon>
						</Avatar>
					</Avatar.Group>
				</Flex>
			);
		}
		case "idle":
			return "";
		case "pending": {
			return (
				<Flex gap="2xs" align="center">
					<Transition mounted={hovered} transition="fade-left" duration={500} timingFunction="ease">
						{(styles) => (
							<Flex align="center" gap="2xs" style={styles}>
								<Badge variant="light" color={statusParams.c} p="md" tt="capitalize">
									<Flex align="center" gap="xs" className="cursor-pointer">
										<Text fz="xs">{calculatePendingScheduledScan(nextScan)}</Text>
									</Flex>
								</Badge>
							</Flex>
						)}
					</Transition>
					<Loader
						loaders={{ custom: WorkflowPending }}
						type="custom"
						c={statusParams.c}
						size={22}
						ref={ref}
					/>
				</Flex>
			);
		}
		case "in_progress": {
			return (
				<Flex gap="2xs" align="center">
					<Transition mounted={hovered} transition="fade-left" duration={500} timingFunction="ease">
						{(styles) => (
							<Flex align="center" gap="2xs" style={styles}>
								<Badge variant="light" color={statusParams.bg} p="md" tt="capitalize">
									<Flex align="center" gap="2xs" className="cursor-pointer">
										<Text fz="xs">{`Scan #${scanId} is ${statusParams.label}.... `}</Text>
									</Flex>
								</Badge>
								<Badge variant="light" color="gray.4" tt="none" p="md">
									<Flex align="center" gap="xs">
										<Text fz="xs" w="55px">
											~{timer}
										</Text>
										<Text fz="xs">to complete scan</Text>
									</Flex>
								</Badge>
							</Flex>
						)}
					</Transition>
					<Avatar.Group ref={ref} m={0} onClick={onRedirect} className="cursor-pointer">
						<Avatar size={30} bd="none" bg="transparent" mt="3xs">
							<Loader loaders={{ custom: RingLoader }} type="custom" color={statusParams.bg} size={30} />
						</Avatar>
					</Avatar.Group>
				</Flex>
			);
		}
		case "partial_success":
		case "failed": {
			const Icon = statusParams.icon;
			return (
				<Flex gap="2xs" align="center">
					<Transition mounted={hovered} transition="fade-left" duration={500} timingFunction="ease">
						{(styles) => (
							<Flex align="center" gap="2xs" style={styles}>
								<Badge variant="light" color={statusParams.color} p="md" tt="capitalize">
									<Text className="cursor-pointer" fz="xs">{`Scan #${scanId} is ${statusParams.label}`}</Text>
								</Badge>
								{message && (
									<Badge variant="light" color={statusParams.color} p="md" tt="capitalize">
										<Text className="cursor-pointer" fz="xs">
											{message}
										</Text>
									</Badge>
								)}
							</Flex>
						)}
					</Transition>
					<Avatar.Group ref={ref} m={0} onClick={onRedirect} className="cursor-pointer">
						<Avatar size={30} bd="none" bg="transparent" color={statusParams.color} mt="3xs">
							{Icon && <Icon size={22} />}
						</Avatar>
					</Avatar.Group>
				</Flex>
			);
		}
		default:
			return (
				<Flex gap="2xs" align="center">
					<Transition mounted={hovered} transition="fade-left" duration={500} timingFunction="ease">
						{(styles) => (
							<Flex align="center" gap="2xs" style={styles}>
								<Badge variant="light" color="primary.2" tt="capitalize" p="md">
									<Flex align="center" gap="2xs">
										<Text fz="xs">check workflow status ...</Text>
									</Flex>
								</Badge>
							</Flex>
						)}
					</Transition>
					<Loader
						loaders={{ custom: WorkflowLoader }}
						type="custom"
						color="primary.2"
						size={22}
						ref={ref}
						onClick={onRedirect}
						className="cursor-pointer"
					/>
				</Flex>
			);
	}
};

export default WorkflowOnHeader;
