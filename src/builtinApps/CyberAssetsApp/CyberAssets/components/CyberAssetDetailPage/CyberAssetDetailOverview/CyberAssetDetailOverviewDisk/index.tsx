import type { CyberAssetDetailOverviewProps } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Text } from "@mantine/core";
import millify from "millify";

type Props = {
	disk?: CyberAssetDetailOverviewProps["disk"];
};

export default function CyberAssetDetailOverviewDisk(props: Props) {
	return (
		<Text fw={"bolder"} fz={"xl"} p={"sm"}>
			{`${millify(props.disk || 0, { units: ["B", "KB", "MB", "GB", "TB"], space: true })}`}
		</Text>
	);
}
