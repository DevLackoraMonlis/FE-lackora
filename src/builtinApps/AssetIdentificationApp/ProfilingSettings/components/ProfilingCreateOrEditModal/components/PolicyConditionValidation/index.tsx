import { Alert, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { type ReactNode, useState } from "react";

import type { EditPolicyRequestConditions } from "@/http/generated/models";

import { usePolicyConditionsValidation } from "../../../../index.hooks";
import type { ProfilingCardData } from "../../../../index.types";
import PolicyValidationResultsModal from "../PolicyValidationResults";

type Props = {
	formConditions: ProfilingCardData["conditions"];
	renderProps: (onValidation: VoidFunction, loading: boolean, alert: ReactNode) => ReactNode;
};

export default function PolicyConditionValidation({ renderProps, formConditions }: Props) {
	const { conditionsValidation } = usePolicyConditionsValidation();
	const [response, setResponse] = useState<Awaited<typeof conditionsValidation.data>>();
	const [openedItems, handleOpenedItems] = useDisclosure();

	const handleOnValidating = () => {
		const conditionHasError = formConditions.some(({ error, bracketError }) => error || bracketError);
		if (conditionHasError) {
			notifications.show({
				message: "Conditions has error!",
				color: "red",
				withBorder: true,
			});
			return;
		}
		const conditions = formConditions.map((item) => ({
			close_bracket: item.closeBracket,
			column_name: item.columnName || "",
			next_operator: item.nextOperator,
			open_bracket: item.openBracket,
			operator: item.operator,
			values: item.values,
		})) as EditPolicyRequestConditions;

		conditionsValidation.mutate(
			{ data: { conditions, limit: Number.MAX_SAFE_INTEGER, page: 1 } },
			{
				onSuccess(response) {
					setResponse(response);
				},
			},
		);
	};

	return (
		<>
			<PolicyValidationResultsModal
				onClose={handleOpenedItems.close}
				opened={openedItems}
				total={response?.data?.total || 0}
				results={
					response?.data?.results?.map((item, idx) => ({
						key: (idx + 1).toString(),
						status: item.status as string,
						ipAddress: item.primary_ip as string,
					})) || []
				}
			/>
			{renderProps(
				handleOnValidating,
				conditionsValidation.isPending,
				<Alert
					hidden={!conditionsValidation.isSuccess}
					mb="2xs"
					variant="light"
					color="green"
					withCloseButton
					icon={<IconCheck />}
					title={
						<Flex align="center" gap="xs">
							<Text>{`Found ${response?.data?.total ?? "-"} item(s) matching the condition`}</Text>
							<Text
								td="underline"
								component="span"
								className="cursor-pointer"
								onClick={handleOpenedItems.open}
							>
								View Items
							</Text>
						</Flex>
					}
				/>,
			)}
		</>
	);
}
