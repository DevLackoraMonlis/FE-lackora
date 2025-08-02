import { getCyberAssetOsTypeBadge } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.helper";
import type { CyberAssetDetailOverviewProps } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Flex, Text } from "@mantine/core";

type Props = {
	osType: CyberAssetDetailOverviewProps["osType"];
	osName?: CyberAssetDetailOverviewProps["osName"];
};

export default function CyberAssetDetailOverviewOperatingSystem(props: Props) {
	return (
		<Flex align={"center"} gap={"2xs"} p={"xs"}>
			{getCyberAssetOsTypeBadge({
				type: props.osType,
				size: 35,
				customType: (
					<Text maw={"100%"} lineClamp={2} fz={"sm"} fw={"bolder"}>
						{props.osName}
					</Text>
				),
			})}
		</Flex>
	);
}
