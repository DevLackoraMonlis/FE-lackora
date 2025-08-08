import { Flex, Skeleton } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import { Fragment } from "react";

export default function PolicyAccordionSkelton({ count = 1 }) {
	return Array(count)
		.fill(null)
		.map((_, idx) => (
			<Fragment key={`PolicyAccordionSkelton-${idx + 1}`}>
				<Flex justify="space-between" gap="sm" w="100%">
					<Flex pt="2lg" pl="xs">
						<IconGripVertical size={20} />
					</Flex>
					<Flex align="center" justify="space-between" w="100%" bg="gray.1" mt="xs">
						<Flex gap="sm" m="xs">
							<Flex direction="column" gap="2xs" pt="2px">
								<Skeleton height={20} w="100px" radius="xs" />
								<Skeleton height={20} w="300px" radius="xs" />
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
