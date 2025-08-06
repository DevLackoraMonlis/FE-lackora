import { Fragment, type RefObject, createElement, useState } from "react";
import { Button, Card, Combobox, Flex, Text, useCombobox } from "@mantine/core";
import { IconChevronCompactDown, IconPlus, IconZoomScan } from "@tabler/icons-react";
import type { UseFormReturnType } from "@mantine/form";

import TriggerActionGenerator from "./components/TriggerActionGenerator";
import { useIconPolicyManagementActions, usePolicyManagementActions } from "./index.hooks";
import type { TriggerActionForm, TriggerActionFormList, TriggerActionIcons } from "./index.types";

type SelectOptionProps = {
  label: string;
  description: string;
  disabled: boolean;
  iconType?: TriggerActionIcons;
};

function SelectOption({ iconType, label, description, disabled }: SelectOptionProps) {
  return (
    <Card m={0} p={0}>
      <Flex gap="md" p="xs" bg={disabled ? "gray.3" : "gray.1"}>
        <Flex justify="center" align="center" fz="h1" bg="transparent">
          {iconType ? createElement(iconType) : <IconZoomScan />}
        </Flex>
        <Flex direction="column">
          <Text fz="sm">{label}</Text>
          <Text fz="xs" c="dimmed">
            {description}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}

export default function BCTriggerActions<T extends TriggerActionForm>({
  form,
  updateValueOnce,
}: {
  form: UseFormReturnType<T>;
  updateValueOnce: RefObject<TriggerActionFormList>;
}) {
  const [triggerActions, setTriggerActions] = useState<string[]>([]);
  const { getPolicyActionIcon } = useIconPolicyManagementActions();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const { policyActions } = usePolicyManagementActions();
  const options = Object.entries(policyActions?.data || {}).map(([groupName, list]) => (
    <Fragment key={groupName}>
      <Text c="dimmed" py="xs" px="2x">
        {groupName}
      </Text>
      {list?.map((item) => {
        if (!form.getValues()?.[item.name]) {
          form.setFieldValue(item.name, []);
        }
        const key = `${groupName}|${item.name}`;
        const disabled = triggerActions.includes(key);
        return (
          <Combobox.Option key={key} value={key} m={0} p="3xs" disabled={disabled}>
            <SelectOption
              iconType={getPolicyActionIcon(item.name)}
              label={item.display_name}
              description={item.description}
              disabled={disabled}
            />
          </Combobox.Option>
        );
      })}
    </Fragment>
  ));

  return (
    <>
      <TriggerActionGenerator<T> {...{ triggerActions, setTriggerActions, form, updateValueOnce }} />
      <Combobox
        withinPortal
        store={combobox}
        onOptionSubmit={(val) => {
          setTriggerActions((perArray) => [...perArray, val]);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <Flex w="500px" mt="sm">
            <Button
              loading={policyActions.isLoading}
              variant="transparent"
              rightSection={<IconChevronCompactDown size={15} />}
              leftSection={<IconPlus size={15} />}
              onClick={() => combobox.toggleDropdown()}
            >
              Add actions
            </Button>
          </Flex>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options style={{ maxHeight: 400, overflow: "auto" }}>
            <Flex direction="column" px="sm" pb="xs">
              {options}
            </Flex>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}
