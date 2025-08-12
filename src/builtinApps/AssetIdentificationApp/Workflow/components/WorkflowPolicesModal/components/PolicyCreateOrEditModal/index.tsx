import { Button, Card, Flex, Grid, Loader, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect, useMemo } from "react";
import { v4 } from "uuid";

import type { EditPolicyRequestConditions } from "@/http/generated/models";
import { configsUpdateTransformRq, getDynamicField } from "@/shared/components/baseComponents/BCDynamicField";
import BCEmptyOrOverlay from "@/shared/components/baseComponents/BCEmptyOrOverlay";
import BCModal from "@/shared/components/baseComponents/BCModal";
import BCTriggerActions from "@/shared/components/baseComponents/BCTriggerActions";
import { usePolicyManagementActions } from "@/shared/components/baseComponents/BCTriggerActions/index.hooks";
import type { TriggerActionForm } from "@/shared/components/baseComponents/BCTriggerActions/index.types";
import ICAdvancedFilterConditionBuilder from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionBuilder";
import type { ICAdvancedFilterConditionBuilderCondition } from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { validateInput } from "@/shared/lib/utils";

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
	refetchPolicy: VoidFunction;
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

const initCondition: ICAdvancedFilterConditionBuilderCondition = {
	id: v4(),
	closeBracket: 0,
	openBracket: 0,
	values: [],
	nextOperator: "and",
	disabled: false,
	error: true,
};
function PolicyCreateOrEdit({ workflowName, policyId, refetchPolicy, onClose }: Props) {
	const form = useForm<FormValues>({
		initialValues: {
			conditions: [initCondition],
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
	const onSuccess = () => {
		refetchPolicy();
		form.reset();
		onClose();
	};
	const handleSubmit = ({ triggerActionForm, conditions: formConditions, name, summary }: FormValues) => {
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
				const action_id = valueAsArray.find(({ actionId }) => actionId)?.actionId || "";
				const currentFields = valueAsArray.find(({ fields }) => fields)?.fields || [];
				const actionFields = valueAsArray.map(({ fields, key, actionId = "", ...values }) => {
					return configsUpdateTransformRq(currentFields, values).flat();
				});
				return { action_id, configurations: actionFields };
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
						name,
						summary,
						actions,
						workflow: workflowName as PolicyWorkflowTypes,
						conditions,
					},
				},
				{
					onSuccess,
				},
			);
		} else {
			createPolicy.mutate(
				{
					data: {
						name,
						summary,
						actions,
						workflow: workflowName as PolicyWorkflowTypes,
						order: (polices?.data?.total || 0) + 1,
						conditions,
					},
				},
				{
					onSuccess,
				},
			);
		}
	};

	const { policyActions } = usePolicyManagementActions();
	const { columnConditions } = useColumnPolicyConditions();
	const { polices } = useWorkflowPolicy(workflowName);
	const loading = polices.isLoading || columnConditions.isLoading;
	const policyData = useMemo(
		() => polices?.data?.results?.find(({ id }) => id === policyId),
		[loading, policyId],
	);

	useEffect(() => {
		if (policyData && !loading && !policyActions.isLoading) {
			const actionKeys = Object.entries(policyActions?.data || {}).flatMap(([groupName, list]) =>
				list?.map((item) => ({ id: item.id, value: `${groupName}|${item.name}|${item.id}` })),
			);
			const triggerActionForm = policyData?.actions?.reduce(
				(actions, { action_id, action_fields, configurations }) => {
					const key = actionKeys.find(({ id }) => id === action_id)?.value as string;
					actions[key] = configurations?.map((items) => {
						const object =
							items.reduce(
								(acc, cur) => {
									acc[cur.key] = cur.value;
									return acc;
								},
								{ key: v4(), adapterId: action_fields, fields: action_fields } as unknown as Record<
									string,
									unknown
								>,
							) || {};

						return object;
					});

					return actions;
				},
				{} as unknown as TriggerActionForm,
			);

			form.setValues({ ...policyData, triggerActionForm: triggerActionForm || {} });
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
									h={150}
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
