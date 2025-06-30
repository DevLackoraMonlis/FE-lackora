import { Badge, Card, Flex, Grid, Text, getGradient } from "@mantine/core";
import { Accordion } from "@mantine/core";
import { IconBrowserCheck, IconCircleDot } from "@tabler/icons-react";

import { NoneCredentialAdaptersSections } from "../../index.enum";

import NoneCredentialAdaptersPortDetectionForm from "./components/PortDetectionForm";
import NoneCredentialAdaptersWebServiceDetectionForm from "./components/WebServiceDetectionForm";

const DiscoverySettingsNoneCredentialAdapters = () => {
	// const { discoverySettingsUQ } = useDiscoverySettings({ type: "none-credential" });
	return (
		<Grid p="sm" pt="lg" gutter="lg">
			<Grid.Col span={{ xs: 12, lg: 9 }} offset={{ lg: 3 }}>
				<Accordion variant="separated">
					<Accordion.Item value={NoneCredentialAdaptersSections.PortDetection}>
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
										<Text fw="bold">{NoneCredentialAdaptersSections.PortDetection}</Text>
										<Text fz="sm" c="gray.6">
											{"4 open ports"}
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
						<Accordion.Panel
							renderRoot={({ children, ...others }) =>
								!others["aria-hidden"] && <section {...others}>{children}</section>
							}
						>
							<NoneCredentialAdaptersPortDetectionForm />
						</Accordion.Panel>
					</Accordion.Item>
					<Accordion.Item value={NoneCredentialAdaptersSections.WebServiceDetection}>
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
										<IconBrowserCheck size={30} />
									</Card>
									<Flex direction="column" gap="2xs">
										<Text fw="bold">{NoneCredentialAdaptersSections.WebServiceDetection}</Text>
										<Text fz="sm" c="gray.6">
											{"4 active web crawlers"}
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
						<Accordion.Panel
							renderRoot={({ children, ...others }) =>
								!others["aria-hidden"] && <section {...others}>{children}</section>
							}
						>
							<NoneCredentialAdaptersWebServiceDetectionForm />
						</Accordion.Panel>
					</Accordion.Item>
				</Accordion>
			</Grid.Col>
		</Grid>
	);
};

export default DiscoverySettingsNoneCredentialAdapters;
