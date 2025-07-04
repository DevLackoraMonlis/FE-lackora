import { ActionIcon, Box, Flex, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { isObject } from "lodash";
import { useEffect } from "react";

import { configsTransformRq, getDynamicField } from "@/shared/components/baseComponents/BCDynamicField";
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

const NoneCredentialEditForm = ({
	configs = [],
	loading,
	onCancel,
	handleEditAdapterConfigurations,
	fields,
}: Props) => {
	const form = useForm<FormValues>({});

	const handleSubmit = (values: typeof form.values) => {
		const updateValues = configsTransformRq(configs, values);
		handleEditAdapterConfigurations(updateValues);
	};

	useEffect(() => {
		const formInitialValues = configs.reduce((acc, { value, key }) => {
			acc[key] = isObject(value) ? value?.value : null;
			return acc;
		}, {} as FormValues);

		form.initialize(formInitialValues);
	}, [configs]);

	return (
		<Box pos="relative">
			<LoadingOverlay visible={loading} />
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Flex gap="xs" mt="xs">
					<Flex gap="xs" w="100%">
						{fields.map(({ label, ...item }) => {
							return getDynamicField({
								otherElementOptions: {
									withAsterisk: true,
									style: { flex: 1 },
								},
								formInputProps: {
									key: form.key(item.key),
									...form.getInputProps(item.key),
								},
								label: "",
								...item,
							});
						})}
					</Flex>
					<Flex gap="xs" align="center">
						<ActionIcon size="lg" title="Save" c="gray.2" bg="primary.8" type="submit">
							<IconCheck size={20} />
						</ActionIcon>
						<ActionIcon size="lg" title="Cancel" c="gray.8" bg="gray.2" type="reset" onClick={onCancel}>
							<IconX size={20} />
						</ActionIcon>
					</Flex>
				</Flex>
			</form>
		</Box>
	);
};
export default NoneCredentialEditForm;
