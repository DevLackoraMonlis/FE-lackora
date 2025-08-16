import type { InventoryAppSideCardProps } from "@/builtinApps/InventoryApp/index.types";
import { Button, Card, Flex, Skeleton, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { v4 } from "uuid";

export default function InventoryAppSideCardItem(props: InventoryAppSideCardProps) {
	return (
		<Card w={"100%"} withBorder bd={props.isSelected ? "1px solid primary.6" : undefined}>
			<Card.Section withBorder h={32}>
				<Flex align={"center"} justify={"space-between"} gap={"xs"} h={"100%"} px={"xs"}>
					<Flex align={"center"} gap={"xs"} h={"100%"}>
						{props.icon}
						<Text fw={"bold"} c={props.isSelected ? "blue" : "gray"}>
							{props.title}
						</Text>
					</Flex>
					<Button p={0} onClick={props.onRedirect} variant={"transparent"}>
						<IconArrowRight color={props.isSelected ? "blue" : "gray"} size={20} />
					</Button>
				</Flex>
			</Card.Section>
			<Card.Section>
				<Flex direction={"column"} bg={"gray.1"} pl={"2xl"} py={"lg"} align={"flex-start"}>
					{props.isLoading
						? Array.from({ length: 5 })
								.fill(0)
								.map((_item) => <Skeleton key={v4()} width={"100%"} h={20} animate />)
						: props.items.map((item) => (
								<Flex key={`${item.label}-${item.value}`} gap={"2xs"}>
									<Text fz={"xs"} fw={"bolder"}>
										{item.value}
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
