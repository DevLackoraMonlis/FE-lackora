import {
	getAdapterDependency,
	useDeleteAdapter,
	useGetAdapters,
	useImportAdapterAdp,
	useValidateAdapterAdp,
} from "@/http/generated/adapter-management";

import { useToggle } from "@mantine/hooks";
import { AdapterUploadedStatus } from "./index.enum";
import type { AdaptersFilters, DeleteDependencyAdapters } from "./index.types";

export function useAdapterManagement(clientSideParams: AdaptersFilters) {
	const adapterManagementUQ = useGetAdapters(clientSideParams, {
		query: {
			refetchOnMount: false,
			staleTime: 1_000_000,
			select: (res) => {
				const results = res?.data?.results.map((item) => ({
					...item,
					name: item.display_name,
					adapterType: item.adapter_type,
				}));
				return { ...res?.data, results };
			},
		},
	});
	return { adapterManagement: adapterManagementUQ };
}

export function useAdapterManagementValidateAdp(handleUpdateStatus: (status: AdapterUploadedStatus) => void) {
	const validateAdapterAdp = useValidateAdapterAdp({
		mutation: {
			onMutate: () => {
				handleUpdateStatus(AdapterUploadedStatus.Validating);
				return { hideErrorMessage: true, hideSuccessMessage: true };
			},
		},
	});
	return { validateAdapterAdp };
}

export function useAdapterManagementImportAdp() {
	const importAdapterAdp = useImportAdapterAdp({
		mutation: {
			onMutate: () => {
				return { hideErrorMessage: true };
			},
		},
	});
	return { importAdapterAdp };
}

export function useAdapterManagementDeleteAdp() {
	const deleteAdapterAdp = useDeleteAdapter();
	return { deleteAdapterAdp };
}

export function useAdapterManagementCheckAdpDependency() {
	const [dependencyLoading, toggledependencyLoading] = useToggle([false, true]);

	async function getDependency(adapterId: string) {
		toggledependencyLoading(true);
		return await getAdapterDependency(adapterId)
			.then(({ data }) => {
				toggledependencyLoading(false);
				return { ...data, disabledDeletion: false };
			})
			.catch(() => {
				toggledependencyLoading(false);
				return { disabledDeletion: true, message: "", status: false, total: 0 } as DeleteDependencyAdapters;
			});
	}

	return { getDependency, dependencyLoading };
}
