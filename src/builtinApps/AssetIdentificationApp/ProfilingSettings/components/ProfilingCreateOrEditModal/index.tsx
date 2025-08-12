import { Button, Card, Flex, Grid, Loader, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect, useMemo } from "react";
import { v4 } from "uuid";

import type { EditPolicyRequestConditions } from "@/http/generated/models";
import { fieldsTransformRs, getDynamicField } from "@/shared/components/baseComponents/BCDynamicField";
import BCModal from "@/shared/components/baseComponents/BCModal";
import ICAdvancedFilterConditionBuilder from "@/shared/components/infraComponents/ICAdvancedFilter/components/ICAdvancedFilterConditionBuilder";
import { validateInput } from "@/shared/lib/utils";

import BCEmptyOrOverlay from "@/shared/components/baseComponents/BCEmptyOrOverlay";
import type { ProfilingInventoryRules } from "../../index.enum";
import {
	useColumnProfilingConditions,
	useCreateProfiling,
	useProfiling,
	useUpdateProfiling,
} from "../../index.hooks";
import type { ProfilingCardData } from "../../index.types";
import PolicyConditionValidation from "./components/PolicyConditionValidation";

type FormValues = {
	name: string;
	summary: string;
	adapter_id: string;
	connection_id: string;
	conditions: ProfilingCardData["conditions"];
};

type Props = {
	onClose: VoidFunction;
	refetchProfiling: VoidFunction;
	opened: boolean;
	inventoryRuleId: string;
	type: ProfilingInventoryRules;
};

const fields = [
	{
		type: "String",
		key: "name",
		label: "Rule Name",
		placeholder: "e.g., Rule Name",
		otherElementOptions: {
			withAsterisk: true,
		},
	},
	{
		type: "String",
		key: "summary",
		label: "Summary",
		placeholder: "Short sentence about this rule",
	},
] as const;

const dataSourceFields = fieldsTransformRs([
	{
		paginate: true,
		label: "Adapters",
		required: true,
		key: "adapter_id",
		object_type: "adapter",
		placeholder: "Select Adapter",
	},
	{
		label: "Connection",
		key: "connection_id",
		paginate: true,
		placeholder: "Select Connection",
		required: true,
		object_type: "connection",
	},
]);

function CreateOrEdit({ type, inventoryRuleId, refetchProfiling, onClose }: Props) {
	const form = useForm<FormValues>({
		initialValues: {
			conditions: [{ error: true, id: v4() } as FormValues["conditions"][number]],
			name: "",
			summary: "",
			adapter_id: "",
			connection_id: "",
		},
		validate: {
			name: (value) => validateInput(value, { required: true }),
			connection_id: (value) => validateInput(value, { required: true }),
			adapter_id: (value) => validateInput(value, { required: true }),
		},
	});

	const { columnConditions } = useColumnProfilingConditions();
	const { inventoryRules } = useProfiling(type);
	const loading = inventoryRules.isLoading || columnConditions.isLoading;
	const profilingData = useMemo(() => {
		const result = inventoryRules?.data?.results?.find(({ id }) => id === inventoryRuleId);
		if (result) {
			const adapter_id = result.datasource.find(({ type }) => type === "adapter")?.id || "";
			const connection_id = result.datasource.find(({ type }) => type === "adapter")?.id || "";
			return {
				...result,
				summary: result.summary || "",
				adapter_id,
				connection_id,
			};
		}
	}, [loading]);

	const { createInventoryRule } = useCreateProfiling();
	const { updateInventoryRule } = useUpdateProfiling();
	const onSuccess = () => {
		refetchProfiling();
		form.reset();
		onClose();
	};
	const handleSubmit = ({
		conditions: formConditions,
		adapter_id,
		connection_id,
		name,
		summary,
	}: FormValues) => {
		const conditionHasError = formConditions.some(({ error, bracketError }) => error || bracketError);
		if (conditionHasError) {
			notifications.show({
				message: "Conditions has error!",
				color: "red",
				withBorder: true,
			});
			return;
		}
		const datasource = { adapter_id, connection_id };
		const conditions = formConditions.map((item) => ({
			close_bracket: item.closeBracket,
			column_name: item.columnName || "",
			next_operator: item.nextOperator,
			open_bracket: item.openBracket,
			operator: item.operator,
			values: item.values,
		})) as EditPolicyRequestConditions;
		if (inventoryRuleId) {
			updateInventoryRule.mutate(
				{
					inventoryRuleId,
					data: {
						datasource,
						name,
						type,
						summary,
						conditions,
					},
				},
				{
					onSuccess,
				},
			);
		} else {
			createInventoryRule.mutate(
				{
					data: {
						datasource,
						name,
						type,
						summary,
						order: (inventoryRules?.data?.total || 0) + 1,
						conditions,
					},
				},
				{
					onSuccess,
				},
			);
		}
	};

	useEffect(() => {
		if (profilingData && !loading) {
			form.setValues(profilingData);
		} else {
			form.reset();
		}
	}, [inventoryRuleId, loading]);

	useEffect(() => {
		return () => form.reset();
	}, []);

	return (
		<>
			<form onSubmit={form.onSubmit(handleSubmit)} key={inventoryRuleId}>
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
							Data Source(s)
						</Text>
					</Card.Section>
					<Card bg="gray.1" mx={0}>
						<Grid gutter="xs">
							{dataSourceFields.map(({ key, ...item }) => {
								const defaultValue = profilingData?.datasource?.find(
									(source) => source.key === item.objectType,
								)?.value as string;
								return (
									<Grid.Col span={{ xs: 12, md: 6 }} key={key}>
										{getDynamicField({
											formInputProps: {
												key: form.key(key),
												...form.getInputProps(key),
											},
											key,
											otherElementOptions: { withAsterisk: true },
											defaultValue,
											...item,
										})}
									</Grid.Col>
								);
							})}
						</Grid>
					</Card>
				</Card>
				<Card m={0} p={0}>
					<Flex px="md" py="xs" gap="sm" justify="flex-end">
						<Button loading={loading} type="submit">
							Save
						</Button>
						<Button
							data-testid="create-profiling-cancel"
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

export default function ProfilingCreateOrEditModal({ onClose, opened, ...props }: Props) {
	return (
		<BCModal size="80%" onClose={onClose} opened={opened} title="Create New Rule">
			<CreateOrEdit onClose={onClose} opened={opened} {...props} />
		</BCModal>
	);
}
