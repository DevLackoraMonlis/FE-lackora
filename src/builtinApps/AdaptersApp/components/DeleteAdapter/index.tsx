import BCDeleteModal from "@/shared/components/baseComponents/BCDeleteModal";

import { useAdapterManagementDeleteAdp } from "../../index.hooks";

type Props = {
	onClose: VoidFunction;
	opened: boolean;
	refetchAdapters: VoidFunction;
	adapterId?: string;
	adapterName?: string;
};

export function DeleteAdapterModal({ onClose, opened, refetchAdapters, ...selectedAdapter }: Props) {
	const { deleteAdapterAdp } = useAdapterManagementDeleteAdp();
	const onDelete = () => {
		deleteAdapterAdp.mutate(
			{ adapterId: `${selectedAdapter.adapterId}` },
			{
				onSuccess() {
					refetchAdapters();
					onClose();
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
			loading={deleteAdapterAdp.isPending}
			title={"Confirm Deletion"}
			header={`${selectedAdapter?.adapterName} Adapter`}
			description={"You are about to permanently delete this adapter.\n" + "This action is irreversible."}
		/>
	);
}
