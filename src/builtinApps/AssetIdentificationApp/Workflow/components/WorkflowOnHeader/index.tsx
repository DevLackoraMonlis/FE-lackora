import { Badge, Flex, Loader, Text, Tooltip } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { useEffect, useState } from "react";

import { WORKFLOW_REFETCH_INTERVAL_HEADER } from "../../index.constants";
import { calculatePendingScheduledScan, getDifferenceDateTime, getWorkflowStatus } from "../../index.helper";
import { useWorkflow } from "../../index.hooks";
import { WorkflowLoader, WorkflowPending } from "./components/WorkflowLoader";

const WorkflowOnHeader = () => {
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
				<Flex gap="xs" align="center">
					<Badge variant="light" color="gray.4" tt="capitalize" p="md">
						<Flex align="center" gap="2xs">
							<Text fz="xs">{`Next scan: #${scanId + 1} in`}</Text>
							<Text fz="xs" w="55px">
								{timer}
							</Text>
						</Flex>
					</Badge>
					<Badge variant="light" color={statusParams.bg} p="md" tt="capitalize">
						<Flex align="center" gap="2xs">
							{Icon && <Icon size={15} />}
							<Text fz="xs">{`Scan #${scanId} is Completed`}</Text>
						</Flex>
					</Badge>
				</Flex>
			);
		}
		case "idle":
			return "";
		case "pending": {
			return (
				<Badge variant="light" color={statusParams.c} p="md" tt="capitalize">
					<Flex align="center" gap="xs">
						<Loader loaders={{ custom: WorkflowPending }} type="custom" c={statusParams.c} size={15} />
						<Text fz="xs">{calculatePendingScheduledScan(nextScan)}</Text>
					</Flex>
				</Badge>
			);
		}
		case "in_progress": {
			return (
				<Flex gap="xs" align="center">
					<Badge variant="light" color={statusParams.bg} p="md" tt="capitalize">
						<Flex align="center" gap="2xs">
							<Loader loaders={{ custom: WorkflowLoader }} type="custom" color={statusParams.bg} size={15} />
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
			);
		}
		case "partial_success":
		case "failed": {
			const Icon = statusParams.icon;
			return (
				<Flex gap="2xs" align="center">
					<Badge variant="light" color={statusParams.color} p="md" tt="capitalize">
						<Text fz="xs">{`Scan #${scanId} is ${statusParams.label}`}</Text>
					</Badge>
					<Tooltip label={message}>
						<Badge variant="light" color={statusParams.color} p="sm" pt="md">
							{Icon && <Icon size={18} />}
						</Badge>
					</Tooltip>
				</Flex>
			);
		}
		default:
			return (
				<Badge variant="light" color={statusParams.bg} tt="capitalize" p="md">
					<Flex align="center" gap="2xs">
						<Loader loaders={{ custom: WorkflowLoader }} type="custom" color={statusParams.bg} size={15} />
						<Text fz="xs">check workflow status...</Text>
					</Flex>
				</Badge>
			);
	}
};

export default WorkflowOnHeader;
