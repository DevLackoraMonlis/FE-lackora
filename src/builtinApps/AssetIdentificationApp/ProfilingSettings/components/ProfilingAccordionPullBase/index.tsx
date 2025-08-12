import { LoadingOverlay, Menu, Switch, Text, getGradient } from "@mantine/core";
import { Badge, Box, Card, Flex, Grid, Highlight } from "@mantine/core";
import { Accordion } from "@mantine/core";
import { IconDotsVertical, IconGavel, IconPencil, IconTrash } from "@tabler/icons-react";

import type { ProfilingCardData, ProfilingHandles } from "../../index.types";

type Props = ProfilingCardData &
	Omit<ProfilingHandles, "profilingCards"> & {
		selectedId: string;
		loading: boolean;
	};

const accordionPanel = [
	{
		label: "Profiling Name:",
		value: "name",
	},
	{
		label: "Summary:",
		value: "summary",
	},
	{
		label: "Condition(s):",
		value: "conditions",
		type: "condition",
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
];

export default function ProfilingAccordion({ id, ...props }: Props) {
	if (!id) return null;
	return (
		<Accordion variant="separated" w="100%" mt="xs">
			<Accordion.Item value={id}>
				<Accordion.Control data-testid="profiling-single-accordion" pos="relative" h="56px">
					<LoadingOverlay visible={props.selectedId === id && props.loading} />
					<Flex align="center" justify="space-between">
						<Flex align="center" gap="xs">
							<Card
								w={40}
								h={40}
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
									<IconGavel size={20} />
								</Flex>
							</Card>
							<Flex direction="column">
								<Text fw="bold">{props.title}</Text>
								<Text fz="xs">{props.description}</Text>
							</Flex>
						</Flex>
						<Flex align="center" gap="xs" px="sm">
							{!!props.matched_assets && (
								<Badge
									w="180px"
									variant="light"
									color="gray"
									tt="capitalize"
									p="sm"
									onClick={(e) => {
										e.stopPropagation();
										props.handleMatchedAssets(id);
									}}
								>
									<Highlight
										className="cursor-pointer"
										highlight={[`${props.matched_assets ?? "-"}`]}
										highlightStyles={{
											background: "transparent",
											fontWeight: "bold",
											textDecoration: "underline",
											margin: "0px 5px",
										}}
									>
										{`${props.matched_assets ?? "-"} MATCHED ASSETS`}
									</Highlight>
								</Badge>
							)}
							<Switch
								checked={props.isActive}
								color="green"
								labelPosition="left"
								label={props.isActive ? "Enable" : "Disable"}
								radius="lg"
								onChange={() => props.handleEnabledProfiling(id)}
								className="cursor-pointer"
							/>
							<Menu trigger="hover" shadow="md">
								<Menu.Target>
									<Box data-testid="profiling-menu-icon" pt="2xs">
										<IconDotsVertical size={20} />
									</Box>
								</Menu.Target>
								<Menu.Dropdown>
									<Menu.Item
										data-testid="profiling-submenu-edit"
										leftSection={<IconPencil size={15} />}
										onClick={(e) => {
											e.stopPropagation();
											props.handleEditOrCreateProfiling(id);
										}}
									>
										Edit
									</Menu.Item>
									<Menu.Item
										data-testid="profiling-submenu-delete"
										leftSection={<IconTrash size={15} />}
										onClick={(e) => {
											e.stopPropagation();
											props.handleDeleteProfiling(id);
										}}
									>
										Delete
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
									<Text>{`${props[value as keyof typeof props] || "-"}`}</Text>
								</Grid.Col>
							</Grid>
						))}
					</Flex>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
}
