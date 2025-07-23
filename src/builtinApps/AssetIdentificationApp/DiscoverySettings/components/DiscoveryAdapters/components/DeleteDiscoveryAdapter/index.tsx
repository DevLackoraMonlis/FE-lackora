import { Alert, Button, Center, Flex, Highlight, List, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoTriangleFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import BCDeleteModal from "@/shared/components/baseComponents/BCDeleteModal";

import { useDeleteDiscoverySetting, useDeleteNoneCredentialDependency } from "../../../../index.hooks";
import type { ConfigurationRs, DeleteDependencyAssets } from "../../../../index.types";
import { DeleteAssetsDependencyTable } from "./components/DeleteAssetsDependencyTable";

type Props = Partial<ConfigurationRs> & {
	onClose: VoidFunction;
	refetchDiscoveryAdapters: VoidFunction;
	opened: boolean;
};

export function DeleteDiscoveryAdapterModal({
	onClose,
	opened,
	adapterId = "",
	adapterName = "",
	configurationId = "",
	refetchDiscoveryAdapters,
}: Props) {
	const [deleteStatus, setDeleteStatus] = useState<DeleteDependencyAssets | null>(null);
	const [showAssetsResult, handlersShowAssetsResult] = useDisclosure(false);

	const deleteNoneCredentialDependency = useDeleteNoneCredentialDependency();
	const { deleteDiscoverySetting } = useDeleteDiscoverySetting(deleteStatus?.status === false);
	const onDelete = () => {
		deleteDiscoverySetting.mutate(
			{ adapterId, data: { configuration_id: configurationId } },
			{
				onSuccess: () => {
					onClose();
					refetchDiscoveryAdapters();
				},
			},
		);
	};
	const deleteRestrict = async () => {
		const response =
			await deleteNoneCredentialDependency.discoverySettingConfigurationDependency(configurationId);
		setDeleteStatus(response);
	};

	useEffect(() => {
		if (opened) {
			deleteRestrict();
		}
		return () => {
			setDeleteStatus(null);
		};
	}, [configurationId, opened]);

	const description = () => {
		if (deleteNoneCredentialDependency.configurationDependencyLoading) {
			return (
				<Center>
					<Loader color="red" size="sm" />
				</Center>
			);
		}
		const { status, total, results = [] } = deleteStatus || {};
		if (status === true) {
			return (
				<List listStyleType="none">
					<List.Item>This gateway has no asset dependencies.</List.Item>
					<List.Item>You can safely remove it.</List.Item>
					<List.Item>Do you want to proceed with deletion</List.Item>
				</List>
			);
		}
		if (status === false) {
			return (
				<Flex direction="column" justify="flex-start" gap="xs">
					<Highlight highlight={[total?.toString() || ""]}>
						{`This gateway is currently associated with ${total} assets. `}
					</Highlight>
					<Alert p={0} m={0} fw="bold" variant="transparent" color="yellow" icon={<IconInfoTriangleFilled />}>
						Removing this gateway will clear its mapping from all related assets. They may become Unmanageable
						or Unreachable in future scans.
					</Alert>
					{showAssetsResult && <DeleteAssetsDependencyTable results={results} />}
					<Button
						display="flex"
						variant="transparent"
						onClick={() => handlersShowAssetsResult[showAssetsResult ? "close" : "open"]()}
					>
						{`${showAssetsResult ? "Hide" : "View"} ${total} associated assets `}
					</Button>
				</Flex>
			);
		}
		return (
			<List listStyleType="none">
				<List.Item>Failed to check the associated gateway.</List.Item>
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
				header={`${adapterName} Configure`}
				opened={opened}
				description={description()}
				disabled={!!deleteStatus?.disabledDeletion}
				loading={
					deleteDiscoverySetting.isPending || deleteNoneCredentialDependency.configurationDependencyLoading
				}
			/>
		</>
	);
}
