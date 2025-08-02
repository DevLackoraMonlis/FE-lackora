import { getCyberAssetChangeIcon } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.helper";
import type {
	CyberAssetDetailOverviewChangeType,
	CyberAssetDetailOverviewProps,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Flex, Pill, Text } from "@mantine/core";

type Props = {
	changes?: CyberAssetDetailOverviewProps["changes"];
};

export default function CyberAssetDetailOverviewChanges(props: Props) {
	return (
		<Flex direction={"column"} gap={"2xs"} w={"100%"} p={"sm"}>
			<Flex gap={"xs"} align={"center"}>
				<Text fw={"bolder"} fz={"xl"}>
					{props.changes?.total}
				</Text>
				<Text c={"gray.6"}>total changes in last scan</Text>
			</Flex>
			<Flex gap={"2xs"}>
				{props.changes?.summary &&
					Object.entries(props.changes.summary).map(([key, value]) => (
						<Pill fz={"xs"} key={key}>
							<Flex align={"center"} gap={"2xs"}>
								{getCyberAssetChangeIcon({ type: key as CyberAssetDetailOverviewChangeType, size: 12 })}
								{key}
								{":"}
								<Text fz={"12"} fw={"bold"}>
									{value}
								</Text>
							</Flex>
						</Pill>
					))}
			</Flex>
		</Flex>
	);
}
