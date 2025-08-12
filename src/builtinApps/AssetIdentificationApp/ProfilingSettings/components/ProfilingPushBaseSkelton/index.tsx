import { Card, Center, Flex, Skeleton, getGradient } from "@mantine/core";
import { Fragment } from "react";

export default function ProfilingPushBaseSkelton({ count = 1 }) {
	return Array(count)
		.fill(null)
		.map((_, idx) => (
			<Fragment key={`ProfilingPushBaseSkelton-${idx + 1}`}>
				<Flex justify="space-between" gap="sm" w="100%">
					<Flex align="center" justify="space-between" w="100%" bg="gray.1" mt="xs">
						<Flex align="center">
							<Card
								variant="light"
								p="xs"
								mx="xs"
								h="50px"
								styles={(theme) => ({
									root: {
										background: getGradient({ deg: 180, from: "primary.1", to: "primary.1" }, theme),
										color: theme.white,
									},
								})}
							>
								<Center>
									<Skeleton height={30} circle mb="xl" />
								</Center>
							</Card>
							<Flex gap="sm" my="xs">
								<Flex direction="column" gap="2xs" pt="2px">
									<Skeleton height={20} w="100px" radius="xs" />
									<Skeleton height={20} w="300px" radius="xs" />
								</Flex>
							</Flex>
						</Flex>
						<Flex align="center" gap="xs" px="sm">
							<Skeleton height={30} w="150px" radius="lg" />
							<Skeleton height={30} w="150px" radius="lg" />
						</Flex>
					</Flex>
				</Flex>
			</Fragment>
		));
}
