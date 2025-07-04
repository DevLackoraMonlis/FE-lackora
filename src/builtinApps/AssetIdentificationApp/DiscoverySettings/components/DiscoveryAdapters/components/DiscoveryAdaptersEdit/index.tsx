import { ActionIcon, Box, Fieldset, Flex, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { isObject } from "lodash";
import { useEffect } from "react";

import { configsUpdateTransformRq, getDynamicField } from "@/shared/components/baseComponents/BCDynamicField";
import type {
	BCDynamicConfigRq,
	BCDynamicFieldRs,
} from "@/shared/components/baseComponents/BCDynamicField/index.types";

import type { DiscoveryAdapterConfigurationRs } from "../../../../index.types";

type FormValues = Record<string, unknown>;

type Props = DiscoveryAdapterConfigurationRs & {
	handleDeleteAdapterConfigurations: VoidFunction;
	handleEditAdapterConfigurations: (configs: BCDynamicConfigRq[]) => void;
	fields: BCDynamicFieldRs[];
	loading: boolean;
	onCancel: VoidFunction;
};

const DiscoveryAdaptersForm = ({
	configs = [],
	loading,
	onCancel,
	handleEditAdapterConfigurations,
	fields,
}: Props) => {
	const form = useForm<FormValues>({});

	const handleSubmit = (values: typeof form.values) => {
		const updateValues = configsUpdateTransformRq(configs, values);
		handleEditAdapterConfigurations(updateValues);
	};

	useEffect(() => {
		const formInitialValues = configs.reduce((acc, { value, key }) => {
			acc[key] = isObject(value) ? value?.value : null;
			return acc;
		}, {} as FormValues);
		// initialize
		form.initialize(formInitialValues);
	}, [configs]);

	return (
		<Box pos="relative">
			<LoadingOverlay visible={loading} />
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Flex gap="xs" mt="xs">
					<Fieldset variant="filled" w="100%" pb="xs" pt="2xs">
						<Flex gap="xs">
							{fields.map(({ key, ...item }) => {
								const defaultValue = configs?.find(({ key: configKey }) => key === configKey)?.value;
								return getDynamicField({
									otherElementOptions: {
										withAsterisk: true,
										style: { flex: 1 },
									},
									formInputProps: {
										key: form.key(key),
										...form.getInputProps(key),
									},
									defaultValue,
									key,
									...item,
								});
							})}
						</Flex>
					</Fieldset>
					<Flex direction="column" gap="xs" justify="space-between" align="center">
						<ActionIcon size="lg" title="Save" type="submit" c="gray.2" bg="primary.8">
							<IconCheck size={20} />
						</ActionIcon>
						<ActionIcon size="lg" title="Cancel" type="reset" c="gray.8" bg="gray.2" onClick={onCancel}>
							<IconX size={20} />
						</ActionIcon>
					</Flex>
				</Flex>
			</form>
		</Box>
	);
};
export default DiscoveryAdaptersForm;
