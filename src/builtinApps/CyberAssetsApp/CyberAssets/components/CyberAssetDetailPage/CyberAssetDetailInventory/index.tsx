import { useCyberAssetDynamicStores } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.hooks";
import type {
	CyberAssetDetailInventoryProps,
	CyberAssetDetailInventoryType,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { useGetInventoryTypes } from "@/http/generated/inventory-management";
import { Box, Flex, SegmentedControl } from "@mantine/core";
import { useEffect, useState } from "react";
import classes from "./index.module.css";

export default function CyberAssetDetailInventory(props: CyberAssetDetailInventoryProps) {
	const [selectedType, setSelectedType] = useState<string | undefined>();

	const getAssetOverviewSecurityDataQuery = useGetInventoryTypes({
		query: {
			enabled: !!props.id,
			select: (response) => {
				const dataTypes: CyberAssetDetailInventoryType[] = response.data.map((item) => {
					const newDataType: CyberAssetDetailInventoryType = {
						type: {
							label: item.display_name,
							value: item.name,
						},
						defaultItem: props.defaultType === item.name ? props.defaultItem : undefined,
						items: item.types?.map((type) => ({ label: type.display_name, value: type.name })) || [],
					};

					return newDataType;
				});
				return {
					dataTypes,
				};
			},
		},
	});

	const dynamicStores = useCyberAssetDynamicStores(
		getAssetOverviewSecurityDataQuery.data?.dataTypes || [],
		props.id,
	);

	useEffect(() => {
		if (getAssetOverviewSecurityDataQuery.data?.dataTypes.length && !selectedType) {
			setSelectedType(props.defaultType || getAssetOverviewSecurityDataQuery.data?.dataTypes[0].type.value);
		}
	}, [getAssetOverviewSecurityDataQuery.data?.dataTypes, props.defaultType]);

	return (
		<Box p={"sm"} w={"100%"}>
			<Flex align={"center"} justify={"center"} w={"100%"}>
				<SegmentedControl
					size={"xs"}
					value={selectedType}
					onChange={setSelectedType}
					data={getAssetOverviewSecurityDataQuery.data?.dataTypes.map((item) => item.type) || []}
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
