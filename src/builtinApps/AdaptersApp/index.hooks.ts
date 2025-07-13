import {
	useGetAdapters,
	useImportAdapterAdp,
	useValidateAdapterAdp,
} from "@/http/generated/adapter-management";

import type { RenderLabel } from "@/shared/components/baseComponents/BCSideFilter";
import { useAdapterBadges } from "@/shared/hooks/badges/useAdapterBadges";
import { useVendorBadges } from "@/shared/hooks/badges/useVendorBadges";

import { AdapterUploadedStatus } from "./index.enum";
import type { AdaptersFilters } from "./index.types";

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

export function useAdapterManagementFilterLabel() {
	const { renderAdapterBadge } = useAdapterBadges();
	const { renderVendorBadge } = useVendorBadges();

	const renderLabel: RenderLabel = ({ label, value: iconType }, { name }) => {
		switch (name) {
			case "adapter_type":
				return renderAdapterBadge({ iconType });
			case "vendor":
				return renderVendorBadge({ iconType, p: "0px", pt: "2xs" });
			default:
				return label;
		}
	};
	return { renderLabel };
}
