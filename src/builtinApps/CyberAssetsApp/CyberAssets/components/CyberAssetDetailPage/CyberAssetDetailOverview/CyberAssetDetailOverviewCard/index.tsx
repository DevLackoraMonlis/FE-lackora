import { Card, Flex, Text } from "@mantine/core";
import type { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
	titleLeft?: ReactNode;
	titleRight?: ReactNode;
	title: string;
	rightSection?: ReactNode;
}>;

export default function CyberAssetDetailOverviewCard(props: Props) {
	return (
		<Card bg={"gray.1"} p={"xs"}>
			<Flex align={"center"} justify={"space-between"}>
				<Flex align={"center"} gap={"2xs"} mb={"2xs"}>
					{props.titleLeft}
					<Text fw={"bold"} c={"gray.6"}>
						{props.title}
					</Text>
					{props.titleRight}
				</Flex>

				{props.rightSection}
			</Flex>

			<Flex bg={"white"} align={"center"} justify={"center"}>
				{props.children}
			</Flex>
		</Card>
	);
}
