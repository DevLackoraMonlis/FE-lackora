import {
	IconBox,
	IconBriefcase,
	IconBrowserCheck,
	IconCircleDot,
	IconHeartRateMonitor,
	IconMaximizeOff,
	IconSearch,
} from "@tabler/icons-react";
import type { ReactNode } from "react";
import {
	CIconAdapterAws,
	CIconAdapterAzure,
	CIconAdapterCisco,
	CIconAdapterHp,
	CIconAdapterJuniper,
	CIconAdapterMikrotik,
	CIconAdapterNmap,
	CIconAdapterSccm,
	CIconAdapterServiceNow,
	CIconAdapterVCenter,
} from "../components/adapterAndVendor";

const adaptersIcons = {
	aws: CIconAdapterAws,
	azure: CIconAdapterAzure,
	port: IconCircleDot,
	cisco: CIconAdapterCisco,
	hp: CIconAdapterHp,
	juniper: CIconAdapterJuniper,
	web: IconBrowserCheck,
	nmap: CIconAdapterNmap,
	sccm: CIconAdapterSccm,
	service: CIconAdapterServiceNow,
	vcenter: CIconAdapterVCenter,
	monitor: IconHeartRateMonitor,
	discovery: IconSearch,
	inventory: IconBox,
	management: IconBriefcase,
	mikrotik: CIconAdapterMikrotik,
	none: IconMaximizeOff,
};

const adaptersIconsKeys = Object.keys(adaptersIcons);

export const useAdapterAndVendorIcons = () => {
	const getAdapterAndVendorIcon = (
		iconName: string,
		iconProps?: { size?: number; color?: string },
	): ReactNode => {
		const findIconKey = adaptersIconsKeys.find((key) => iconName?.toLowerCase().includes(key)) || "none";
		const Icon = adaptersIcons[findIconKey as keyof typeof adaptersIcons];
		return <Icon width={iconProps?.size} height={iconProps?.size} color={iconProps?.color} />;
	};

	return { getAdapterAndVendorIcon };
};
