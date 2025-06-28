import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";
import { TextInput, ActionIcon, Button, Card, Flex, Select, LoadingOverlay, Box } from "@mantine/core";

import { useCreateDiscoverySettingConfiguration } from "@/http/generated/asset-identification-discovery-settings";

import { ADAPTER_CONFIGURATIONS_QUERY_KEY } from "../../../../index.constants";

type FormValues = { gateways: { ip: string; connection: string; key: string }[] };

type Props = {
  disabled: boolean;
  adapterId: string;
};

const DiscoveryAdaptersAddGateway = (props: Props) => {
  const queryClient = useQueryClient();
  const createAdapterConfigurations = useCreateDiscoverySettingConfiguration();

  const form = useForm<FormValues>({
    initialValues: {
      gateways: [],
    },
  });

  const handleCreateGateways = (index: number) => {
    const { connection, ip } = form.getValues().gateways[index] || {};
    if (!connection || !ip) {
      return form.setErrors({
        [`gateways.${index}.ip`]: ip ? "" : "Field is required",
        [`gateways.${index}.connection`]: connection ? "" : "Field is required",
      });
    }
    createAdapterConfigurations.mutate(
      { adapterId: props.adapterId, data: { configs: { connection, ip } } },
      {
        onSuccess: () => {
          queryClient.refetchQueries({ queryKey: [ADAPTER_CONFIGURATIONS_QUERY_KEY] });
          form.removeListItem("gateways", index);
        },
      }
    );
  };

  const fields = form.getValues().gateways.map((item, index) => (
    <Flex key={item.key} gap="xs" mt="xs">
      <Card bg="gray.1" w="100%" pb="xs" pt="2xs">
        <Flex gap="xs">
          <TextInput
            label="IP"
            withAsterisk
            style={{ flex: 1 }}
            key={form.key(`gateways.${index}.ip`)}
            {...form.getInputProps(`gateways.${index}.ip`)}
          />
          <Select
            label="Connection"
            withAsterisk
            style={{ flex: 1 }}
            data={["React", "Angular", "Vue", "Svelte"]}
            key={form.key(`gateways.${index}.connection`)}
            {...form.getInputProps(`gateways.${index}.connection`)}
          />
        </Flex>
      </Card>
      <Flex direction="column" gap="xs" justify="space-between" align="center">
        <ActionIcon
          size="input-sm"
          title="Save"
          c="gray.2"
          bg="primary.8"
          onClick={() => handleCreateGateways(index)}
        >
          <IconCheck size={30} />
        </ActionIcon>
        <ActionIcon
          size="input-sm"
          title="Cancel"
          c="gray.8"
          bg="gray.2"
          onClick={() => form.removeListItem("gateways", index)}
        >
          <IconX size={30} />
        </ActionIcon>
      </Flex>
    </Flex>
  ));

  return (
    <Box pos="relative">
      <LoadingOverlay visible={createAdapterConfigurations.isPending} />
      {fields}
      <Button
        mt="sm"
        leftSection={<IconPlus size={20} />}
        variant="transparent"
        disabled={props.disabled}
        onClick={() => form.insertListItem("gateways", { ip: "", connection: "", key: randomId() })}
      >
        Add Gateway
      </Button>
    </Box>
  );
};
export default DiscoveryAdaptersAddGateway;
