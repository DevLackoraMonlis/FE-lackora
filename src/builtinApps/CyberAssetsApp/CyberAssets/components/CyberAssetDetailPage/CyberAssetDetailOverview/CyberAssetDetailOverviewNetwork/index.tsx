import type { CyberAssetDetailOverviewProps } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Badge, Flex, Pill, Text } from "@mantine/core";

type Props = {
	network?: CyberAssetDetailOverviewProps["network"];
};

export default function CyberAssetDetailOverviewNetwork(props: Props) {
	return (
		<Flex direction={"column"} gap={"2xs"} w={"100%"} p={"sm"}>
			<Flex gap={"xs"} align={"center"}>
				<Text fw={"bolder"} fz={"xl"}>
					{props.network?.ip || ""}
				</Text>
				<Badge color={"blue"} variant={"light"}>{`${props.network?.type || ""} IP`}</Badge>
			</Flex>
			<Flex gap={"2xs"}>
				<Text c={"gray.6"}>Open Ports:</Text>
				{props.network?.openPorts.map((port) => (
					<Pill key={`${port.name} (${port.type})`}>{`${port.name} (${port.type})`}</Pill>
				))}
			</Flex>
		</Flex>
	);
}
