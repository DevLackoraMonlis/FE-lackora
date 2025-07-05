import { Flex, Skeleton } from "@mantine/core";
import { v4 } from "uuid";

export default function ConnectionListSkeleton() {
	return Array(3)
		.fill(0)
		.map(() => (
			<Flex key={v4()} gap={"md"} align={"center"} h={100} w={"100%"} justify={"space-between"}>
				<Skeleton animate height={50} circle />
				<Flex w={"100%"} direction={"column"} gap={"sm"}>
					<Skeleton animate width={"100%"} height={8} radius="xl" />
					<Skeleton animate width={"100%"} height={8} radius="xl" />
				</Flex>
			</Flex>
		));
}
