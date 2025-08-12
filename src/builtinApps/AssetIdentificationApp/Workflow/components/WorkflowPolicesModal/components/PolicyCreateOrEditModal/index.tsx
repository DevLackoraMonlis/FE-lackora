import { Button, Card, Flex, Grid, Loader, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect, useMemo } from "react";

import type { EditPolicyRequestConditions } from "@/http/generated/models";
import { configsUpdateTransformRq, getDynamicField } from "@/shared/components/baseComponents/BCDynamicField";
import BCModal from "@/shared/components/baseComponents/BCModal";
import BCTriggerActions from "@/shared/components/baseComponents/BCTriggerActions";
import type { TriggerActionForm } from "@/shared/components/baseComponents/BCTriggerActions/index.types";
import ICAdvancedFilterConditionBuilder from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionBuilder";
import { validateInput } from "@/shared/lib/utils";

import BCEmptyOrOverlay from "@/shared/components/baseComponents/BCEmptyOrOverlay";
import {
	useColumnPolicyConditions,
	useCreateWorkflowPolicy,
	useUpdateWorkflowPolicy,
	useWorkflowPolicy,
} from "../../../../index.hooks";
import type { PolicyCardData, PolicyWorkflowTypes } from "../../../../index.types";
import PolicyConditionValidation from "./components/PolicyConditionValidation";

type FormValues = {
	name: string;
	summary: string;
	conditions: PolicyCardData["conditions"];
	triggerActionForm: TriggerActionForm;
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
			withAsterisk: true,
		},
	},
	{
		type: "String",
		key: "summary",
		label: "Summary",
		placeholder: "Short sentence about this policy",
	},
] as const;

function PolicyCreateOrEdit({ workflowName, policyId, onClose }: Props) {
	const form = useForm<FormValues>({
		initialValues: {
			conditions: [],
			triggerActionForm: {},
			name: "",
			summary: "",
		},
		validate: {
			name: (value) => validateInput(value, { required: true }),
		},
	});

	const { createPolicy } = useCreateWorkflowPolicy();
	const { updatePolicy } = useUpdateWorkflowPolicy();
	const handleSubmit = ({ triggerActionForm, conditions: formConditions, ...formValues }: FormValues) => {
		const conditionHasError = formConditions.some(({ error, bracketError }) => error || bracketError);
		if (conditionHasError) {
			notifications.show({
				message: "Conditions has error!",
				color: "red",
				withBorder: true,
			});
			return;
		}
		const actions = Object.values(triggerActionForm)
			.filter((valueAsArray = []) => !!valueAsArray?.length)
			.map((valueAsArray = []) => {
				let action_id = "";
				const actionFields = valueAsArray.map(({ fields = [], key, actionId = "", ...values }) => {
					action_id = actionId;
					return configsUpdateTransformRq(fields, values).flat();
				});
				return { action_id, configurations: actionFields};
			});
		const conditions = formConditions.map((item) => ({
			close_bracket: item.closeBracket,
			column_name: item.columnName || "",
			next_operator: item.nextOperator,
			open_bracket: item.openBracket,
			operator: item.operator,
			values: item.values,
		})) as EditPolicyRequestConditions;
		// submitting
		if (policyId) {
			updatePolicy.mutate(
				{
					policyId,
					data: {
						...formValues,
						actions,
						workflow: workflowName as PolicyWorkflowTypes,
						conditions,
					},
				},
				{
					onSuccess() {
						form.reset();
						onClose();
					},
				},
			);
		} else {
			createPolicy.mutate(
				{
					data: {
						...formValues,
						actions,
						workflow: workflowName as PolicyWorkflowTypes,
						order: (polices?.data?.total || 0) + 1,
						conditions,
					},
				},
				{
					onSuccess() {
						form.reset();
						onClose();
					},
				},
			);
		}
	};

	const { columnConditions } = useColumnPolicyConditions();
	const { polices } = useWorkflowPolicy(workflowName);
	const loading = polices.isLoading || columnConditions.isLoading;
	const policyData = useMemo(
		() => polices?.data?.results?.find(({ id }) => id === policyId),
		[loading, policyId],
	);
	useEffect(() => {
		if (policyData && !loading) {
			form.setValues(policyData);
		} else {
			form.reset();
		}
	}, [policyId, loading]);

	useEffect(() => {
		return () => form.reset();
	}, []);

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
									<Grid.Col span={{ xs: 12, md: 6 }} key={key}>
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
				<PolicyConditionValidation
					formConditions={form.values.conditions}
					renderProps={(onValidation, loading, alert) => (
						<Card shadow="xs" radius="xs" pos="relative">
							<BCEmptyOrOverlay
								visible={loading}
								icon={<Loader color="blue" type="bars" />}
								title="Validating your policy..."
								description="We’re checking the policy conditions for conflicts and errors. This might take a few seconds"
							/>
							<Card.Section inheritPadding py="xs">
								<Flex justify="space-between" align="center">
									<Text size="sm" fw="bold">
										Condition(s)
									</Text>
									<Button variant="transparent" onClick={onValidation} size="xs">
										Run Condition(s)
									</Button>
								</Flex>
							</Card.Section>
							{alert}
							<Card bg="gray.1" m={0}>
								<ICAdvancedFilterConditionBuilder
									onChange={(newConditions) => form.setFieldValue("conditions", newConditions)}
									allColumns={columnConditions.data?.data.results || []}
									conditions={form.values.conditions}
									h={100}
								/>
							</Card>
						</Card>
					)}
				/>
				<Card shadow="xs" radius="xs">
					<Card.Section inheritPadding py="xs">
						<Text size="sm" fw="bold">
							Trigger Action(s)
						</Text>
					</Card.Section>
					<Card bg="gray.1" mx={0}>
						<BCTriggerActions<FormValues["triggerActionForm"]>
							onChange={(triggerActionForm) => form.setFieldValue("triggerActionForm", triggerActionForm)}
							values={form.values.triggerActionForm}
						/>
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
		<BCModal size="80%" onClose={onClose} opened={opened} title="Create New Policy">
			<PolicyCreateOrEdit onClose={onClose} opened={opened} {...props} />
		</BCModal>
	);
}
