import { IconMaximizeOff } from "@tabler/icons-react";
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

const vendorIcons = {
	aws: CIconAdapterAws,
	azure: CIconAdapterAzure,

	cisco: CIconAdapterCisco,
	hp: CIconAdapterHp,
	juniper: CIconAdapterJuniper,
	nmap: CIconAdapterNmap,
	sccm: CIconAdapterSccm,
	service: CIconAdapterServiceNow,
	vcenter: CIconAdapterVCenter,
	mikrotik: CIconAdapterMikrotik,
	none: IconMaximizeOff,
};

const vendorIconsKeys = Object.keys(vendorIcons);

export const useVendorIcons = () => {
	const getVendorIcon = (iconName: string, iconProps?: { size?: number; color?: string }): ReactNode => {
		const findIconKey = vendorIconsKeys.find((key) => iconName?.toLowerCase().includes(key)) || "none";
		const Icon = vendorIcons[findIconKey as keyof typeof vendorIcons];
		return <Icon width={iconProps?.size} height={iconProps?.size} color={iconProps?.color} />;
	};

	return { getVendorIcon };
};
