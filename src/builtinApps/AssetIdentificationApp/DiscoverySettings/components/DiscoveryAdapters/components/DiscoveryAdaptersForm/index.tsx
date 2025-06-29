import { useEffect } from "react";
import { useStore } from "zustand";
import { useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { ActionIcon, Flex, LoadingOverlay, Box, Fieldset } from "@mantine/core";

import { getDynamicField } from "@/shared/components/baseComponents/BCDynamicField";

import { discoveryAdaptersStore } from "../../../../index.store";

type FormValues = Record<string, unknown>;

type Props = {
  adapterId: string;
  config: FormValues;
  loading: boolean;
  handleEditAdapterConfigurations: (configs: FormValues) => void;
  onCancel: VoidFunction;
};

const DiscoveryAdaptersForm = ({
  adapterId,
  config,
  loading,
  onCancel,
  handleEditAdapterConfigurations,
}: Props) => {
  const discoveryAdapterFormFields = useStore(discoveryAdaptersStore, (state) => state.formFields);
  const formFields = discoveryAdapterFormFields[adapterId];

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
          <Fieldset variant="filled" w="100%" pb="xs" pt="2xs">
            <Flex gap="xs">
              {formFields?.map((item) =>
                getDynamicField({
                  otherElementOptions: { withAsterisk: true, style: { flex: 1 } },
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
