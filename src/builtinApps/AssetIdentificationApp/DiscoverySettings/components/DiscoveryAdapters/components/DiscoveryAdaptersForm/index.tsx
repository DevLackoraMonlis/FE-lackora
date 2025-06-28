import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { TextInput, ActionIcon, Card, Flex, Select, LoadingOverlay, Box } from "@mantine/core";

import type { EachAdapterConfiguration } from "@/http/generated/models";

type FormValues = EachAdapterConfiguration["config"];

type Props = {
  config: FormValues;
  loading: boolean;
  handleEditAdapterConfigurations: (configs: FormValues) => void;
  onCancel: VoidFunction;
};

const DiscoveryAdaptersForm = ({ config, loading, onCancel, handleEditAdapterConfigurations }: Props) => {
  const form = useForm<FormValues>({});

  const handleSubmit = (values: typeof form.values) => {
    handleEditAdapterConfigurations(values);
  };

  useEffect(() => {
    form.initialize(config as FormValues);
  }, [config]);

  return (
    <Box pos="relative">
      <LoadingOverlay visible={loading} />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex gap="xs" mt="xs">
          <Card bg="gray.1" w="100%" pb="xs" pt="2xs">
            <Flex gap="xs">
              <TextInput
                label="IP"
                withAsterisk
                style={{ flex: 1 }}
                key={form.key("ip")}
                {...form.getInputProps("ip")}
              />
              <Select
                label="Connection"
                withAsterisk
                style={{ flex: 1 }}
                data={["React", "Angular", "Vue", "Svelte"]}
                key={form.key("connection")}
                {...form.getInputProps("connection")}
              />
            </Flex>
          </Card>
          <Flex direction="column" gap="xs" justify="space-between" align="center">
            <ActionIcon size="input-sm" title="Save" type="submit" c="gray.2" bg="primary.8">
              <IconCheck size={30} />
            </ActionIcon>
            <ActionIcon size="input-sm" title="Cancel" type="reset" c="gray.8" bg="gray.2" onClick={onCancel}>
              <IconX size={30} />
            </ActionIcon>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};
export default DiscoveryAdaptersForm;
