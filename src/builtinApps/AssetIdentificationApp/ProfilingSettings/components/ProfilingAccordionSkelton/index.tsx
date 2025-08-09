import { Card, Center, Flex, Skeleton, getGradient } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import { Fragment } from "react";

function ProfilingAccordion({ count = 1 }) {
	return Array(count)
		.fill(null)
		.map((_, idx) => (
			<Fragment key={`ProfilingAccordionSkelton-${idx + 1}`}>
				<Flex justify="space-between" gap="sm" w="100%">
					<Flex pt="2lg" pl="xs">
						<IconGripVertical size={20} />
					</Flex>
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

export default function ProfilingAccordionSkelton({ count = 1 }) {
	return (
		<Flex direction="column">
			<Flex justify="space-between">
				<Skeleton height={30} w="200px" />
				<Skeleton height={30} w="200px" />
			</Flex>
			<ProfilingAccordion count={count} />
		</Flex>
	);
}
