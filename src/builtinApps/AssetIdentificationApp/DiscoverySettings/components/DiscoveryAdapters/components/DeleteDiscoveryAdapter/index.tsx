import { useDeleteDiscoverySetting } from "@/builtinApps/AssetIdentificationApp/DiscoverySettings/index.hooks";
import type { ConfigurationRs } from "@/builtinApps/AssetIdentificationApp/DiscoverySettings/index.types";
import BCDeleteModal from "@/shared/components/baseComponents/BCDeleteModal";

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
	const { deleteDiscoverySetting } = useDeleteDiscoverySetting();
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
	return (
		<BCDeleteModal
			onDelete={onDelete}
			opened={opened}
			onClose={onClose}
			onCancel={onClose}
			loading={deleteDiscoverySetting.isPending}
			title={"Confirm Deletion"}
			header={`${adapterName} Adapter`}
			description={
				"This gateway has no asset dependencies.\n" +
				"You can safely remove it.\n" +
				"Do you want to proceed with deletion"
			}
		/>
	);
}
