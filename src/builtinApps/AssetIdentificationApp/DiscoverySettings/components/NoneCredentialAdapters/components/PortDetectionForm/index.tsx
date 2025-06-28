import { useForm } from "@mantine/form";
import { TextInput, ActionIcon, Button, Select, Flex } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";

type FormValues = { ports: { name: string; protocol: string; portRange: string; key: string }[] };

const NoneCredentialAdaptersPortDetectionForm = () => {
  const form = useForm<FormValues>({
    initialValues: {
      ports: [{ name: "", protocol: "", portRange: "", key: "string" }],
    },
  });

  const fields = form.getValues().ports.map((item, index) => (
    <Flex key={item.key} gap="xs">
      <Select
        label={index ? "" : "Name"}
        pt={index ? "md" : ""}
        withAsterisk
        style={{ flex: 3 }}
        data={["React", "Angular", "Vue", "Svelte"]}
        key={form.key(`ports.${index}.name`)}
        {...form.getInputProps(`ports.${index}.name`)}
      />
      <Select
        label={index ? "" : "Protocol"}
        pt={index ? "md" : ""}
        withAsterisk
        style={{ flex: 3 }}
        data={["React", "Angular", "Vue", "Svelte"]}
        key={form.key(`ports.${index}.protocol`)}
        {...form.getInputProps(`ports.${index}.protocol`)}
      />
      <Flex style={{ flex: 4 }} gap="xs" align="center">
        <TextInput
          label={index ? "" : "Port Range"}
          pt={index ? "sm" : ""}
          w="100%"
          placeholder="e.g., 22, 1000–2000 (1–65535)"
          withAsterisk
          key={form.key(`ports.${index}.portRange`)}
          {...form.getInputProps(`ports.${index}.portRange`)}
        />
        <Flex gap="xs" pt={index ? "sm" : 23} align="center">
          <ActionIcon
            size="input-sm"
            title="Save"
            c="gray.2"
            bg="primary.8"
            onClick={() => form.removeListItem("ports", index)}
          >
            <IconCheck size={30} />
          </ActionIcon>
          <ActionIcon
            size="input-sm"
            title="Cancel"
            c="gray.8"
            bg="gray.2"
            onClick={() => form.removeListItem("ports", index)}
          >
            <IconX size={30} />
          </ActionIcon>
        </Flex>
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
        onClick={() =>
          form.insertListItem("ports", { name: "", protocol: "", portRange: "", key: randomId() })
        }
      >
        Add Another
      </Button>
    </>
  );
};

export default NoneCredentialAdaptersPortDetectionForm;
