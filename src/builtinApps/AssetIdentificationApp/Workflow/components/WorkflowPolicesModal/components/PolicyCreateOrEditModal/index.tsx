import { Button, Card, Flex, Grid, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

import BCModal from "@/shared/components/baseComponents/BCModal";
import BCTriggerActions from "@/shared/components/baseComponents/BCTriggerActions";
import type { TriggerActionForm } from "@/shared/components/baseComponents/BCTriggerActions/index.types";
import ICAdvancedFilterConditionBuilder from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionBuilder";

import { getDynamicField } from "@/shared/components/baseComponents/BCDynamicField";
import { validateInput } from "@/shared/lib/utils";
import { useColumnPolicyConditions, useWorkflowPolicy } from "../../../../index.hooks";
import type { PolicyCardData } from "../../../../index.types";

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
	const [conditions, setConditions] = useState<PolicyCardData["conditions"]>([]);
	const [triggerActionForm, setTriggerActionForm] = useState<FormValues | object>({});
	const form = useForm<FormValues>({
		validate: {
			name: (value) => validateInput(value, { required: true }),
		},
	});

	const { columnConditions } = useColumnPolicyConditions();
	const { polices } = useWorkflowPolicy(workflowName);
	const policyData = polices?.data?.results?.find(({ id }) => id === policyId);
	const loading = false;
	const handleSubmit = (values: typeof form.values) => {
		console.log(values, triggerActionForm, conditions);
	};

	const resetComponents = () => {
		form.reset();
		setConditions([]);
		setTriggerActionForm({});
	};
	useEffect(() => {
		if (policyData) {
			setTriggerActionForm(policyData.actions);
			setConditions(policyData.conditions);
			form.setValues(policyData);
		} else {
			resetComponents();
		}
		return () => resetComponents();
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
					<Card bg="gray.1" m={0}>
						<ICAdvancedFilterConditionBuilder
							onChange={setConditions}
							allColumns={columnConditions?.data?.data?.results || []}
							conditions={conditions}
							h={100}
						/>
					</Card>
				</Card>
				<Card shadow="xs" radius="xs">
					<Card.Section inheritPadding py="xs">
						<Text size="sm" fw="bold">
							Trigger Action(s)
						</Text>
					</Card.Section>
					<Card bg="gray.1" mx={0}>
						<BCTriggerActions<FormValues> onChange={setTriggerActionForm} />
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
