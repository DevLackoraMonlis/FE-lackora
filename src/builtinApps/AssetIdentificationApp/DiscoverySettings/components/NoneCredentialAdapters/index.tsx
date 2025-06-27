import { Badge, Card, Flex, getGradient, Grid, Text } from "@mantine/core";
import { Accordion } from "@mantine/core";
import { IconCircleDot } from "@tabler/icons-react";

import { useDiscoverySettings } from "../../index.hooks";

import NoneCredentialAdaptersSection from "./components/NoneCredentialAdaptersSection";

const DiscoverySettingsNoneCredentialAdapters = () => {
  const { discoverySettingsRQ } = useDiscoverySettings({ type: "none-credential" });

  return (
    <Grid p="sm" pt="lg" gutter="lg">
      <Grid.Col span={{ xs: 12, lg: 9 }} offset={{ lg: 3 }}>
        <Accordion
          variant="separated"
          defaultValue="Apples"
          styles={({ other }) => ({
            chevron: {
              fontWeight: other.fontWeights.bold,
            },
          })}
        >
          {discoverySettingsRQ?.data?.results?.map((item) => (
            <Accordion.Item
              key={item.id}
              value={item.id}
              style={({ colors: { gray }, white, black, other }) => ({
                background: other.darkMode ? gray[7] : gray[2],
                color: other.darkMode ? white : black,
              })}
            >
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
                      <Text fw="bold">{item.display_name}</Text>
                      <Text fz="sm" c="gray.6">
                        {item.description || "-"}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex align="center" gap="xs" px="sm">
                    <Badge
                      variant="light"
                      radius="xs"
                      styles={({ spacing }) => ({ root: { padding: spacing.lg } })}
                    >
                      <Text tt="capitalize" p="2xs">
                        Configure
                      </Text>
                    </Badge>
                  </Flex>
                </Flex>
              </Accordion.Control>
              <Accordion.Panel
                style={({ colors: { gray }, white, other }) => ({
                  background: other.darkMode ? gray[7] : white,
                })}
              >
                <NoneCredentialAdaptersSection />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Grid.Col>
    </Grid>
  );
};

export default DiscoverySettingsNoneCredentialAdapters;
