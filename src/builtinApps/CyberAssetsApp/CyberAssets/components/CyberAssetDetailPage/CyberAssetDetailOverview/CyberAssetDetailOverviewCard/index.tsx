import { Box, Card, Flex, Skeleton, Text } from "@mantine/core";
import type { PropsWithChildren, ReactNode } from "react";
import { v4 } from "uuid";

type Props = PropsWithChildren<{
	titleLeft?: ReactNode;
	titleRight?: ReactNode;
	title: string;
	rightSection?: ReactNode;
	mih: number;
	isLoading: boolean;
}>;

export default function CyberAssetDetailOverviewCard(props: Props) {
	return (
		<Card bg={"gray.1"} p={"xs"} mih={props.mih} h={"100%"}>
			<Flex align={"center"} justify={"space-between"}>
				<Flex align={"center"} gap={"2xs"} mb={"2xs"}>
					{props.titleLeft}
					<Text fw={"bold"} c={"gray.6"}>
						{props.title}
					</Text>
					{props.titleRight}
				</Flex>

				{props.rightSection || <Box w={10} h={30} />}
			</Flex>

			<Flex
				bg={"white"}
				direction={props.isLoading ? "column" : "row"}
				align={"center"}
				h={"100%"}
				w={"100%"}
				gap={props.isLoading ? "xs" : 0}
				justify={"center"}
			>
				{props.isLoading
					? Array.from({ length: Math.floor(props.mih / 100) }).map((_item) => (
							<Skeleton key={v4()} h={30} w={"90%"} animate />
						))
					: props.children}
			</Flex>
		</Card>
	);
}
