import type { CyberAssetDetailOverviewProps } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Flex, Text } from "@mantine/core";

type Props = {
	configurationItemsCount?: CyberAssetDetailOverviewProps["configurationItemsCount"];
};

export default function CyberAssetDetailOverviewConfigurationItems(props: Props) {
	return (
		<Flex align={"center"} gap={"2xs"} p={"sm"}>
			<Text fw={"bolder"} fz={"xl"}>
				{props.configurationItemsCount || 0}
			</Text>
			<Text mt={"2xs"} c={"gray.6"}>
				total items
			</Text>
		</Flex>
	);
}
