import { Accordion, Card, Flex, getGradient } from "@mantine/core";
import { Badge, Progress, Text, Timeline } from "@mantine/core";
import { IconSearch, IconSettings, IconWorld } from "@tabler/icons-react";
import { IconDeviceDesktopSearch, IconDeviceLaptop } from "@tabler/icons-react";
import { IconCheck, IconLineScan } from "@tabler/icons-react";

export default function WorkflowAssetDiscoveryAccordionItem() {
	return (
		<Accordion variant="separated" defaultValue="assetDiscovery">
			<Accordion.Item value="assetDiscovery">
				<Accordion.Control>
					<Flex align="center" justify="space-between">
						<Flex gap="sm">
							<Card
								w={50}
								h={50}
								variant="light"
								shadow="none"
								padding={0}
								styles={(theme) => ({
									root: {
										background: getGradient({ deg: 180, from: "primary.4", to: "primary.9" }, theme),
										color: theme.white,
									},
								})}
							>
								<Flex justify="center" align="center" m="auto">
									<IconLineScan size={40} />
								</Flex>
							</Card>
							<Flex direction="column" gap="2xs">
								<Text fw="bold" fz="md">
									ASSET DISCOVERY
								</Text>
								<Flex align="center" gap="2xs">
									<IconCheck color="green" size={18} />
									<Text fz="xs">{`Completed: ${7} | Duration: ${45}min`}</Text>
								</Flex>
							</Flex>
						</Flex>
						<Flex align="center" gap="xs" px="sm">
							<Badge w="130px" variant="light" color={"green"} px="sm" py="lg">
								<Text p="2xs" tt="capitalize">
									{"Connected"}
								</Text>
							</Badge>
						</Flex>
					</Flex>
				</Accordion.Control>
				<Accordion.Panel px="3xl">
					<Timeline active={2} bulletSize={20} lineWidth={3} mt="md" color="green">
						<Timeline.Item
							bullet={<IconCheck size={15} />}
							title={
								<Flex align="center" justify="space-between">
									<Text fw="bold">IP discovery from gateways</Text>
									<Badge color="teal" variant="light">
										COMPLETED
									</Badge>
								</Flex>
							}
						>
							<Text size="sm" c="blue">
								540 assets discovered
							</Text>
							<Text fz="xs" c="dimmed">
								Start at 08:02 – End at 08:06 | Duration: 4min
							</Text>
						</Timeline.Item>

						<Timeline.Item
							bullet={<IconCheck size={15} />}
							title={
								<Flex align="center" justify="space-between">
									<Text fw="bold">Sync VLANs with new detected IPs</Text>
									<Badge color="teal" variant="light">
										COMPLETED
									</Badge>
								</Flex>
							}
						>
							<Text size="sm" c="blue">
								100 assets detected
							</Text>
							<Text fz="xs" c="dimmed">
								Start at 08:06 – End at 08:10 | Duration: 4min
							</Text>
						</Timeline.Item>

						<Timeline.Item
							bullet={<IconSearch size={15} />}
							color="blue"
							title={
								<Flex align="center" justify="space-between">
									<Text fw="bold">Port detection (None Credential)</Text>
									<Badge color="blue" variant="light">
										INPROGRESS
									</Badge>
								</Flex>
							}
						>
							<Flex gap="xs">
								<Progress value={(100 / 400) * 100} mt="xs" size="xs" style={{ flex: 4 }} />
								<Text fz="xs" tw="no-wrap" component="span" style={{ flex: 1 }}>
									100/400 ports &nbsp; | &nbsp; 00:08min
								</Text>
							</Flex>
							<Text fz="xs" c="dimmed">
								Start at 08:02
							</Text>
						</Timeline.Item>

						<Timeline.Item
							bullet={<IconWorld size={15} />}
							color="gray"
							title={
								<Flex align="center" justify="space-between">
									<Text fw="bold">Detect web services (None Credential)</Text>
									<Badge color="gray" variant="light">
										PENDING...
									</Badge>
								</Flex>
							}
						>
							<Text fz="xs" c="dimmed" mt={4}>
								Description about this step, show before running
								<br />
								You’ve created new branch fix - notifications from master
							</Text>
						</Timeline.Item>

						<Timeline.Item
							bullet={<IconDeviceLaptop size={15} />}
							color="gray"
							title={
								<Flex align="center" justify="space-between">
									<Text fw="bold">Detect systems' vendors based on MAC address (None Credential)</Text>
									<Badge color="gray" variant="light">
										PENDING...
									</Badge>
								</Flex>
							}
						>
							<Text fz="xs" c="dimmed" mt={4}>
								Description about this step, show before running
								<br />
								You’ve created new branch fix - notifications from master
							</Text>
						</Timeline.Item>

						<Timeline.Item
							bullet={<IconSettings size={15} />}
							color="gray"
							title={
								<Flex align="center" justify="space-between">
									<Text fw="bold">Detect SIP Phones models (None Credential)</Text>
									<Badge color="gray" variant="light">
										PENDING...
									</Badge>
								</Flex>
							}
						>
							<Text fz="xs" c="dimmed" mt={4}>
								Description about this step, show before running
								<br />
								You’ve created new branch fix - notifications from master
							</Text>
						</Timeline.Item>

						<Timeline.Item
							bullet={<IconDeviceDesktopSearch size={15} />}
							color="gray"
							title={
								<Flex align="center" justify="space-between">
									<Text fw="bold">Windows hostname & domain detection (None Credential)</Text>
									<Badge color="gray" variant="light">
										PENDING...
									</Badge>
								</Flex>
							}
						>
							<Text fz="xs" c="dimmed" mt={4}>
								Description about this step, show before running
								<br />
								You’ve created new branch fix - notifications from master
							</Text>
						</Timeline.Item>
					</Timeline>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
}
