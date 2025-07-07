import { Badge, Card, Flex, Grid, Text, getGradient } from "@mantine/core";
import { Accordion } from "@mantine/core";
import { IconCircleDot } from "@tabler/icons-react";
import { useState } from "react";

import { useDiscoveryAdapters } from "../../index.hooks";

import NoneCredentialServices from "./components/NoneCredentialSections";

const DiscoverySettingsNoneCredentialAdapters = () => {
	const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
	const { discoveryAdapters } = useDiscoveryAdapters({ type: "none-credential" });
	return (
		<Grid p="sm" pt="lg" gutter="lg">
			<Grid.Col span={{ xs: 12, lg: 9 }} offset={{ lg: 3 }}>
				<Accordion variant="separated" onChange={setActiveAccordion}>
					{discoveryAdapters.data?.results?.map(({ id, fields, display_name, caption }) => {
						return (
							<Accordion.Item key={id} value={id}>
								<Accordion.Control>
									<Flex align="center" justify="space-between">
										<Flex gap="sm">
											<Card
												variant="light"
												p="xs"
												styles={(theme) => ({
													root: {
														background: getGradient({ deg: 180, from: "primary.4", to: "primary.9" }, theme),
														color: theme.white,
													},
												})}
											>
												<IconCircleDot size={30} />
											</Card>
											<Flex direction="column" gap="2xs">
												<Text fw="bold">{display_name}</Text>
												<Text fz="sm" c="gray.6">
													{caption}
												</Text>
											</Flex>
										</Flex>
										<Flex align="center" gap="xs" px="sm">
											<Badge variant="light" radius="xs" p="lg">
												<Text tt="capitalize" p="2xs">
													Configure
												</Text>
											</Badge>
										</Flex>
									</Flex>
								</Accordion.Control>
								<Accordion.Panel>
									<NoneCredentialServices enabled={activeAccordion === id} adapterId={id} fields={fields} />
								</Accordion.Panel>
							</Accordion.Item>
						);
					})}
				</Accordion>
			</Grid.Col>
		</Grid>
	);
};

export default DiscoverySettingsNoneCredentialAdapters;
