import { Card, Flex, Skeleton } from "@mantine/core";

const results = Array(11)
	.fill(null)
	.map((_, idx) => idx.toString());

export default function WorkflowScanHistoryListSkelton() {
	return (
		<Flex gap="2xs" direction="column" mt="xs">
			{results?.map((key) => {
				return (
					<Card key={key} m={0} p="xs" radius="md" bd="2px solid gray.4">
						<Flex justify="space-between" align="center">
							<Skeleton w="80px" h="20px" />
							<Skeleton w="80px" h="20px" />
						</Flex>
					</Card>
				);
			})}
		</Flex>
	);
}
