import type { CyberAssetDetailOverviewProps } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Badge, Flex, Pill, Text, Tooltip } from "@mantine/core";

type Props = {
	network?: CyberAssetDetailOverviewProps["network"];
};

export default function CyberAssetDetailOverviewNetwork(props: Props) {
	const openPorts = props.network?.openPorts || [];
	const maxDisplay = 6;

	return (
		<Flex direction={"column"} gap={"2xs"} w={"100%"} p={"sm"}>
			<Flex gap={"xs"} align={"center"}>
				<Text fw={"bolder"} fz={"xl"}>
					{props.network?.ip || ""}
				</Text>
				<Badge color={"blue"} variant={"light"}>{`${props.network?.type || ""} IP`}</Badge>
			</Flex>
			<Flex gap={"2xs"} align={"center"}>
				<Text c={"gray.6"}>Open Ports:</Text>
				<Flex h={32} gap={"xs"} align={"center"}>
					{openPorts.slice(0, maxDisplay).map((item) => (
						<Pill tt={"uppercase"} bg={"gray.2"} size={"xs"} key={item.name}>
							{item.name}
						</Pill>
					))}

					{openPorts.length > maxDisplay && (
						<Tooltip
							label={
								<Flex direction={"column"}>
									{openPorts.slice(maxDisplay).map((item) => (
										<Text tt={"uppercase"} key={`ip-address-${item}`} fz={"xs"}>
											{item.name}
										</Text>
									))}
								</Flex>
							}
						>
							<Pill tt={"uppercase"}>+{openPorts.length - maxDisplay} more</Pill>
						</Tooltip>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
}
