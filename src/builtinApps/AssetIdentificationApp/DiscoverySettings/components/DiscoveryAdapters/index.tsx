import { Fragment, useState } from "react";
import { Badge, Card, Divider, Flex, Grid, LoadingOverlay, Switch, Text } from "@mantine/core";
import { Accordion, Checkbox, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch, IconX } from "@tabler/icons-react";

import type { DiscoveryAdapterFilters } from "../../index.types";
import { useDiscoveryAdapters } from "../../index.hooks";

import DiscoveryAdapterGateways from "./components/DiscoveryAdapterGateways";

const defaultQueryParams = {
  page: 1,
  limit: 999,
  type: "discovery",
};

export default function DiscoverySettingsDiscoveryAdapters() {
  const [queryParams, setQueryParams] = useState<DiscoveryAdapterFilters>(defaultQueryParams);
  const [debouncedParams] = useDebouncedValue(queryParams, 200);
  const { discoveryAdapters } = useDiscoveryAdapters(debouncedParams);

  const handleUpdateQueryParams = (params: Partial<DiscoveryAdapterFilters>) => {
    setQueryParams((perParams) => ({ ...perParams, ...params }));
  };

  return (
    <Grid p="sm" pt="lg" gutter="lg">
      <LoadingOverlay visible={discoveryAdapters.isLoading} />
      <Grid.Col span={{ xs: 12, lg: 3 }}>
        <Card withBorder shadow="sm" radius="md" bd="1px solid gray.4" h="80dvh">
          <Card.Section withBorder inheritPadding py="2xs" fw="bold" bg="gray.2">
            Filter
          </Card.Section>
          <Card.Section withBorder inheritPadding py="2xs">
            <TextInput
              my="sm"
              leftSection={
                queryParams.search ? (
                  <IconX
                    size={15}
                    onClick={() => handleUpdateQueryParams({ search: "" })}
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
            />
            {discoveryAdapters?.data?.metadata?.filters?.map(({ label, param, items }) => {
              const value = (queryParams[param] || []) as string[];
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
                    onChange={(value) =>
                      handleUpdateQueryParams({
                        [param]: value?.length ? value : null,
                      })
                    }
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
        <Accordion variant="separated">
          {discoveryAdapters?.data?.results?.map((item) => (
            <Accordion.Item key={item.id} value={item.id}>
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
                    <Badge variant="light" color={item.is_used ? "green" : "gray"} p="md">
                      <Text p="2xs">{item.is_used ? "USED" : "UNUSED"}</Text>
                    </Badge>
                    <Badge variant="light" radius="xs" p="lg">
                      <Text tt="capitalize" p="2xs">
                        Configure
                      </Text>
                    </Badge>
                  </Flex>
                </Flex>
              </Accordion.Control>
              <Accordion.Panel>
                <Text py="xs" c="gray.6">
                  Added Gateways
                </Text>
                {/* DiscoveryAdapterGateways */}
                <DiscoveryAdapterGateways
                  adapterId={item.id}
                  adapterGateways={item.configurations}
                  fields={item.fields}
                  isFetching={discoveryAdapters.isFetching}
                  refetchDiscoveryAdapters={discoveryAdapters.refetch}
                />
                {/* DiscoveryAdapterGateways */}
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Grid.Col>
    </Grid>
  );
}
