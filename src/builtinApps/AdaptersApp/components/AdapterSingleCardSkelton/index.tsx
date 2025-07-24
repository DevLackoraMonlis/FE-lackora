import { Card, Center, Flex, Grid, Skeleton } from "@mantine/core";

export default function AdapterSingleCardSkelton({ count = 1 }) {
	return Array(count)
		.fill(null)
		.map((_, idx) => (
			<Grid.Col key={`AdapterSingleCardSkelton-${idx + 1}`} span={{ xs: 12, md: 6, lg: 4 }}>
				<Card h="150px" shadow="xs" radius="sm" bg="gray.2" bd="2px solid gray.2">
					<Card.Section inheritPadding p="xs" withBorder>
						<Flex gap="xs">
							<Card w={80} h={62} variant="light" shadow="none" padding={0} pt="2xs">
								<Center>
									<Skeleton height={50} circle mb="xl" />
								</Center>
							</Card>
							<Flex direction="column" gap="2xs" w="100%">
								<Flex justify="space-between">
									<Skeleton height={20} radius="xs" />
								</Flex>
								<Flex gap="xs">
									<Skeleton height={30} mt={6} radius="xs" />
									<Skeleton height={30} mt={6} radius="xs" />
								</Flex>
							</Flex>
						</Flex>
					</Card.Section>
					<Card.Section px="xs">
						<Skeleton height={30} mt={6} radius="xs" />
						<Skeleton height={30} mt={6} radius="xs" w="70%" />
					</Card.Section>
				</Card>
			</Grid.Col>
		));
}
