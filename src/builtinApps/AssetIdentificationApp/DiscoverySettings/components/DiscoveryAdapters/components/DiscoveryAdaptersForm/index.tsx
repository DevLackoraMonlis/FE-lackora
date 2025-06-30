import { ActionIcon, Box, Fieldset, Flex, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect } from "react";

import { getDynamicField } from "@/shared/components/baseComponents/BCDynamicField";

import type {
  DiscoveryAdapterApiField,
  DiscoveryAdapterConfiguration,
  DiscoveryAdapterConfigurationRs,
  DiscoveryAdapterFieldObjectType,
} from "../../../../index.types";

type FormValues = Record<string, unknown>;

type Props = DiscoveryAdapterConfigurationRs & {
  handleDeleteAdapterConfigurations: VoidFunction;
  handleEditAdapterConfigurations: (configs: DiscoveryAdapterConfiguration[]) => void;
  fields: DiscoveryAdapterApiField[];
  loading: boolean;
  onCancel: VoidFunction;
};

const DiscoveryAdaptersForm = ({
  configs = [],
  loading,
  onCancel,
  handleEditAdapterConfigurations,
  fields,
}: Props) => {
  const form = useForm<FormValues>({});

  const handleSubmit = (values: typeof form.values) => {
    const updateValues = configs.map(({ value, key, ...item }) => ({
      ...item,
      key,
      value: values[key] as string,
    }));
    handleEditAdapterConfigurations(updateValues);
  };

  useEffect(() => {
    let formInitialValues = configs.reduce((acc, { value, key }) => {
      acc[key] = value;
      return acc;
    }, {} as FormValues);

    form.initialize(formInitialValues);
  }, [configs]);

  return (
    <Box pos="relative">
      <LoadingOverlay visible={loading} />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex gap="xs" mt="xs">
          <Fieldset variant="filled" w="100%" pb="xs" pt="2xs">
            <Flex gap="xs">
              {fields.map((item) =>
                getDynamicField({
                  otherElementOptions: {
                    withAsterisk: true,
                    style: { flex: 1 },
                  },
                  formInputProps: {
                    key: form.key(item.key),
                    ...form.getInputProps(item.key),
                  },
                  ...item,
                })
              )}
            </Flex>
          </Fieldset>
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
