import type {
	CyberAssetDetailGeneralInfoCardProps,
	CyberAssetDetailGeneralInfoProps,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.types";
import { Button, Card, Flex, Grid, Indicator, Skeleton, Text } from "@mantine/core";
import { IconPencil, IconPlugConnected } from "@tabler/icons-react";
import { Fragment } from "react";
import { v4 } from "uuid";

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
					{props.isLoading
						? Array.from({ length: 8 })
								.fill(0)
								.map((_item) => (
									<Grid.Col key={v4()} span={5} mr={4} mb={4}>
										<Skeleton width={"100%"} h={20} animate />
									</Grid.Col>
								))
						: props.items.map((item) => (
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

export default function CyberAssetDetailGeneralInfo(
	props: CyberAssetDetailGeneralInfoProps & { isLoading: boolean },
) {
	return (
		<Flex direction={"column"} align={"center"} h="100%" bg={"gray.2"} gap={"xs"} p={"sm"}>
			<Flex direction={"column"} gap={"xs"} w={"100%"}>
				<Flex gap={"xs"} align={"center"}>
					{props.isLoading ? (
						<Skeleton h={64} w={64} circle animate />
					) : (
						<Indicator color={props.indicatorColor} processing>
							<Flex bg={"white"} justify={"center"} align={"center"} w={64} h={64}>
								{props.icon}
							</Flex>
						</Indicator>
					)}

					<Flex direction={"column"} gap={props.isLoading ? "2xs" : 0} justify={"center"}>
						{props.isLoading ? (
							<>
								<Skeleton h={20} w={200} animate />
								<Skeleton h={20} w={200} animate />
								<Skeleton h={20} w={200} animate />
							</>
						) : (
							<>
								<Text fw={"bold"} fz={"md"}>
									{props.title}
								</Text>
								<Text c={"gray.6"} fz={"xs"}>
									{props.subTitle}
								</Text>
								<Text c={"green.6"} fz={"xs"}>
									{props.upTimeTitle}
								</Text>
							</>
						)}
					</Flex>
				</Flex>
				<Flex gap={"xs"}>
					<Button
						loading={props.isLoading}
						w={"100%"}
						size={"xs"}
						onClick={props.onEdit}
						leftSection={<IconPencil size={12} />}
						variant={"default"}
					>
						Edit
					</Button>
					<Button
						loading={props.isLoading}
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
				<CyberAssetDetailGeneralInfoCard key={item.title} isLoading={props.isLoading} {...item} />
			))}
		</Flex>
	);
}
