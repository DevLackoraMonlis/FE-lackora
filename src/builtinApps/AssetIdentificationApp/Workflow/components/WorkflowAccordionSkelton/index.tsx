import { Card, Center, Flex, Skeleton, getGradient } from "@mantine/core";
import { Fragment } from "react";

import WorkflowPlayerTracking from "../WorkflowPlayerTracking";

export default function WorkflowAccordionSkelton({ count = 1 }) {
	return Array(count)
		.fill(null)
		.map((_, idx) => (
			<Fragment key={`WorkflowAccordionSkelton-${idx + 1}`}>
				<WorkflowPlayerTracking status="idle" />
				<Flex align="center" justify="space-between" w="100%" bg="gray.1">
					<Flex gap="sm" m="xs">
						<Card
							variant="light"
							p="xs"
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
						<Flex direction="column" gap="2xs" pt="2px">
							<Skeleton height={20} w="300px" radius="xs" />
							<Skeleton height={20} w="300px" radius="xs" />
						</Flex>
					</Flex>
					<Flex align="center" gap="xs" px="sm">
						<Skeleton height={30} w="150px" radius="lg" />
					</Flex>
				</Flex>
			</Fragment>
		));
}
