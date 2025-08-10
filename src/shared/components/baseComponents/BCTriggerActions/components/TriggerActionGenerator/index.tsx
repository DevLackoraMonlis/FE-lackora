import { ActionIcon, Button, Card, Flex, Text } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconPlus, IconX, IconZoomScan } from "@tabler/icons-react";
import { omitBy } from "lodash";
import type { Dispatch, RefObject, SetStateAction } from "react";
import { Fragment, createElement, useMemo } from "react";

import {
	fieldsTransformDependenciesOptions,
	getDynamicField,
} from "@/shared/components/baseComponents/BCDynamicField";

import { useIconPolicyManagementActions, usePolicyManagementActions } from "../../index.hooks";
import type { TriggerActionForm, TriggerActionFormList } from "../../index.types";

type Props<T extends TriggerActionForm> = {
	triggerActions: string[];
	setTriggerActions: Dispatch<SetStateAction<string[]>>;
	form: UseFormReturnType<T>;
	updateValueByDependency: RefObject<TriggerActionFormList>;
	triggerAction: string;
};

export default function TriggerActionGenerator<T extends TriggerActionForm>({
	form,
	updateValueByDependency,
	triggerAction,
	triggerActions,
	setTriggerActions,
}: Props<T>) {
	const { getPolicyActionIcon } = useIconPolicyManagementActions();
	const { policyActions } = usePolicyManagementActions();
	const [groupName, type] = triggerAction.split("|");
	const icon = getPolicyActionIcon(type);
	const sectionData = useMemo(
		() =>
			policyActions?.data?.[groupName as keyof typeof policyActions.data]?.find(({ name }) => name === type),
		[policyActions.isLoading, type, groupName],
	);

	const onValuesChange = () => {
		setTimeout(() => {
			Object.entries(updateValueByDependency.current).forEach(([key, value]) => {
				form.setFieldValue(key, value as never);
			});
		}, 100);
	};
	const handleRemoveFromList = (index: number) => {
		form.removeListItem(type, index);
		const filterRemoved = omitBy(updateValueByDependency.current, (_, key) => key.includes(index.toString()));
		updateValueByDependency.current = filterRemoved;
		onValuesChange();
	};
	const handleRemoveSection = () => {
		const updateActions = triggerActions.filter((item) => item !== triggerAction);
		setTriggerActions(updateActions);
		form.setFieldValue(type, [] as never);
		const filterRemoved = omitBy(updateValueByDependency.current, (_, key) => key.includes(type));
		updateValueByDependency.current = filterRemoved;
		onValuesChange();
	};
	const insertListItem = useMemo(
		() =>
			sectionData?.fields.reduce(
				(accumulator, { key }) => {
					accumulator[key] = "";
					return accumulator;
				},
				{ key: randomId(), fields: sectionData.fields } as TriggerActionFormList,
			),
		[sectionData?.fields?.length],
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
						updateValueByDependency,
					);
					return (
						<Fragment key={listKey}>
							{getDynamicField({
								otherElementOptions: { withAsterisk: true, style: { flex: 1 } },
								formInputProps: {
									key: form.key(listKey),
									...form.getInputProps(listKey),
								},
								label: index ? "" : label,
								placeholder: label,
								key,
								...item,
								...updateDependencyOptions,
							})}
						</Fragment>
					);
				})}
			</Flex>
			<Flex gap="xs" align="center" mt={index ? "none" : "2lg"}>
				<ActionIcon variant="transparent" onClick={() => handleRemoveFromList(index)}>
					<IconX />
				</ActionIcon>
			</Flex>
		</Flex>
	));

	return (
		<Card withBorder bg="gray.1" bd="1px solid gray.4" shadow="none" mx={0} mt="xs">
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
