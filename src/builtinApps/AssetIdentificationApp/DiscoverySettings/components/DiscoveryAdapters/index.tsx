import { Fragment, useState } from "react";
import { Badge, Card, Divider, Flex, Grid, LoadingOverlay, Switch, Text } from "@mantine/core";
import { Accordion, Checkbox, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch, IconX } from "@tabler/icons-react";

import { useGetDiscoverySettings } from "@/http/generated/asset-identification-discovery-settings";
import type { GetDiscoverySettingsParams } from "@/http/generated/models";

import DiscoveryAdapterGateways from "./components/DiscoveryAdapterGateways";

type DiscoveryAdapterFilters = Pick<GetDiscoverySettingsParams, "method" | "vendor">;

const DiscoverySettingsDiscoveryAdapters = () => {
  const [queryParams, setQueryParams] = useState<GetDiscoverySettingsParams>({ type: "discovery" });
  const [debouncedParams] = useDebouncedValue(queryParams, 200);
  const discoverySettingsUQ = useGetDiscoverySettings(debouncedParams, {
    query: {
      select: (res) => res?.data,
    },
  });

  const handleUpdateQueryParams = (params: Partial<GetDiscoverySettingsParams>) => {
    setQueryParams((perParams) => ({ ...perParams, ...params }));
  };

  return (
    <Grid p="sm" pt="lg" gutter="lg">
      <LoadingOverlay visible={discoverySettingsUQ.isFetching} />
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
              leftSection={
                queryParams.search ? (
                  <IconX
                    size={15}
                    onClick={() => handleUpdateQueryParams({ search: null })}
                    className="cursor-pointer"
                  />
                ) : (
                  <IconSearch size={15} />
                )
              }
              variant="filled"
              radius="md"
              value={queryParams.search || ""}
              placeholder="Search by adapter Name"
              onChange={(e) => handleUpdateQueryParams({ search: e.target.value })}
            />
            <Divider />
            <Switch
              my="sm"
              labelPosition="left"
              label="Show only used adapters"
              size="md"
              onChange={(e) => handleUpdateQueryParams({ used: e.target.checked })}
              styles={({ other }) => ({
                label: { fontWeight: other.fontWeights.medium },
              })}
            />
            {discoverySettingsUQ?.data?.metadata?.filters?.map(({ label, param, items }) => {
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
      <Grid.Col span={{ xs: 12, lg: 9 }}>
        <Accordion
          variant="separated"
          styles={({ other }) => ({
            chevron: {
              fontWeight: other.fontWeights.bold,
            },
          })}
        >
          {discoverySettingsUQ?.data?.results?.map((item) => (
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
                renderRoot={({ children, ...others }) =>
                  !others["aria-hidden"] && <section {...others}>{children}</section>
                }
              >
                <Text py="xs" c="gray.6">
                  Added Gateways
                </Text>
                <DiscoveryAdapterGateways adapterId={item.id} />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Grid.Col>
    </Grid>
  );
};

export default DiscoverySettingsDiscoveryAdapters;
