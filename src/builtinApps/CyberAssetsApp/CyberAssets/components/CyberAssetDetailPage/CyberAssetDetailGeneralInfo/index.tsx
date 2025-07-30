import type {
	CyberAssetDetailGeneralInfoCardProps,
	CyberAssetDetailGeneralInfoProps,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Button, Card, Flex, Grid, Indicator, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconPencil, IconPlugConnected } from "@tabler/icons-react";
import { Fragment } from "react";

const CyberAssetDetailGeneralInfoCard = (props: CyberAssetDetailGeneralInfoCardProps) => {
	return (
		<Card w={"100%"}>
			<Card.Section withBorder h={32}>
				<Flex align={"center"} gap={"xs"} h={"100%"} pl={"xs"}>
					{props.icon}
					<Text fw={"bold"} c={"blue"}>
						{props.title}
					</Text>
				</Flex>
			</Card.Section>
			<Card.Section>
				<Grid gutter={0} bg={"gray.2"} p={"xs"} align={"center"}>
					{props.items.map((item) => (
						<Fragment key={item.label}>
							<Grid.Col span={5}>
								<Text fw={"bold"}>{item.label}</Text>
							</Grid.Col>
							<Grid.Col span={7}>{item.value}</Grid.Col>
						</Fragment>
					))}
				</Grid>
			</Card.Section>
		</Card>
	);
};

export default function CyberAssetDetailGeneralInfo(props: CyberAssetDetailGeneralInfoProps) {
	const { height } = useViewportSize();
	return (
		<Flex direction={"column"} align={"center"} h={height} bg={"gray.2"} gap={"xs"} p={"sm"}>
			<Flex direction={"column"} gap={"xs"} w={"100%"}>
				<Flex gap={"xs"} align={"center"}>
					<Indicator color={props.indicatorColor} processing>
						<Flex bg={"white"} justify={"center"} align={"center"} w={64} h={64}>
							{props.icon}
						</Flex>
					</Indicator>
					<Flex direction={"column"} justify={"center"}>
						<Text fw={"bold"} fz={"md"}>
							{props.title}
						</Text>
						<Text c={"gray.6"} fz={"xs"}>
							{props.subTitle}
						</Text>
						<Text c={"green.6"} fz={"xs"}>
							{props.upTimeTitle}
						</Text>
					</Flex>
				</Flex>
				<Flex gap={"xs"}>
					<Button
						w={"100%"}
						size={"xs"}
						onClick={props.onEdit}
						leftSection={<IconPencil size={12} />}
						variant={"default"}
					>
						Edit
					</Button>
					<Button
						w={"100%"}
						size={"xs"}
						onClick={props.onCheckConnection}
						leftSection={<IconPlugConnected size={12} />}
						variant={"default"}
					>
						Check Connection
					</Button>
				</Flex>
			</Flex>
			{props.items.map((item) => (
				<CyberAssetDetailGeneralInfoCard key={item.title} {...item} />
			))}
		</Flex>
	);
}
