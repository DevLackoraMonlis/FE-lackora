import type { CyberAssetDetailOverviewProps } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Text } from "@mantine/core";
import millify from "millify";

type Props = {
	ram?: CyberAssetDetailOverviewProps["ram"];
};

export default function CyberAssetDetailOverviewRAM(props: Props) {
	return (
		<Text fw={"bolder"} fz={"xl"} p={"sm"}>
			{`${millify(props.ram || 0, { units: ["B", "KB", "MB", "GB", "TB"], space: true })}`}
		</Text>
	);
}
