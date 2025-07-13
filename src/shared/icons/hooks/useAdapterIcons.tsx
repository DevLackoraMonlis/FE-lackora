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

const adaptersIcons = {
	monitor: IconHeartRateMonitor,
	discovery: IconSearch,
	inventory: IconBox,
	management: IconBriefcase,
	web: IconBrowserCheck,
	port: IconCircleDot,
	none: IconMaximizeOff,
};

const adaptersIconsKeys = Object.keys(adaptersIcons);

export const useAdapterIcons = () => {
	const getAdapterIcon = (iconName: string, iconProps?: { size?: number; color?: string }): ReactNode => {
		const findIconKey = adaptersIconsKeys.find((key) => iconName?.toLowerCase().includes(key)) || "none";
		const Icon = adaptersIcons[findIconKey as keyof typeof adaptersIcons];
		return <Icon width={iconProps?.size} height={iconProps?.size} color={iconProps?.color} />;
	};

	return { getAdapterIcon };
};
