import { Box, Button, Flex, Grid, LoadingOverlay, Menu, Switch, Text, Tooltip } from "@mantine/core";
import { Accordion } from "@mantine/core";
import { IconDotsVertical, IconInfoCircle, IconInfoTriangleFilled } from "@tabler/icons-react";
import { IconList, IconPencil, IconTrash } from "@tabler/icons-react";

import type { PolicyCardData, PolicyHandles } from "../../../../index.types";

type Props = PolicyCardData &
	Omit<PolicyHandles, "policyCards"> & {
		handleWorkflowEnforcePolicy: (id: string) => void;
		handleWorkflowEnabledPolicy: (id: string) => void;
		selectedId: string;
		loading: boolean;
	};

const accordionPanel = [
	{
		label: "Policy Name:",
		value: "name",
	},
	{
		label: "Summary:",
		value: "summary",
	},
	{
		label: "Condition/Action:",
		value: "conditions",
		type: "conditions",
	},
	{
		label: "Created Time:",
		value: "created_time",
		type: "date",
	},
	{
		label: "Creator:",
		value: "creator",
	},
	{
		label: "Updated Time:",
		value: "updated_time",
		type: "date",
	},
	{
		label: "Updater:",
		value: "updater",
	},
] as const;

export default function PolicyAccordion({ id, ...props }: Props) {
	if (!id) return null;
	return (
		<Accordion variant="separated" w="100%">
			<Accordion.Item value={id}>
				<Accordion.Control data-testid="policy-single-accordion" pos="relative">
					<LoadingOverlay visible={props.selectedId === id && props.loading} />
					<Flex align="center" justify="space-between">
						<Flex direction="column">
							<Text fw="bold">{props.title}</Text>
							<Text fz="xs">{props.description}</Text>
						</Flex>
						<Flex align="center" gap="xs" px="sm">
							{!props.enforce && (
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
									<Button
										variant="filled"
										color="white"
										bg="white"
										onClick={() => props.handleWorkflowEnforcePolicy(id)}
									>
										<Text c="blue">Enforce Now</Text>
									</Button>
								</>
							)}
							<Switch
								checked={props.isActive}
								color="green"
								labelPosition="left"
								label={props.isActive ? "Enable" : "Disable"}
								radius="lg"
								onChange={() => props.handleWorkflowEnabledPolicy(id)}
								className="cursor-pointer"
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
										onClick={(e) => {
											e.stopPropagation();
											props.handleEditOrCreatePolicy(id);
										}}
									>
										Edit
									</Menu.Item>
									<Menu.Item
										data-testid="policy-submenu-delete"
										leftSection={<IconTrash size={15} />}
										onClick={(e) => {
											e.stopPropagation();
											props.handleDeletePolicy(id);
										}}
									>
										Delete
									</Menu.Item>
									<Menu.Item
										data-testid="policy-submenu-enforce"
										leftSection={<IconList size={15} />}
										onClick={(e) => {
											e.stopPropagation();
											props.handleWorkflowEnforcePolicy(id);
										}}
									>
										Enforce Now
									</Menu.Item>
								</Menu.Dropdown>
							</Menu>
						</Flex>
					</Flex>
				</Accordion.Control>
				{/* Panel */}
				<Accordion.Panel>
					<Flex direction="column" gap="2xs" w="50%" mt="xs">
						{accordionPanel.map(({ label, value }) => (
							<Grid key={label}>
								<Grid.Col span={6}>
									<Text fw="bold">{label}</Text>
								</Grid.Col>
								<Grid.Col span={6}>
									<Text>{`${props[value] || "-"}`}</Text>
								</Grid.Col>
							</Grid>
						))}
					</Flex>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
}
