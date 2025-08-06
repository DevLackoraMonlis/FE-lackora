import { Button, Card, Combobox, Flex, Text, useCombobox } from "@mantine/core";
import { IconChevronCompactDown, IconPlus } from "@tabler/icons-react";
import { Fragment, useState } from "react";
import { FcFolder } from "react-icons/fc";

import TriggerActionGenerator from "./components/TriggerActionGenerator";

const groceries = [
	{
		groupName: "groupName 1",
		list: [
			{ icon: <FcFolder />, value: "Apples", description: "Crisp and refreshing fruit" },
			{ icon: <FcFolder />, value: "Bananas", description: "Naturally sweet and potassium-rich fruit" },
			{ icon: <FcFolder />, value: "Broccoli", description: "Nutrient-packed green vegetable" },
			{ icon: <FcFolder />, value: "Carrots", description: "Crunchy and vitamin-rich root vegetable" },
			{ icon: <FcFolder />, value: "Chocolate", description: "Indulgent and decadent treat" },
		],
	},
	{
		groupName: "groupName 2",
		list: [
			{ icon: <FcFolder />, value: "Apples", description: "Crisp and refreshing fruit" },
			{ icon: <FcFolder />, value: "Bananas", description: "Naturally sweet and potassium-rich fruit" },
			{ icon: <FcFolder />, value: "Broccoli", description: "Nutrient-packed green vegetable" },
			{ icon: <FcFolder />, value: "Carrots", description: "Crunchy and vitamin-rich root vegetable" },
			{ icon: <FcFolder />, value: "Chocolate", description: "Indulgent and decadent treat" },
		],
	},
];

type SelectOptions = (typeof groceries)[number]["list"][number] & { disabled: boolean };
function SelectOption({ icon, value, description, disabled }: SelectOptions) {
	return (
		<Card m={0} p={0}>
			<Flex gap="md" p="xs" bg={disabled ? "gray.3" : "gray.1"}>
				<Flex justify="center" align="center" fz="h1" bg="transparent">
					{icon}
				</Flex>
				<Flex direction="column">
					<Text fz="sm">{value}</Text>
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

	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});
	const options = groceries.map(({ groupName, list }) => (
		<Fragment key={groupName}>
			<Text c="dimmed" py="xs" px="2x">
				{groupName}
			</Text>
			{list.map((item) => {
				const disabled = triggerActions.includes(item.value);
				return (
					<Combobox.Option key={item.value} m={0} p="3xs" value={item.value} disabled={disabled}>
						<SelectOption {...item} disabled={disabled} />
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
