import {
	Bios1,
	BootConfiguration1,
	ComputerSystem1,
	Diskdrive1,
	InstalledApplications1,
	Ip4RouteTable,
	LogicalDisk1,
	Membership1,
	NetworkAdapter1,
	Openport1,
	OperatingSystem1,
	PhysicalMemory1,
	Printer1,
	Process,
	Processor1,
	QuickFix1,
	ScheduleTask,
	Service11,
	ServiceProcessName1,
	Share1,
	Software1,
	StartupCommand1,
	SystemDrivers1,
	UsbController1,
	UserAccount1,
} from "@/shared/icons/components/inventory";
import { type ReactNode, useCallback } from "react";

export const useGetInventoryTablesIcon = () => {
	const getTableIcon = useCallback<(name: string, color: string) => ReactNode>(
		(name: string, color: string, size = 24) => {
			const iconMap: Record<string, ReactNode> = {
				share: <Share1 width={size} height={size} color={color} />,
				software: <Software1 width={size} height={size} color={color} />,
				process: <Process width={size} height={size} color={color} />,
				service_process_name: <ServiceProcessName1 width={size} height={size} color={color} />,
				scheduled_task: <ScheduleTask width={size} height={size} color={color} />,
				startup_command: <StartupCommand1 width={size} height={size} color={color} />,
				open_port: <Openport1 width={size} height={size} color={color} />,
				ip4_route_table: <Ip4RouteTable width={size} height={size} color={color} />,
				network_adapter: <NetworkAdapter1 width={size} height={size} color={color} />,
				network_adapter_configuration: <NetworkAdapter1 width={size} height={size} color={color} />,
				user_account: <UserAccount1 width={size} height={size} color={color} />,
				group: <Membership1 width={size} height={size} color={color} />,
				group_user: <Membership1 width={size} height={size} color={color} />,
				system_driver: <SystemDrivers1 width={size} height={size} color={color} />,
				service: <Service11 width={size} height={size} color={color} />,
				boot_configuration: <BootConfiguration1 width={size} height={size} color={color} />,
				installed_application: <InstalledApplications1 width={size} height={size} color={color} />,
				printer: <Printer1 width={size} height={size} color={color} />,
				printer_configuration: <Printer1 width={size} height={size} color={color} />,
				usb_controller_devices: <UsbController1 width={size} height={size} color={color} />,
				usb_controller: <UsbController1 width={size} height={size} color={color} />,
				disk_drive: <Diskdrive1 width={size} height={size} color={color} />,
				bios: <Bios1 width={size} height={size} color={color} />,
				physical_memory: <PhysicalMemory1 width={size} height={size} color={color} />,
				processor: <Processor1 width={size} height={size} color={color} />,
				quick_fix_engineering: <QuickFix1 width={size} height={size} color={color} />,
				disk_partition: <LogicalDisk1 width={size} height={size} color={color} />,
				operating_system: <OperatingSystem1 width={size} height={size} color={color} />,
				computer_system: <ComputerSystem1 width={size} height={size} color={color} />,
			};

			return iconMap[name];
		},
		[],
	);

	return {
		getTableIcon,
	};
};
