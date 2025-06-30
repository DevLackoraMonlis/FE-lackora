import { ActionIcon, Box, Button, Fieldset, Flex, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";

import { useCreateDiscoverySettingConfiguration } from "@/http/generated/asset-identification-discovery-settings";
import { getDynamicField } from "@/shared/components/baseComponents/BCDynamicField";

import type { DiscoveryField } from "@/builtinApps/AssetIdentificationApp/DiscoverySettings/index.types";
import { GET_DISCOVERY_SETTING_CONFIGURATIONS_QUERY_KEY } from "../../../../index.constants";

type FormValues = { gateways: { [key: string]: string }[] };

type Props = {
	disabled: boolean;
	adapterId: string;
	fields: DiscoveryField;
};

const DiscoveryAdaptersAddGateway = (props: Props) => {
	const queryClient = useQueryClient();
	const createDiscoverySettingConfiguration = useCreateDiscoverySettingConfiguration();

	const insertListItem = props.fields.reduce(
		(accumulator, { key }) => {
			accumulator[key] = "";
			return accumulator;
		},
		{ key: randomId() } as Record<string, unknown>,
	);

	const form = useForm<FormValues>({
		initialValues: {
			gateways: [],
		},
	});

	const handleCreateGateways = (index: number) => {
		const { connection, ip } = form.getValues().gateways[index] || {};
		if (!connection || !ip) {
			return form.setErrors({
				[`gateways.${index}.ip`]: ip ? "" : "Field is required",
				[`gateways.${index}.connection`]: connection ? "" : "Field is required",
			});
		}
		createDiscoverySettingConfiguration.mutate(
			{ adapterId: props.adapterId, data: { configs: { connection, ip } } },
			{
				onSuccess: () => {
					queryClient.refetchQueries({
						queryKey: [GET_DISCOVERY_SETTING_CONFIGURATIONS_QUERY_KEY],
					});
					form.removeListItem("gateways", index);
				},
			},
		);
	};

	const fields = form.getValues().gateways.map((item, index) => (
		<Flex key={item.key} gap="xs" mt="xs">
			<Fieldset variant="filled" w="100%" pb="xs" pt="2xs">
				<Flex gap="xs">
					{props.fields.map((item) =>
						getDynamicField({
							otherElementOptions: { withAsterisk: true, style: { flex: 1 } },
							formInputProps: {
								key: form.key(`gateways.${index}.${item.key}`),
								...form.getInputProps(`gateways.${index}.${item.key}`),
							},
							...item,
						}),
					)}
				</Flex>
			</Fieldset>
			<Flex direction="column" gap="xs" justify="space-between" align="center">
				<ActionIcon
					size="input-sm"
					title="Save"
					c="gray.2"
					bg="primary.8"
					onClick={() => handleCreateGateways(index)}
				>
					<IconCheck size={30} />
				</ActionIcon>
				<ActionIcon
					size="input-sm"
					title="Cancel"
					c="gray.8"
					bg="gray.2"
					onClick={() => form.removeListItem("gateways", index)}
				>
					<IconX size={30} />
				</ActionIcon>
			</Flex>
		</Flex>
	));

	return (
		<Box pos="relative">
			<LoadingOverlay visible={createDiscoverySettingConfiguration.isPending} />
			{fields}
			<Button
				mt="sm"
				leftSection={<IconPlus size={20} />}
				variant="transparent"
				disabled={props.disabled}
				onClick={() => form.insertListItem("gateways", insertListItem)}
			>
				Add Gateway
			</Button>
		</Box>
	);
};
export default DiscoveryAdaptersAddGateway;
