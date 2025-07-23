import { Center, List, Loader } from "@mantine/core";
import { useEffect, useState } from "react";

import BCDeleteModal from "@/shared/components/baseComponents/BCDeleteModal";
import BCDeleteRestrictModal from "@/shared/components/baseComponents/BCDeleteRestrictModal";

import { useAdapterManagementCheckAdpDependency, useAdapterManagementDeleteAdp } from "../../index.hooks";
import type { DeleteDependencyAdapters } from "../../index.types";

type Props = {
	onClose: VoidFunction;
	opened: boolean;
	refetchAdapters: VoidFunction;
	adapterId?: string;
	adapterName?: string;
};

export function DeleteAdapterModal({ onClose, opened, refetchAdapters, ...selectedAdapter }: Props) {
	const [deleteStatus, setDeleteStatus] = useState<DeleteDependencyAdapters | null>(null);

	const adapterManagementCheckAdpDependency = useAdapterManagementCheckAdpDependency();
	const { deleteAdapterAdp } = useAdapterManagementDeleteAdp();
	const handleClose = () => {
		setDeleteStatus(null);
		onClose();
	};
	const onDelete = () => {
		deleteAdapterAdp.mutate(
			{ adapterId: `${selectedAdapter.adapterId}` },
			{
				onSuccess() {
					refetchAdapters();
					handleClose();
				},
			},
		);
	};
	const deleteDependency = async () => {
		const response = await adapterManagementCheckAdpDependency.getAdapterDeleteDependency(
			selectedAdapter.adapterId || "",
		);
		setDeleteStatus(response);
	};

	useEffect(() => {
		if (opened) {
			deleteDependency();
		}
	}, [opened, selectedAdapter.adapterId]);

	const description = () => {
		if (adapterManagementCheckAdpDependency.adapterDeleteDependencyLoading) {
			return (
				<Center>
					<Loader size="sm" />
				</Center>
			);
		}
		if (deleteStatus?.status === true) {
			return (
				<List listStyleType="none">
					<List.Item>You are about to permanently delete this adapter.</List.Item>
					<List.Item>This action is irreversible.</List.Item>
				</List>
			);
		}
		if (deleteStatus?.status === false) {
			return (
				<List listStyleType="none">
					<List.Item>
						This adapter is being used in one or more configurations and cannot be deleted.
					</List.Item>
					<List.Item>
						To delete it, first remove any linked assets, discovery settings, or profiling templates that
						reference this adapter.
					</List.Item>
				</List>
			);
		}
		return (
			<List listStyleType="none">
				<List.Item>Failed to check the adapter usage.</List.Item>
				<List.Item>please try again.</List.Item>
			</List>
		);
	};

	const modalsDescription = description();
	return (
		<>
			<BCDeleteRestrictModal
				onOk={handleClose}
				onClose={handleClose}
				opened={opened && deleteStatus?.status !== true}
				loading={adapterManagementCheckAdpDependency.adapterDeleteDependencyLoading}
				title={"Deletion Restricted"}
				deleteItemName={selectedAdapter?.adapterName || ""}
				description={modalsDescription}
			/>
			<BCDeleteModal
				onDelete={onDelete}
				opened={opened && deleteStatus?.status === true}
				onClose={handleClose}
				onCancel={handleClose}
				loading={deleteAdapterAdp.isPending}
				title={"Confirm Deletion"}
				header={`${selectedAdapter?.adapterName} Adapter`}
				description={modalsDescription}
			/>
		</>
	);
}
