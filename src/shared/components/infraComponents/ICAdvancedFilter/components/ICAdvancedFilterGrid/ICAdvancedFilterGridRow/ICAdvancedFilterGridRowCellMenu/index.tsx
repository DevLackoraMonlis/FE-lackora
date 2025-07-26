import type { ICAdvancedFilterProps } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { ActionIcon, Box, Menu, MenuDivider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCopy, IconDotsVertical, IconMinus, IconPlus } from "@tabler/icons-react";

export type ICAdvancedFilterGridRowCellMenuProps<T> = {
	columnName: string;
	cellValue: unknown;
	run: ICAdvancedFilterProps<T>["run"];
	visibleParent: boolean;
	includeCondition: (columnName: string, value: unknown) => void;
	excludeCondition: (columnName: string, value: unknown) => void;
	onCopy: VoidFunction;
};

export default function ICAdvancedFilterGridRowCellMenu<T>(props: ICAdvancedFilterGridRowCellMenuProps<T>) {
	const [opened, handlers] = useDisclosure(false);

	return (
		<Menu
			width={200}
			radius="md"
			shadow="md"
			opened={opened}
			position="bottom-end"
			closeOnClickOutside
			onClose={handlers.close}
		>
			<Menu.Target>
				<Box h={20}>
					{props.visibleParent && (
						<ActionIcon h={20} bg={"gray.1"} variant={"default"} onClick={handlers.open}>
							<IconDotsVertical size={16} />
						</ActionIcon>
					)}
				</Box>
			</Menu.Target>
			{opened && (
				<Menu.Dropdown p={0}>
					<Menu.Item leftSection={<IconCopy size={12} />} onClick={props.onCopy}>
						Copy Value
					</Menu.Item>
					<Menu.Item
						leftSection={<IconPlus size={12} />}
						onClick={() => {
							props.includeCondition(props.columnName, props.cellValue);
						}}
					>
						Filter by Value
					</Menu.Item>
					<Menu.Item
						leftSection={<IconMinus size={12} />}
						onClick={() => {
							props.excludeCondition(props.columnName, props.cellValue);
						}}
					>
						Filter out Value
					</Menu.Item>
					<MenuDivider />
					<Menu.Item
						leftSection={<IconPlus size={12} />}
						onClick={() => {
							props.includeCondition(props.columnName, props.cellValue);
							props.run();
						}}
					>
						Filter by Value & Apply
					</Menu.Item>
					<Menu.Item
						leftSection={<IconMinus size={12} />}
						onClick={() => {
							props.excludeCondition(props.columnName, props.cellValue);
							props.run();
						}}
					>
						Filter out Value & Apply
					</Menu.Item>
				</Menu.Dropdown>
			)}
		</Menu>
	);
}
