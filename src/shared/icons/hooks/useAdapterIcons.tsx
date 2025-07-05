import { ActionIcon, type ActionIconProps } from "@mantine/core";
import {
	IconBox,
	IconBriefcase,
	IconDevicesSearch,
	IconHeartRateMonitor,
	IconSearch,
} from "@tabler/icons-react";
import type { ReactNode } from "react";
import {
	CIconAdapterAws,
	CIconAdapterAzure,
	CIconAdapterCisco,
	CIconAdapterHp,
	CIconAdapterJuniper,
	CIconAdapterNmap,
	CIconAdapterSccm,
	CIconAdapterServiceNow,
	CIconAdapterVCenter,
} from "../component/adapters";

const adaptersIcons = {
	aws: CIconAdapterAws,
	azure: CIconAdapterAzure,
	cisco: CIconAdapterCisco,
	hp: CIconAdapterHp,
	juniper: CIconAdapterJuniper,
	nmap: CIconAdapterNmap,
	sccm: CIconAdapterSccm,
	service: CIconAdapterServiceNow,
	vcenter: CIconAdapterVCenter,
	monitor: IconHeartRateMonitor,
	discovery: IconSearch,
	inventory: IconBox,
	management: IconBriefcase,
	none: IconDevicesSearch,
};

const adaptersIconsKeys = Object.keys(adaptersIcons);

export const useAdapterAndVendorIcons = () => {
	const getAdapterAndVendorIcon = (
		iconName: string,
		actionIconProps?: ActionIconProps & { size?: number },
	): ReactNode => {
		const findIconKey = adaptersIconsKeys.find((key) => iconName?.toLowerCase().includes(key)) || "none";
		const Icon = adaptersIcons[findIconKey as keyof typeof adaptersIcons];
		return (
			<ActionIcon
				variant="transparent"
				size="xl"
				component="span"
				aria-label={iconName}
				{...(actionIconProps || {})}
			>
				<Icon width={actionIconProps?.size} height={actionIconProps?.size} />
			</ActionIcon>
		);
	};

	return { getAdapterAndVendorIcon };
};
