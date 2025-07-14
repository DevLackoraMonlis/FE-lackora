import { ActionIcon, Box, Flex, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { isObject } from "lodash";
import { Fragment, useEffect, useRef } from "react";

import {
	configsUpdateTransformRq,
	fieldsTransformDependenciesOptions,
	getDynamicField,
	getDynamicFieldValidate,
} from "@/shared/components/baseComponents/BCDynamicField";
import type {
	BCDynamicConfigRq,
	BCDynamicFieldRs,
} from "@/shared/components/baseComponents/BCDynamicField/index.types";

import type { DiscoveryAdapterConfigurationRs } from "../../../../index.types";

type FormValues = Record<string, unknown>;

type Props = DiscoveryAdapterConfigurationRs & {
	handleDeleteAdapterConfigurations: VoidFunction;
	handleEditAdapterConfigurations: (configs: BCDynamicConfigRq[], callback: VoidFunction) => void;
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
	const updateValueOnce = useRef<FormValues>({});
	const initValidations = getDynamicFieldValidate<FormValues, string>(fields);
	const form = useForm<FormValues>({
		validate: initValidations,
		onValuesChange: () => {
			setTimeout(() => {
				Object.entries(updateValueOnce.current).forEach(([key, value]) => {
					form.setFieldValue(key, value);
				});
			}, 100);
		},
	});

	const handleSubmit = () => {
		const validate = form.validate();
		if (validate.hasErrors) return;
		const values = form.getValues();
		const updateValues = configsUpdateTransformRq(configs, values);
		handleEditAdapterConfigurations(updateValues, onCancel);
	};

	useEffect(() => {
		const formInitialValues = configs.reduce((acc, { value, key }) => {
			acc[key] = isObject(value) ? value?.value : null;
			return acc;
		}, {} as FormValues);

		form.initialize(formInitialValues);
		return () => {
			updateValueOnce.current = {};
		};
	}, [configs]);

	return (
		<Box pos="relative">
			<LoadingOverlay visible={loading} />
			<Flex gap="xs" mt="xs">
				<Flex gap="xs" w="100%">
					{fields.map(({ label, key, ...item }) => {
						const defaultValue = configs?.find(({ key: valueKey }) => key === valueKey)?.value;
						const updateDependencyOptions = fieldsTransformDependenciesOptions<FormValues>(
							{ listKey: key, key },
							form.values,
							fields,
							updateValueOnce,
						);
						return (
							<Fragment key={key}>
								{getDynamicField({
									otherElementOptions: {
										withAsterisk: true,
										style: { flex: 1 },
									},
									formInputProps: {
										key: form.key(key),
										...form.getInputProps(key),
									},
									key,
									defaultValue,
									label: "",
									...updateDependencyOptions,
									...item,
								})}
							</Fragment>
						);
					})}
				</Flex>
				<Flex gap="xs" align="center">
					<ActionIcon size="lg" title="Save" c="gray.2" bg="primary.8" onClick={handleSubmit}>
						<IconCheck size={20} />
					</ActionIcon>
					<ActionIcon size="lg" title="Cancel" c="gray.8" bg="gray.2" type="reset" onClick={onCancel}>
						<IconX size={20} />
					</ActionIcon>
				</Flex>
			</Flex>
		</Box>
	);
};
export default NoneCredentialEditForm;
