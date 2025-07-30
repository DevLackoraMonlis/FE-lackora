import { getCyberAssetServiceStatusBadge } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.helper";
import type {
	CyberAssetDetailOverviewProps,
	CyberAssetDetailOverviewServiceStartType,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Badge, Divider, Flex, Grid, RingProgress, Text } from "@mantine/core";
import take from "lodash/take";
import { Fragment } from "react";

type Props = {
	topServices: CyberAssetDetailOverviewProps["topServices"];
	serviceStartTypes: CyberAssetDetailOverviewProps["serviceStartTypes"];
};

export default function CyberAssetDetailOverviewTopServices(props: Props) {
	const startServiceColorMap: Record<CyberAssetDetailOverviewServiceStartType, string> = {
		Disabled: "#495057",
		Automatic: "#228BE6",
		Manual: "#FAB005",
	};
	return (
		<Grid gutter={"xs"} w={"100%"} bg={"gray.1"}>
			<Grid.Col span={7}>
				<Flex h={"100%"} direction={"column"} bg={"white"} gap={"2xs"} w={"100%"} p={"sm"}>
					{take(props.topServices, 10).map((service, index) => (
						<Fragment key={`${service.name}-${service.status}`}>
							<Flex key={service.name} justify={"space-between"} align={"center"}>
								<Text c={"gray.7"}>{service.name}</Text>
								{getCyberAssetServiceStatusBadge({ type: service.status })}
							</Flex>
							{props.topServices.length - 1 !== index && <Divider />}
						</Fragment>
					))}
				</Flex>
			</Grid.Col>
			<Grid.Col span={5}>
				<Flex
					h={"100%"}
					gap={"2xs"}
					bg={"white"}
					w={"100%"}
					p={"xs"}
					direction={"column"}
					align={"flex-start"}
				>
					<Text fw={500}>Services Start Types</Text>
					<Flex w={"100%"} align={"center"} direction={"column"}>
						<RingProgress
							size={140}
							thickness={12}
							label={
								<Fragment>
									<Text fw={"bolder"} fz={"xl"} ta="center">
										{`${props.serviceStartTypes.total}%`}
									</Text>
									<Text fz={"2xs"} ta="center">{`${props.serviceStartTypes.type} start`}</Text>
								</Fragment>
							}
							sections={Object.entries(props.serviceStartTypes.summary).map(([key, value]) => ({
								value: value,
								color: startServiceColorMap[key as CyberAssetDetailOverviewServiceStartType],
							}))}
						/>
						<Flex direction={"column"}>
							{Object.entries(props.serviceStartTypes.summary).map(([key, value]) => (
								<Badge
									fz={"xs"}
									fw={400}
									key={key}
									color={startServiceColorMap[key as CyberAssetDetailOverviewServiceStartType]}
									variant={"dot"}
									bd={0}
								>
									{`${key} ${value}%`}
								</Badge>
							))}
						</Flex>
					</Flex>
				</Flex>
			</Grid.Col>
		</Grid>
	);
}
