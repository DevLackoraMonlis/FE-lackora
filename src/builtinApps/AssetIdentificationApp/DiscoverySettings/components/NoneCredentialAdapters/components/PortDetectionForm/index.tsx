import { useForm } from "@mantine/form";
import { TextInput, ActionIcon, Button, Select, Flex } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";

type GatewayForm = { ports: { name: string; protocol: string; portRange: string; key: string }[] };

const NoneCredentialAdaptersPortDetectionForm = () => {
  const form = useForm<GatewayForm>({
    mode: "uncontrolled",
    initialValues: {
      ports: [{ name: "", protocol: "", portRange: "", key: "string" }],
    },
  });

  const fields = form.getValues().ports.map((item, index) => (
    <Flex key={item.key} gap="xs">
      <Select
        styles={({ other: { fontWeights } }) => ({ label: { fontWeight: fontWeights.bold } })}
        label={index ? "" : "Name"}
        pt={index ? "md" : ""}
        withAsterisk
        style={{ flex: 3 }}
        data={["React", "Angular", "Vue", "Svelte"]}
        key={form.key(`ports.${index}.name`)}
        {...form.getInputProps(`ports.${index}.name`)}
      />
      <Select
        styles={({ other: { fontWeights } }) => ({ label: { fontWeight: fontWeights.bold } })}
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
          styles={({ other: { fontWeights } }) => ({ label: { fontWeight: fontWeights.bold } })}
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
            onClick={() => form.removeListItem("ports", index)}
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
            onClick={() => form.removeListItem("ports", index)}
            styles={({ colors, other: { darkMode } }) => ({
              root: { background: darkMode ? colors.gray[6] : colors.gray[2] },
              icon: { color: darkMode ? colors.gray[2] : colors.gray[7] },
            })}
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
