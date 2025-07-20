import { Card, Flex, Grid, Skeleton } from "@mantine/core";
import { v4 } from "uuid";

export default function MonoMarketCardSkeleton() {
	return Array(6)
		.fill(0)
		.map(() => (
			<Grid.Col key={v4()} span={{ lg: 4, "2xl": 3 }}>
				<Card withBorder shadow={"xs"}>
					<Card.Section bg={"gray.2"} p={"sm"}>
						<Flex bg={"white"} h={80} justify={"center"} align={"center"} pos={"relative"}>
							<Flex gap={"xs"} align={"center"}>
								<Skeleton animate circle height={30} width={30} />
								<Skeleton animate width={150} height={20} radius="xl" />
							</Flex>
						</Flex>
						<Flex h={80} gap={"2xs"} mt={"xs"} direction={"column"}>
							<Skeleton animate width={"100%"} height={20} radius="xl" />
							<Skeleton animate width={"100%"} height={20} radius="xl" />
							<Skeleton animate width={"100%"} height={20} radius="xl" />
						</Flex>
					</Card.Section>
					<Card.Section bg={"white"}>
						<Flex align={"center"} p={"sm"} h={61}>
							<Skeleton animate width={"100%"} height={30} radius="xl" />
						</Flex>
					</Card.Section>
				</Card>
			</Grid.Col>
		));
}
