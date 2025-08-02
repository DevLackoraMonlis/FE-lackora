import type { CyberAssetDetailOverviewProps } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Flex, Text } from "@mantine/core";

type Props = {
	cpu?: CyberAssetDetailOverviewProps["cpu"];
};

const Item = (props: {
	label: string;
	value: string | number;
}) => {
	return (
		<Flex align={"center"} justify={"center"} gap={"2xs"} w={"100%"} bg={"white"} h={"100%"} p={"sm"}>
			<Text fw={"bolder"} fz={"xl"}>
				{props.value}
			</Text>
			<Text mt={"2xs"} c={"gray.6"}>
				{props.label}
			</Text>
		</Flex>
	);
};

export default function CyberAssetDetailOverviewCPU(props: Props) {
	return (
		<Flex bg={"gray.1"} gap={"xs"} w={"100%"} h={"100%"}>
			<Item label={"cores"} value={props.cpu?.cores || 0} />
			<Item label={"processors"} value={props.cpu?.processors || 0} />
		</Flex>
	);
}
