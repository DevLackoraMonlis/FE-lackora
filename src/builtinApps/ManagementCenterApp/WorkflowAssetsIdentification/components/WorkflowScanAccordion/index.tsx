import { Accordion, Badge, Button, Card, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLineScan } from "@tabler/icons-react";

import WorkflowScanHistoryModal from "../shared/WorkflowScanHistoryModal";

export default function WorkflowScanAccordionItem() {
	const [openedScanHistory, handleScanHistory] = useDisclosure();
	return (
		<>
			<WorkflowScanHistoryModal
				onClose={handleScanHistory.close}
				opened={openedScanHistory}
				enabledQuery={false}
			/>
			<Accordion
				defaultValue="scan"
				variant="separated"
				styles={({ colors, white, spacing }) => ({
					chevron: { color: white },
					panel: {
						background: colors.main[4],
						borderBottomLeftRadius: spacing["2xs"],
						borderBottomRightRadius: spacing["2xs"],
					},
					control: {
						background: colors.main[6],
						borderTopLeftRadius: spacing["2xs"],
						borderTopRightRadius: spacing["2xs"],
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
						<Flex justify="space-between" px="3xl" align="center">
							<Flex direction="column" gap="2xs" miw="250px">
								<Flex align="center" justify="space-between">
									<Text c="white">Last Scan Time:</Text>
									<Text c="white">-</Text>
								</Flex>
								<Flex align="center" justify="space-between">
									<Text c="white">Next Scheduled Scan:</Text>
									<Text c="white">Today, 08:00</Text>
								</Flex>
							</Flex>
							<Button variant="outline" onClick={handleScanHistory.open}>
								Scan History
							</Button>
						</Flex>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</>
	);
}
