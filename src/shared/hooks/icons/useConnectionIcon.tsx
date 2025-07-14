import { IconBuildingBroadcastTower, IconLockAccess, IconWorld } from "@tabler/icons-react";
import type { ReactNode } from "react";

export function useConnectionIcon() {
	const getConnectionIcon = (name: string, size = 24, color = "white") => {
		const iconMap: Record<string, ReactNode> = {
			http_https: <IconWorld width={size} height={size} color={color} />,
			snmp: <IconBuildingBroadcastTower width={size} height={size} color={color} />,
			ssh: <IconLockAccess width={size} height={size} color={color} />,
		};
		return iconMap[name];
	};
	return { getConnectionIcon };
}
