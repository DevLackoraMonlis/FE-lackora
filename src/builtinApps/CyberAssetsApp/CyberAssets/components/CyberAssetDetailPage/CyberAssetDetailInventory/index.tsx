import { useCyberAssetDynamicStores } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.hooks";
import type {
	CyberAssetDetailInventoryProps,
	CyberAssetDetailInventoryType,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Box, Flex, SegmentedControl } from "@mantine/core";
import { useEffect, useState } from "react";
import classes from "./index.module.css";

export default function CyberAssetDetailInventory(_props: CyberAssetDetailInventoryProps) {
	const [selectedType, setSelectedType] = useState<string>("");

	const dataTypes: CyberAssetDetailInventoryType[] = [
		{
			type: "Asset Information",
			items: [
				"Applications",
				"Services",
				"System Drivers",
				"Startup Commands",
				"Patches",
				"Printer Configuration",
			],
		},
		{
			type: "System Details",
			items: [
				"Applications",
				"Services",
				"System Drivers",
				"Startup Commands",
				"Patches",
				"Printer Configuration",
			],
		},
		{
			type: "Hardware",
			items: [
				"Applications",
				"Services",
				"System Drivers",
				"Startup Commands",
				"Patches",
				"Printer Configuration",
			],
		},
		{
			type: "Software",
			items: [
				"Applications",
				"Services",
				"System Drivers",
				"Startup Commands",
				"Patches",
				"Printer Configuration",
			],
		},
		{
			type: "Network",
			items: [
				"Applications",
				"Services",
				"System Drivers",
				"Startup Commands",
				"Patches",
				"Printer Configuration",
			],
		},
		{
			type: "Users",
			items: [
				"Applications",
				"Services",
				"System Drivers",
				"Startup Commands",
				"Patches",
				"Printer Configuration",
			],
		},
	];

	const dynamicStores = useCyberAssetDynamicStores(dataTypes);

	useEffect(() => {
		if (dataTypes.length && !selectedType) {
			setSelectedType(dataTypes[0].type);
		}
	}, [dataTypes]);

	return (
		<Box p={"sm"} w={"100%"}>
			<Flex align={"center"} justify={"center"} w={"100%"}>
				<SegmentedControl
					size={"xs"}
					value={selectedType}
					onChange={setSelectedType}
					data={dataTypes.map((item) => ({ label: item.type, value: item.type }))}
				/>
			</Flex>

			{dynamicStores.storesRef.current.map((item) => {
				return (
					<Box
						h={"100%"}
						className={selectedType !== item.name ? classes.hide : classes.show}
						key={item.name}
					>
						{item.mainPage}
					</Box>
				);
			})}
		</Box>
	);
}
