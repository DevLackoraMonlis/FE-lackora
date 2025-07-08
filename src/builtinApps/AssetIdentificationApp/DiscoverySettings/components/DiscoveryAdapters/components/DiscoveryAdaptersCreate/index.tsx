import { ActionIcon, Box, Button, Fieldset, Flex, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";
import { Fragment } from "react";

import { getDynamicField } from "@/shared/components/baseComponents/BCDynamicField";
import { configsCreateTransformRq } from "@/shared/components/baseComponents/BCDynamicField";
import type { BCDynamicFieldRs } from "@/shared/components/baseComponents/BCDynamicField/index.types";

import { useCreateDiscoverySetting } from "../../../../index.hooks";

type FormValues = { list: { [key: string]: string }[] };

type Props = {
	refetchDiscoveryAdapters: VoidFunction;
	disabled: boolean;
	adapterId: string;
	fields: BCDynamicFieldRs[];
};

const DiscoveryAdaptersCreateGateway = (props: Props) => {
	const { createDiscoverySetting } = useCreateDiscoverySetting();

	const insertListItem = props.fields.reduce(
		(accumulator, { key }) => {
			accumulator[key] = "";
			return accumulator;
		},
		{ key: randomId() } as Record<string, unknown>,
	);

	const form = useForm<FormValues>({
		initialValues: {
			list: [],
		},
	});

	const handleCreate = (index: number) => {
		const { key, ...values } = form.getValues().list[index] || {};
		const configs = configsCreateTransformRq(props.fields, values);
		createDiscoverySetting.mutate(
			{ adapterId: props.adapterId, data: { configs } },
			{
				onSuccess: () => {
					props.refetchDiscoveryAdapters();
					form.removeListItem("list", index);
				},
			},
		);
	};

	const fields = form.getValues().list.map((item, index) => (
		<Flex key={item.key} gap="xs" mt="xs">
			<Fieldset variant="filled" w="100%" pb="xs" pt="2xs">
				<Flex gap="xs">
					{props.fields.map((item, idx) => (
						<Fragment key={`${item.key}-${idx + 1}`}>
							{getDynamicField({
								otherElementOptions: { withAsterisk: true, style: { flex: 1 } },
								formInputProps: {
									key: form.key(`list.${index}.${item.key}`),
									...form.getInputProps(`list.${index}.${item.key}`),
								},
								...item,
							})}
						</Fragment>
					))}
				</Flex>
			</Fieldset>
			<Flex direction="column" gap="xs" justify="space-between" align="center">
				<ActionIcon size="lg" title="Save" c="gray.2" bg="primary.8" onClick={() => handleCreate(index)}>
					<IconCheck size={20} />
				</ActionIcon>
				<ActionIcon
					size="lg"
					title="Cancel"
					c="gray.8"
					bg="gray.2"
					onClick={() => form.removeListItem("list", index)}
				>
					<IconX size={20} />
				</ActionIcon>
			</Flex>
		</Flex>
	));

	return (
		<Box pos="relative">
			<LoadingOverlay visible={createDiscoverySetting.isPending} />
			{fields}
			<Button
				mt="sm"
				leftSection={<IconPlus size={20} />}
				variant="transparent"
				disabled={props.disabled}
				onClick={() => form.insertListItem("list", insertListItem)}
			>
				Add Gateway
			</Button>
		</Box>
	);
};
export default DiscoveryAdaptersCreateGateway;
