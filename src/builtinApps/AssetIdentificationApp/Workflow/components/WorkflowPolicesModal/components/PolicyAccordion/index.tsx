import { Box, Button, Flex, Menu, Switch, Text, Tooltip } from "@mantine/core";
import { Accordion } from "@mantine/core";
import { IconDotsVertical, IconInfoCircle, IconInfoTriangleFilled } from "@tabler/icons-react";
import { IconList, IconPencil, IconTrash } from "@tabler/icons-react";

import type { PolicyCardData } from "../../../../index.types";

type Props = PolicyCardData;

export default function PolicyAccordion({ id, title, description, enforce, isActive = false }: Props) {
	if (!id) return null;
	return (
		<Accordion variant="separated" w="100%">
			<Accordion.Item value={id}>
				<Accordion.Control data-testid="policy-single-accordion">
					<Flex align="center" justify="space-between">
						<Flex direction="column">
							<Text fw="bold">{title}</Text>
							<Text fz="xs">{description}</Text>
						</Flex>
						<Flex align="center" gap="xs" px="sm">
							{enforce && (
								<>
									<Flex align="center" gap="2xs">
										<IconInfoTriangleFilled size={15} color="orange" />
										<Text c="dimmed" fz="xs">
											Policy not enforced on the current scan
										</Text>
										<Tooltip
											multiline
											w={320}
											label="Immediately applies this policy to the current scan, even if the scan has already started."
										>
											<IconInfoCircle size={15} />
										</Tooltip>
									</Flex>
									<Button variant="filled" color="white" bg="white">
										<Text c="blue">Enforce Now</Text>
									</Button>
								</>
							)}
							{/* <Badge variant="light" color={"phaseStatus?.color"} px="sm" py="md">
                <Text p="2xs" tt="capitalize">
                phaseStatus?.label
                </Text>
                </Badge> */}
							<Switch
								checked={isActive}
								color="green"
								labelPosition="left"
								label={isActive ? "Enable" : "Disable"}
								radius="lg"
							/>
							<Menu trigger="hover" shadow="md">
								<Menu.Target>
									<Box data-testid="policy-menu-icon" pt="2xs">
										<IconDotsVertical size={20} />
									</Box>
								</Menu.Target>
								<Menu.Dropdown>
									<Menu.Item
										data-testid="policy-submenu-edit"
										leftSection={<IconPencil size={15} />}
										// onClick={() => props.handleGatewayConfiguration(step.id)}
									>
										Edit
									</Menu.Item>
									<Menu.Item
										data-testid="policy-submenu-delete"
										leftSection={<IconTrash size={15} />}
										// onClick={() => props.handleViewPolices(step.id)}
									>
										Delete
									</Menu.Item>
									<Menu.Item
										data-testid="policy-submenu-enforce"
										leftSection={<IconList size={15} />}
										// onClick={() => props.handleViewMatchedAssets(step.id)}
									>
										Enforce Now
									</Menu.Item>
								</Menu.Dropdown>
							</Menu>
						</Flex>
					</Flex>
				</Accordion.Control>
				{/* Panel */}
				<Accordion.Panel>Accordion.Panel</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
}
