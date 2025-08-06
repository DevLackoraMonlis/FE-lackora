import type { RefObject, Dispatch, SetStateAction } from "react";
import { createElement, Fragment } from "react";
import type { UseFormReturnType } from "@mantine/form";
import { IconPlus, IconX, IconZoomScan } from "@tabler/icons-react";
import { ActionIcon, Button, Card, Flex, Text } from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { omitBy } from "lodash";

import {
  fieldsTransformDependenciesOptions,
  getDynamicField,
} from "@/shared/components/baseComponents/BCDynamicField";

import type { TriggerActionForm, TriggerActionFormList } from "../../index.types";
import { useIconPolicyManagementActions, usePolicyManagementActions } from "../../index.hooks";

function triggerActionGenerator<T extends TriggerActionForm>(
  form: UseFormReturnType<T>,
  updateValueOnce: RefObject<TriggerActionFormList>,
  keyAsTypeAndGroupName: string,
  removeSection: VoidFunction
) {
  const { getPolicyActionIcon } = useIconPolicyManagementActions();
  const { policyActions } = usePolicyManagementActions();
  const [groupName, type] = keyAsTypeAndGroupName.split("|");
  const icon = getPolicyActionIcon(type);
  const sectionData = policyActions?.data?.[groupName as keyof typeof policyActions.data]?.find(
    ({ name }) => name === type
  );

  const onValuesChange = () => {
    setTimeout(() => {
      Object.entries(updateValueOnce.current).forEach(([key, value]) => form.setFieldValue(key, value));
    }, 100);
  };
  const handleRemoveFromList = (index: number) => {
    form.removeListItem(type, index);
    const filterRemoved = omitBy(updateValueOnce.current, (_, key) => key.includes(index.toString()));
    updateValueOnce.current = filterRemoved;
    onValuesChange();
  };
  const handleRemoveSection = () => {
    removeSection();
    form.setFieldValue(type, []);
    const filterRemoved = omitBy(updateValueOnce.current, (_, key) => key.includes(type));
    updateValueOnce.current = filterRemoved;
    onValuesChange();
  };
  const insertListItem = sectionData?.fields.reduce(
    (accumulator, { key }) => {
      accumulator[key] = "";
      return accumulator;
    },
    { key: randomId() } as TriggerActionFormList
  );

  const list = form.getValues()?.[type] as Array<TriggerActionForm>;
  const fields = list?.map((listItem, index) => (
    <Flex key={`${listItem.key}`} gap="xs" mt="xs" w="100%">
      <Flex gap="xs" w="100%">
        {sectionData?.fields.map(({ label, key, ...item }) => {
          const listKey = `${type}.${index}.${key}`;
          const updateDependencyOptions = fieldsTransformDependenciesOptions<TriggerActionFormList>(
            { listKey, key },
            listItem,
            sectionData.fields,
            updateValueOnce
          );
          return (
            <Fragment key={listKey}>
              {getDynamicField({
                otherElementOptions: { withAsterisk: true, style: { flex: 1 } },
                formInputProps: {
                  key: form.key(listKey),
                  ...form.getInputProps(listKey),
                },
                label,
                placeholder: label,
                key,
                ...updateDependencyOptions,
                ...item,
              })}
            </Fragment>
          );
        })}
      </Flex>
      <Flex gap="xs" align="center" mt="2lg">
        <ActionIcon variant="transparent" onClick={() => handleRemoveFromList(index)}>
          <IconX />
        </ActionIcon>
      </Flex>
    </Flex>
  ));

  return (
    <Card withBorder bg="gray.1" bd="1px solid gray.4" shadow="none" mx={0}>
      <Card.Section withBorder inheritPadding py="xs" bg="white">
        <Flex align="center" justify="space-between">
          <Flex gap="xs" align="center">
            {icon ? createElement(icon, { style: { fontSize: 25 } }) : <IconZoomScan />}
            <Text>{sectionData?.display_name}</Text>
          </Flex>
          <ActionIcon variant="transparent" onClick={handleRemoveSection}>
            <IconX />
          </ActionIcon>
        </Flex>
      </Card.Section>
      <Flex gap="xs" pos="relative" direction="column">
        {fields}
      </Flex>
      <Flex mt="md">
        <Button
          leftSection={<IconPlus size={15} />}
          variant="transparent"
          onClick={() => form.insertListItem(type, insertListItem)}
        >
          Add Another
        </Button>
      </Flex>
    </Card>
  );
}

export default function TriggerActionGenerator<T extends TriggerActionForm>({
  triggerActions,
  setTriggerActions,
  form,
  updateValueOnce,
}: {
  triggerActions: string[];
  setTriggerActions: Dispatch<SetStateAction<string[]>>;
  form: UseFormReturnType<T>;
  updateValueOnce: RefObject<TriggerActionFormList>;
}) {
  const removeSection = (triggerAction: string) => {
    const updateActions = triggerActions.filter((item) => item !== triggerAction);
    setTriggerActions(updateActions);
  };
  return triggerActions.map((type = "") =>
    triggerActionGenerator<T>(form, updateValueOnce, type, () => removeSection(type))
  );
}
