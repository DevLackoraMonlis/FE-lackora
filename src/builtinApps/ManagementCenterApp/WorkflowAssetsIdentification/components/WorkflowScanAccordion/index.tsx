import { Accordion, Badge, Card, Flex, Text } from "@mantine/core";
import { IconLineScan } from "@tabler/icons-react";

export default function WorkflowScanAccordionItem() {
	return (
		<Accordion
			defaultValue="scan"
			variant="separated"
			styles={({ colors, white, spacing }) => ({
				chevron: { color: white },
				panel: {
					background: colors.main[4],
					borderBottomLeftRadius: spacing.xs,
					borderBottomRightRadius: spacing.xs,
				},
				control: {
					background: colors.main[6],
					borderTopLeftRadius: spacing.xs,
					borderTopRightRadius: spacing.xs,
				},
			})}
		>
			<Accordion.Item value="scan">
				<Accordion.Control>
					<Flex align="center" justify="space-between">
						<Flex gap="sm">
							<Card w={50} h={50} variant="light" shadow="none" padding={0}>
								<Flex justify="center" align="center" m="auto">
									<IconLineScan size={40} />
								</Flex>
							</Card>
							<Flex direction="column" gap="2xs">
								<Text fz="md" c="white">
									SCAN
								</Text>
								<Text c="gray.5">Not start, awaiting scan trigger.</Text>
							</Flex>
						</Flex>
						<Flex align="center" gap="xs" px="sm">
							<Badge variant="light" color="white" bg="main.5" p="md">
								<Text p="2xs" tt="capitalize">
									Scheduled scan will start in 12 minutes
								</Text>
							</Badge>
							<Badge variant="light" color="white" bg="main.5" p="md">
								<Text p="2xs">Scheduled</Text>
							</Badge>
						</Flex>
					</Flex>
				</Accordion.Control>
				<Accordion.Panel>
					<Flex direction="column" w="40%" px="3xl" gap="2xs">
						<Flex align="center" justify="space-between">
							<Text c="white">Last Scan Time:</Text>
							<Text c="white">-</Text>
						</Flex>
						<Flex align="center" justify="space-between">
							<Text c="white">Next Scheduled Scan:</Text>
							<Text c="white">Today, 08:00</Text>
						</Flex>
					</Flex>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
}
