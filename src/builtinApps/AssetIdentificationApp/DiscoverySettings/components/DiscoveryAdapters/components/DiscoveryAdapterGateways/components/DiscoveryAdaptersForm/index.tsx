import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { TextInput, ActionIcon, Button, Card, Flex, Select } from "@mantine/core";
import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";

type GatewayForm = { gateways: { ip: string; connection: string; key: string }[] };

const DiscoveryAdaptersForm = () => {
  const form = useForm<GatewayForm>({
    mode: "uncontrolled",
    initialValues: {
      gateways: [],
    },
  });

  const fields = form.getValues().gateways.map((item, index) => (
    <Flex key={item.key} gap="xs" mt="xs">
      <Card bg="gray.1" w="100%" pb="xs" pt="2xs">
        <Flex gap="xs">
          <TextInput
            label="IP"
            withAsterisk
            style={{ flex: 1 }}
            key={form.key(`gateways.${index}.ip`)}
            {...form.getInputProps(`employees.${index}.ip`)}
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
          onClick={() => form.removeListItem("gateways", index)}
          styles={({ colors, other: { darkMode } }) => ({
            root: { background: darkMode ? colors.primary[2] : colors.primary[9] },
            icon: { color: darkMode ? colors.gray[7] : colors.gray[2] },
          })}
        >
          <IconCheck size={30} />
        </ActionIcon>
        <ActionIcon
        size="input-sm"
          title="Cancel"
          onClick={() => form.removeListItem("gateways", index)}
          styles={({ colors, other: { darkMode } }) => ({
            root: { background: darkMode ? colors.gray[6] : colors.gray[2] },
            icon: { color: darkMode ? colors.gray[2] : colors.gray[7] },
          })}
        >
          <IconX size={30} />
        </ActionIcon>
      </Flex>
    </Flex>
  ));

  return (
    <>
      {fields}
      <Button
        mt="sm"
        leftSection={<IconPlus size={20} />}
        variant="transparent"
        onClick={() => form.insertListItem("gateways", { ip: "", connection: "", key: randomId() })}
      >
        Add Gateway
      </Button>
    </>
  );
};
export default DiscoveryAdaptersForm;
