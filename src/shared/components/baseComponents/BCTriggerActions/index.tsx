import { Button, Card, Combobox, Flex, Text, useCombobox } from "@mantine/core";
import { IconChevronCompactDown, IconPlus, IconZoomScan } from "@tabler/icons-react";
import { Fragment, createElement, useState } from "react";

import TriggerActionGenerator from "./components/TriggerActionGenerator";
import { useIconPolicyManagementActions, usePolicyManagementActions } from "./index.hooks";
import type { PolicyIconType } from "./index.types";

type SelectOptionProps = {
	label: string;
	description: string;
	disabled: boolean;
	iconType?: PolicyIconType;
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

export default function BCTriggerActions() {
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
				const disabled = triggerActions.includes(item.id);
				return (
					<Combobox.Option key={item.id} m={0} p="3xs" value={item.id} disabled={disabled}>
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
			<TriggerActionGenerator {...{ triggerActions, setTriggerActions }} />
			<Combobox
				position="bottom"
				withinPortal={true}
				store={combobox}
				onOptionSubmit={(val) => {
					setTriggerActions((perArray) => [...perArray, val]);
					combobox.closeDropdown();
				}}
			>
				<Combobox.Target>
					<Button
						loading={policyActions.isLoading}
						w="500px"
						variant="transparent"
						rightSection={<IconChevronCompactDown size={15} />}
						leftSection={<IconPlus size={15} />}
						onClick={() => combobox.toggleDropdown()}
					>
						Add actions
					</Button>
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
