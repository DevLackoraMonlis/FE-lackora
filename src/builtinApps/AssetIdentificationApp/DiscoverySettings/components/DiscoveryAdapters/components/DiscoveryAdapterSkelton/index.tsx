import { Card, Center, Flex, Skeleton } from "@mantine/core";

export default function DiscoveryAdapterSkelton({ count = 1 }) {
	return Array(count)
		.fill(null)
		.map((_, idx) => (
			<Flex
				key={`DiscoveryAdapterSkelton-${idx + 1}`}
				align="center"
				justify="space-between"
				w="100%"
				bg="gray.1"
				my="xs"
			>
				<Flex gap="sm" m="xs">
					<Card variant="light" p="xs" h="50px">
						<Center>
							<Skeleton height={30} circle mb="xl" />
						</Center>
					</Card>
					<Flex direction="column" gap="2xs">
						<Skeleton height={20} w="300px" radius="xs" />
						<Skeleton height={20} radius="xs" />
					</Flex>
				</Flex>
				<Flex align="center" gap="xs" px="sm">
					<Skeleton height={40} w="100px" radius="lg" />
					<Skeleton height={40} w="100px" radius="xs" />
				</Flex>
			</Flex>
		));
}
