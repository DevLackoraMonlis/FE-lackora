import { ActionIcon, Box, Button, Flex, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";

import { configsCreateTransformRq, getDynamicField } from "@/shared/components/baseComponents/BCDynamicField";
import type { BCDynamicFieldRs } from "@/shared/components/baseComponents/BCDynamicField/index.types";

import { useCreateDiscoverySetting } from "../../../../index.hooks";

type FormValues = { list: { [key: string]: string }[] };

type Props = {
	refetchDiscoveryAdapters: VoidFunction;
	disabled: boolean;
	adapterId: string;
	fields: BCDynamicFieldRs[];
};

const NoneCredentialCreate = (props: Props) => {
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
			<Flex gap="xs" w="100%">
				{props.fields.map(({ label, key, ...item }) => {
					return getDynamicField({
						otherElementOptions: { withAsterisk: true, style: { flex: 1 } },
						formInputProps: {
							key: form.key(`list.${index}.${key}`),
							...form.getInputProps(`list.${index}.${key}`),
						},
						label: "",
						renderFooterInList: key === "web_service" && (
							<Button size="sm" leftSection={<IconPlus size={15} />} variant="transparent">
								Add Custom Web Service
							</Button>
						),
						key,
						...item,
					});
				})}
			</Flex>
			<Flex gap="xs" align="center">
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
				Add Another
			</Button>
		</Box>
	);
};
export default NoneCredentialCreate;
