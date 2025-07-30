import type { CyberAssetDetailOverviewProps } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Flex, Text } from "@mantine/core";
import take from "lodash/take";

type Props = {
	applications: CyberAssetDetailOverviewProps["applications"];
};

export default function CyberAssetDetailOverviewApplications(props: Props) {
	return (
		<Flex direction={"column"} gap={"2xs"} w={"100%"} p={"sm"}>
			<Flex gap={"xs"} align={"center"}>
				<Text fw={"bolder"} fz={"xl"}>
					{props.applications.total}
				</Text>
				<Text c={"gray.6"}>total installed applications</Text>
			</Flex>
			<Text fz={"xs"}>Recently Installed Applications</Text>
			{take(props.applications.items, 5).map((item) => (
				<Flex p={"xs"} bg={"gray.1"} key={item.name} justify={"space-between"}>
					<Text fz={"xs"}>{item.name}</Text>
					<Flex align={"center"} gap={"2xs"}>
						<Text c={"gray.6"} fz={"xs"}>
							installed in
						</Text>
						<Text fz={"xs"} fw={"bold"}>
							{item.installDate}
						</Text>
					</Flex>
				</Flex>
			))}
		</Flex>
	);
}
