import { Fragment, useState } from "react";
import { Badge, Card, Divider, Flex, Grid, Switch, Text } from "@mantine/core";
import { Accordion, Checkbox, TextInput } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";

import type { GetDiscoverySettingsParams } from "@/http/generated/models";

import { useDiscoverySettings } from "../../index.hooks";

import DiscoveryAdapterGateways from "./components/DiscoveryAdapterGateways";

type DiscoveryAdapterFilters = Pick<GetDiscoverySettingsParams, "method" | "vendor">;

const DiscoverySettingsDiscoveryAdapters = () => {
  const [queryParams, setQueryParams] = useState<GetDiscoverySettingsParams>({ type: "discovery" });
  const { discoverySettingsRQ } = useDiscoverySettings(queryParams);

  const handleUpdateQueryParams = (params: Partial<GetDiscoverySettingsParams>) => {
    setQueryParams((perParams) => ({ ...perParams, ...params }));
  };

  return (
    <Grid p="sm" pt="lg" gutter="lg">
      <Grid.Col span={{ xs: 12, lg: 3 }}>
        <Card withBorder shadow="sm" radius="md" bd="1px solid gray.6" h="80dvh">
          <Card.Section
            withBorder
            inheritPadding
            py="2xs"
            style={({ colors: { gray }, white, black, other }) => ({
              background: other.darkMode ? gray[7] : gray[2],
              color: other.darkMode ? white : black,
              fontWeight: other.fontWeights.bold,
            })}
          >
            Filter
          </Card.Section>
          <Card.Section withBorder inheritPadding py="2xs">
            <TextInput
              my="sm"
              leftSection={<IconSearch size={16} />}
              variant="filled"
              radius="md"
              placeholder="Search by adapter Name"
              onChange={(e) => handleUpdateQueryParams({ search: e.target.value })}
            />
            <Divider />
            <Switch
              my="sm"
              labelPosition="left"
              label="Show only used adapters"
              size="md"
              styles={({ other }) => ({
                label: { fontWeight: other.fontWeights.medium },
              })}
            />
            {discoverySettingsRQ?.data?.metadata?.filters?.map(({ label, param, items }) => {
              const value = queryParams[param as keyof DiscoveryAdapterFilters] || [];
              return (
                <Fragment key={param}>
                  <Divider />
                  <Checkbox.Group
                    label={
                      <Flex align="center" justify="space-between">
                        <Text fw="normal">{label}</Text>
                        {!!value?.length && (
                          <Badge
                            className="cursor-pointer"
                            variant="light"
                            color="gray"
                            rightSection={<IconX size={10} />}
                            onClick={() => handleUpdateQueryParams({ [param]: null })}
                          >
                            <Text fz="xs" tt="capitalize">
                              Clear Filter
                            </Text>
                          </Badge>
                        )}
                      </Flex>
                    }
                    value={value}
                    styles={() => ({
                      label: { width: "100%" },
                    })}
                    my="sm"
                    onChange={(value) => handleUpdateQueryParams({ [param]: value?.length ? value : null })}
                  >
                    <Flex direction="column" gap="xs" py="xs">
                      {items?.map((item) => (
                        <Checkbox key={item.value} {...item} />
                      ))}
                    </Flex>
                  </Checkbox.Group>
                </Fragment>
              );
            })}
          </Card.Section>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ xs: 12, lg: 8 }} offset={{ lg: 1 }}>
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
                    <Card variant="light" p="xs">
                      <IconSearch size={30} />
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
                      color={item.is_used ? "green" : "gray"}
                      styles={({ spacing }) => ({ root: { padding: spacing.md } })}
                    >
                      <Text p="2xs">{item.is_used ? "USED" : "UNUSED"}</Text>
                    </Badge>
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
                <Text py="xs" c="gray.6">
                  Added Gateways
                </Text>
                <DiscoveryAdapterGateways />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Grid.Col>
    </Grid>
  );
};

export default DiscoverySettingsDiscoveryAdapters;
