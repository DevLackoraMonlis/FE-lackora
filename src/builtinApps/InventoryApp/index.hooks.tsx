import {
	IconBuildingBroadcastTower,
	IconCpu,
	IconDevices2,
	IconTableOptions,
	IconUsers,
} from "@tabler/icons-react";
import { type ReactNode, useCallback } from "react";

export const useGetInventoryTablesIcon = () => {
	const getTableIcon = useCallback<(name: string, color: string) => ReactNode>(
		(name: string, color: string) => {
			const iconMap: Record<string, ReactNode> = {
				process: <IconTableOptions size={20} color={color} />,
				open_ports: <IconUsers size={20} color={color} />,
				service_process_name: <IconTableOptions size={20} color={color} />,
				schedule_task: <IconBuildingBroadcastTower size={20} color={color} />,
				startup_command: <IconCpu size={20} color={color} />,
				open_port: <IconUsers size={20} color={color} />,
				ip4_route_table: <IconDevices2 size={20} color={color} />,
				network_adapter: <IconDevices2 size={20} color={color} />,
				users: <IconCpu size={20} color={color} />,
				group_membership: <IconCpu size={20} color={color} />,
				system_drivers: <IconCpu size={20} color={color} />,
				services: <IconCpu size={20} color={color} />,
				installed_application: <IconCpu size={20} color={color} />,
				printer: <IconCpu size={20} color={color} />,
				usb_device: <IconCpu size={20} color={color} />,
				disk_drive: <IconCpu size={20} color={color} />,
				bios: <IconBuildingBroadcastTower size={20} color={color} />,
				physical_memory: <IconCpu size={20} color={color} />,
				processor: <IconCpu size={20} color={color} />,
				quick_fix_engineering: <IconCpu size={20} color={color} />,
				disk_partition: <IconCpu size={20} color={color} />,
				operating_system: <IconCpu size={20} color={color} />,
				computer_system: <IconCpu size={20} color={color} />,
			};

			return iconMap[name];
		},
		[],
	);

	return {
		getTableIcon,
	};
};
