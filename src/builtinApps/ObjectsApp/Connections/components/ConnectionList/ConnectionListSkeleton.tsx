import { Card, Center, Flex, Skeleton, getGradient } from "@mantine/core";

export default function ConnectionListSkeleton() {
	return Array(8)
		.fill(null)
		.map((_, idx) => (
			<Flex key={idx.toString()} align="center" justify="space-between" w="100%" bg="gray.1">
				<Flex gap="sm" m="xs">
					<Card
						variant="light"
						p="xs"
						h="40px"
						styles={(theme) => ({
							root: {
								background: getGradient({ deg: 180, from: "primary.1", to: "primary.1" }, theme),
								color: theme.white,
							},
						})}
					>
						<Center>
							<Skeleton height={20} circle mb="xl" />
						</Center>
					</Card>
					<Flex direction="column" gap="2xs" pt="2px">
						<Skeleton height={15} w="100px" radius="xs" />
						<Skeleton height={15} w="200px" radius="xs" />
					</Flex>
				</Flex>
				<Flex align="center" gap="xs" px="sm">
					<Skeleton height={30} w="100px" />
					<Skeleton height={30} w="100px" />
					<Skeleton height={30} w="100px" />
				</Flex>
			</Flex>
		));
}
