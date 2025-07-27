import { IconCheck, IconSearch, IconSettings, IconStatusChange, IconWorld } from "@tabler/icons-react";
import { IconDeviceDesktopSearch, IconDeviceLaptop } from "@tabler/icons-react";

import type { WorkflowHandles } from "../../index.types";
import WorkflowAccordion from "../shared/WorkflowAccordion";
import WorkflowPlayerTracking from "../shared/WorkflowPlayerTracking";

export default function WorkflowChangeDetection(props: WorkflowHandles) {
	return (
		<>
			<WorkflowPlayerTracking statusColor="blue" />
			<WorkflowAccordion
				{...props}
				type="WorkflowChangeDetection"
				title="CHANGE DETECTION"
				status="completed"
				description={{ value: 100, label: "3/7 steps | 00:15min", progress: true }}
				icon={<IconStatusChange size={30} />}
				steps={[
					{
						title: "IP discovery from gateways",
						status: "completed",
						icon: <IconCheck size={15} />,
						assets: "540 assets discovered",
						timeInfo: "Start at 08:02 – End at 08:06 | Duration: 4min",
						color: "teal",
					},
					{
						title: "Sync VLANs with new detected IPs",
						status: "completed",
						icon: <IconCheck size={15} />,
						assets: "100 assets detected",
						timeInfo: "Start at 08:06 – End at 08:10 | Duration: 4min",
						color: "teal",
					},
					{
						title: "Port detection (None Credential)",
						status: "inprogress",
						icon: <IconSearch size={15} />,
						progress: { value: 25, label: "100/400 ports | 00:08min" },
						timeInfo: "Start at 08:02",
						color: "blue",
					},
					{
						title: "Detect web services (None Credential)",
						status: "idle",
						icon: <IconWorld size={15} />,
						description:
							"Description about this step, show before running\nYou’ve created new branch fix - notifications from master",
					},
					{
						title: "Detect systems' vendors based on MAC address (None Credential)",
						status: "idle",
						icon: <IconDeviceLaptop size={15} />,
						description:
							"Description about this step, show before running\nYou’ve created new branch fix - notifications from master",
					},
					{
						title: "Detect SIP Phones models (None Credential)",
						status: "idle",
						icon: <IconSettings size={15} />,
						description:
							"Description about this step, show before running\nYou’ve created new branch fix - notifications from master",
					},
					{
						title: "Windows hostname & domain detection (None Credential)",
						status: "idle",
						icon: <IconDeviceDesktopSearch size={15} />,
						description:
							"Description about this step, show before running\nYou’ve created new branch fix - notifications from master",
					},
				]}
			/>
		</>
	);
}
