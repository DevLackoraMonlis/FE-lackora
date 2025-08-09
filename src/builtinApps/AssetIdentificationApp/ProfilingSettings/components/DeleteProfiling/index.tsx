import { Alert, Button, Center, Flex, Highlight, List, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoTriangleFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import BCDeleteModal from "@/shared/components/baseComponents/BCDeleteModal";

import type { ProfilingInventoryRules } from "../../index.enum";
import { useDeleteProfilingDependency, useDeleteSingleProfiling } from "../../index.hooks";
import type { DeleteProfiling } from "../../index.types";
import { DeleteAssetsDependencyTable } from "./components/DeleteAssetsDependencyTable";

type Props = {
	onClose: VoidFunction;
	refetchProfiling: VoidFunction;
	opened: boolean;
	inventoryRuleId: string;
	type: ProfilingInventoryRules;
};

export default function DeleteProfilingModal({
	onClose,
	opened,
	type,
	inventoryRuleId = "",
	refetchProfiling,
}: Props) {
	const [deleteStatus, setDeleteStatus] = useState<DeleteProfiling | null>(null);
	const [showAssetsResult, handlersShowAssetsResult] = useDisclosure(false);

	const deleteProfilingDependency = useDeleteProfilingDependency(type);
	const { deleteProfiling } = useDeleteSingleProfiling();
	const onDelete = () => {
		deleteProfiling.mutate(
			{ inventoryRuleId, params: { type } },
			{
				onSuccess: () => {
					onClose();
					refetchProfiling();
				},
			},
		);
	};
	const deleteRestrict = async () => {
		const response = await deleteProfilingDependency.getDependency(inventoryRuleId);
		setDeleteStatus(response);
	};

	useEffect(() => {
		if (opened) {
			deleteRestrict();
		}
		return () => {
			setDeleteStatus(null);
		};
	}, [opened]);

	const description = () => {
		if (deleteProfilingDependency.dependencyLoading) {
			return (
				<Center>
					<Text>Check rule Dependencies ...</Text>
				</Center>
			);
		}
		const { status, total, results = [] } = deleteStatus || {};
		if (status === true) {
			return (
				<List listStyleType="none">
					<List.Item>This rule has no asset dependencies.</List.Item>
					<List.Item>You can safely remove it.</List.Item>
					<List.Item>Do you want to proceed with deletion</List.Item>
				</List>
			);
		}
		if (status === false) {
			return (
				<Flex direction="column" justify="flex-start" gap="xs">
					<Highlight highlight={[total?.toString() || ""]}>
						{`This rule has matched ${total} assets so far.`}
					</Highlight>
					<Alert p={0} m={0} fw="bold" variant="transparent" color="yellow" icon={<IconInfoTriangleFilled />}>
						If you delete it, these assets will no longer be linked to this rule. If no other rule matches
						them, they will move to the “Unmatched” state. Are you sure you want to delete this rule?
					</Alert>
					{showAssetsResult && <DeleteAssetsDependencyTable results={results} />}
					<Button
						display="flex"
						variant="transparent"
						onClick={() => handlersShowAssetsResult[showAssetsResult ? "close" : "open"]()}
					>
						{`${showAssetsResult ? "Hide" : "View"} ${total} matched assets `}
					</Button>
				</Flex>
			);
		}
		return (
			<List listStyleType="none">
				<List.Item>Failed to check the matched assets.</List.Item>
				<List.Item>please try again.</List.Item>
			</List>
		);
	};

	return (
		<>
			<BCDeleteModal
				size={"40%"}
				onDelete={onDelete}
				onClose={onClose}
				onCancel={onClose}
				title={"Confirm Deletion"}
				header={"Rule"}
				opened={opened}
				description={description()}
				disabled={!!deleteStatus?.disabledDeletion}
				loading={deleteProfiling.isPending || deleteProfilingDependency.dependencyLoading}
			/>
		</>
	);
}
