import { Badge, Card, Flex, Grid, Image, ScrollArea, Text } from "@mantine/core";
import { Accordion } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";

import { useDiscoveryAdapters } from "../../index.hooks";
import NoneCredentialServices from "./components/NoneCredentialComponent";

const DiscoverySettingsNoneCredentialAdapters = () => {
	const { height } = useViewportSize();
	const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
	const { discoveryAdapters } = useDiscoveryAdapters({ type: "none-credential" });
	return (
		<Grid p="sm" pt="md">
			<Grid.Col span={{ xs: 12, lg: 9 }} offset={{ lg: 3 }}>
				<ScrollArea px="xs" h={height - 160}>
					<Accordion variant="separated" onChange={setActiveAccordion}>
						{discoveryAdapters.data?.results?.map(({ id, fields, display_name, caption, icon }) => {
							return (
								<Accordion.Item key={id} value={id} mb="xs">
									<Accordion.Control h="56px" p="xs">
										<Flex align="center" justify="space-between">
											<Flex gap="sm" align="center">
												<Card w={40} h={40} variant="light" shadow="none" padding={0}>
													<Flex justify="center" align="center" m="auto">
														{icon ? (
															<Image w={30} h={30} fit="cover" radius="md" src={icon} alt={display_name} />
														) : null}
													</Flex>
												</Card>
												<Flex direction="column">
													<Text fw="bold">{display_name}</Text>
													<Text c="gray.6">{caption}</Text>
												</Flex>
											</Flex>
											<Flex align="center" gap="xs" px="sm">
												<Badge variant="light" radius="xs" p="md">
													<Text tt="capitalize" p="2xs">
														Configure
													</Text>
												</Badge>
											</Flex>
										</Flex>
									</Accordion.Control>
									<Accordion.Panel>
										<NoneCredentialServices
											enabled={activeAccordion === id}
											adapterId={id}
											fields={fields}
											refetchDiscoveryAdapters={discoveryAdapters.refetch}
										/>
									</Accordion.Panel>
								</Accordion.Item>
							);
						})}
					</Accordion>
				</ScrollArea>
			</Grid.Col>
		</Grid>
	);
};

export default DiscoverySettingsNoneCredentialAdapters;
