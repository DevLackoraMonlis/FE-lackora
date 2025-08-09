import { Button, Card, Flex, Grid, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useRef } from "react";

import { useWorkflowPolicy } from "@/builtinApps/AssetIdentificationApp/Workflow/index.hooks";
import { getDynamicField } from "@/shared/components/baseComponents/BCDynamicField";
import BCModal from "@/shared/components/baseComponents/BCModal";
import BCTriggerActions from "@/shared/components/baseComponents/BCTriggerActions";
import type { TriggerActionForm } from "@/shared/components/baseComponents/BCTriggerActions/index.types";
import { validateInput } from "@/shared/lib/utils";

type FormList = TriggerActionForm;
type FormValues = FormList & {
	name: string;
	summary: string;
};

type Props = {
	onClose: VoidFunction;
	opened: boolean;
	policyId?: string;
	workflowName: string;
};

const fields = [
	{
		type: "String",
		key: "name",
		label: "Policy Name",
		placeholder: "e.g., Policy Name",
		otherElementOptions: {
			span: 6,
			withAsterisk: true,
		},
	},
	{
		type: "String",
		key: "summary",
		label: "Summary",
		placeholder: "Short sentence about this policy",
		otherElementOptions: {
			span: 6,
		},
	},
] as const;

function PolicyCreateOrEdit({ workflowName, policyId, onClose }: Props) {
	const { polices } = useWorkflowPolicy(workflowName);

	const updateValueOnce = useRef<FormList>({});
	const onValuesChange = () => {
		setTimeout(() => {
			Object.entries(updateValueOnce.current).forEach(([key, value]) => {
				form.setFieldValue(key, value);
			});
		}, 100);
	};
	const form = useForm<FormValues>({
		onValuesChange,
		validate: {
			name: (value) => validateInput(value, { required: true }),
		},
	});

	const loading = false;
	const handleSubmit = (values: typeof form.values) => {
		console.log(values);
	};

	useEffect(() => {
		const policyData = polices?.data?.results?.find(({ id }) => id === policyId);
		if (policyData) {
			form.setValues(policyData);
		} else {
			form.reset();
		}
	}, [policyId]);

	return (
		<>
			<form onSubmit={form.onSubmit(handleSubmit)} key={policyId}>
				<Card shadow="xs" radius="xs">
					<Card.Section inheritPadding py="xs">
						<Text size="sm" fw="bold">
							General
						</Text>
					</Card.Section>
					<Card bg="gray.1" mx={0}>
						<Grid gutter="xs">
							{fields.map(({ key, ...item }) => {
								return (
									<Grid.Col span={{ xs: 12, md: item?.otherElementOptions?.span as number }} key={key}>
										{getDynamicField({
											formInputProps: {
												key: form.key(key),
												...form.getInputProps(key),
											},
											key,
											...item,
										})}
									</Grid.Col>
								);
							})}
						</Grid>
					</Card>
				</Card>
				<Card shadow="xs" radius="xs">
					<Card.Section inheritPadding py="xs">
						<Text size="sm" fw="bold">
							Condition(s)
						</Text>
					</Card.Section>
					<Card bg="gray.1" mx={0}>
						Condition(s)
					</Card>
				</Card>
				<Card shadow="xs" radius="xs">
					<Card.Section inheritPadding py="xs">
						<Text size="sm" fw="bold">
							Trigger Action(s)
						</Text>
					</Card.Section>
					<Card bg="gray.1" mx={0}>
						<BCTriggerActions<FormValues> form={form} updateValueOnce={updateValueOnce} />
					</Card>
				</Card>
				<Card m={0} p={0}>
					<Flex px="md" py="xs" gap="sm" justify="flex-end">
						<Button loading={loading} type="submit">
							Save
						</Button>
						<Button
							data-testid="create-policy-cancel"
							onClick={onClose}
							variant="default"
							disabled={loading}
							type="reset"
						>
							Cancel
						</Button>
					</Flex>
				</Card>
			</form>
		</>
	);
}

export default function PolicyCreateOrEditModal({ onClose, opened, ...props }: Props) {
	return (
		<BCModal size="70%" onClose={onClose} opened={opened} title="Create New Policy">
			<PolicyCreateOrEdit onClose={onClose} opened={opened} {...props} />
		</BCModal>
	);
}
