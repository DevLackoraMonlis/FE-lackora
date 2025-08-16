import { ActionIcon, Button, Card, Flex, Text } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconPlus, IconX, IconZoomScan } from "@tabler/icons-react";
import { omitBy } from "lodash";
import type { RefObject } from "react";
import { Fragment, createElement, useEffect, useMemo } from "react";

import {
	fieldsTransformDependenciesOptions,
	getDynamicField,
} from "@/shared/components/baseComponents/BCDynamicField";

import { useIconPolicyManagementActions, usePolicyManagementActions } from "../../index.hooks";
import type { TriggerActionForm, TriggerActionFormList } from "../../index.types";

type Props<T extends TriggerActionForm> = {
	values: T;
	triggerActions: string[];
	form: UseFormReturnType<T>;
	updateValueByDependency: RefObject<TriggerActionFormList>;
	triggerAction: string;
};

export default function TriggerActionGenerator<T extends TriggerActionForm>({
	form,
	values,
	updateValueByDependency,
	triggerAction,
}: Props<T>) {
	const { getPolicyActionIcon } = useIconPolicyManagementActions();
	const { policyActions } = usePolicyManagementActions();
	const [groupName, type, actionId] = triggerAction.split("|");
	const icon = getPolicyActionIcon(type);
	const sectionData = useMemo(() => {
		return policyActions?.data?.[groupName as keyof typeof policyActions.data]?.find(
			({ name }) => name === type,
		);
	}, [policyActions.isLoading, type, groupName]);

	const onValuesChange = () => {
		Object.entries(updateValueByDependency.current).forEach(([key, value]) => {
			form.setFieldValue(key, value as never);
		});
	};
	const handleRemoveFromList = (index: number) => {
		form.removeListItem(triggerAction, index);
		const filterRemoved = omitBy(updateValueByDependency.current, (_, key) => key.includes(index.toString()));
		updateValueByDependency.current = filterRemoved;
		onValuesChange();
	};
	const handleRemoveSection = () => {
		const perValues = form.getValues();
		delete perValues[triggerAction];
		form.setValues(perValues);
		const filterRemoved = omitBy(updateValueByDependency.current, (_, key) => key.includes(triggerAction));
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
				{ key: randomId(), fields: sectionData.fields, actionId } as TriggerActionFormList,
			),
		[sectionData?.fields?.length],
	);

	const fields = values?.[triggerAction]?.map((listItem, index) => (
		<Flex key={`${listItem.key}`} gap="xs" mt="xs" w="100%">
			<Flex gap="xs" w="100%">
				{sectionData?.fields.map(({ label, key, ...item }) => {
					const defaultValue = { label: listItem[key] as string, value: listItem[key] as string };
					const listKey = `${triggerAction}.${index}.${key}`;
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
								defaultValue,
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

	useEffect(() => {
		if (!policyActions.isLoading && sectionData?.fields?.length && !fields?.length) {
			form.insertListItem(triggerAction, insertListItem);
		}
	}, [fields?.length, policyActions.isLoading]);

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
					onClick={() => form.insertListItem(triggerAction, insertListItem)}
					size="xs"
				>
					Add another
				</Button>
			</Flex>
		</Card>
	);
}
