import { IconCheck, IconSearch, IconSettings, IconWorld } from "@tabler/icons-react";
import { IconDeviceDesktopSearch, IconDeviceLaptop } from "@tabler/icons-react";
import WorkflowAccordion from "../shared/WorkflowAccordion";

export default function WorkflowAssetDiscoveryAccordionItem() {
	return (
		<WorkflowAccordion
			value="assetDiscovery"
			title="ASSET DISCOVERY"
			status="Connected"
			completedCount={3}
			totalDurationMin={15}
			timelineActiveStep={2}
			steps={[
				{
					title: "IP discovery from gateways",
					status: "COMPLETED",
					icon: <IconCheck size={15} />,
					assets: "540 assets discovered",
					timeInfo: "Start at 08:02 – End at 08:06 | Duration: 4min",
					color: "teal",
				},
				{
					title: "Sync VLANs with new detected IPs",
					status: "COMPLETED",
					icon: <IconCheck size={15} />,
					assets: "100 assets detected",
					timeInfo: "Start at 08:06 – End at 08:10 | Duration: 4min",
					color: "teal",
				},
				{
					title: "Port detection (None Credential)",
					status: "INPROGRESS",
					icon: <IconSearch size={15} />,
					progress: { value: 25, label: "100/400 ports | 00:08min" },
					timeInfo: "Start at 08:02",
					color: "blue",
				},
				{
					title: "Detect web services (None Credential)",
					status: "PENDING",
					icon: <IconWorld size={15} />,
					description:
						"Description about this step, show before running\nYou’ve created new branch fix - notifications from master",
				},
				{
					title: "Detect systems' vendors based on MAC address (None Credential)",
					status: "PENDING",
					icon: <IconDeviceLaptop size={15} />,
					description:
						"Description about this step, show before running\nYou’ve created new branch fix - notifications from master",
				},
				{
					title: "Detect SIP Phones models (None Credential)",
					status: "PENDING",
					icon: <IconSettings size={15} />,
					description:
						"Description about this step, show before running\nYou’ve created new branch fix - notifications from master",
				},
				{
					title: "Windows hostname & domain detection (None Credential)",
					status: "PENDING",
					icon: <IconDeviceDesktopSearch size={15} />,
					description:
						"Description about this step, show before running\nYou’ve created new branch fix - notifications from master",
				},
			]}
		/>
	);
}
