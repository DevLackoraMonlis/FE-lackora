import type { InventoryAppSideCardProps } from "@/builtinApps/InventoryApp/index.types";
import { Button, Card, Flex, Skeleton, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { v4 } from "uuid";

export default function InventoryAppSideCardItem(props: InventoryAppSideCardProps) {
	return (
		<Card w={"100%"} withBorder>
			<Card.Section withBorder h={32}>
				<Flex align={"center"} justify={"space-between"} gap={"xs"} h={"100%"} px={"xs"}>
					<Flex align={"center"} gap={"xs"} h={"100%"}>
						{props.icon}
						<Text fw={"bold"} c={"blue"}>
							{props.title}
						</Text>
					</Flex>
					<Button p={0} onClick={props.onRedirect} variant={"transparent"}>
						<IconArrowRight color={"blue"} size={20} />
					</Button>
				</Flex>
			</Card.Section>
			<Card.Section>
				<Flex direction={"column"} bg={"gray.1"} p={"md"} align={"center"}>
					{props.isLoading
						? Array.from({ length: 5 })
								.fill(0)
								.map((_item) => <Skeleton key={v4()} width={"100%"} h={20} animate />)
						: props.items.map((item) => (
								<Flex key={`${item.label}-${item.value}`} gap={"2xs"}>
									<Text fz={"xs"} fw={"bold"}>
										{item.label}
									</Text>
									<Text fz={"xs"} c={"gray.6"}>
										{item.label}
									</Text>
								</Flex>
							))}
				</Flex>
			</Card.Section>
		</Card>
	);
}
