import { Card, Center, Flex, Text, ThemeIcon } from "@mantine/core";
import { IconPencilDiscount } from "@tabler/icons-react";

export default function StatsCard() {
	return (
		<Card mt={30}>
			<Center>
				<ThemeIcon size={60} radius={60} mt="-50px">
					<IconPencilDiscount size={32} stroke={1.5} />
				</ThemeIcon>
			</Center>
			<Flex direction={"column"}>
				<Text ta="center" fw={700}>
					Pedicure
				</Text>
				<Text c="dimmed" ta="center" fz="sm">
					32 request / week
				</Text>
			</Flex>
		</Card>
	);
}
