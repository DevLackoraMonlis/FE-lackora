import type { RenderLabel } from "@/shared/components/baseComponents/BCSideFilter";

import { useAdapterBadges } from "@/shared/hooks/badges/useAdapterBadges";
import { useVendorBadges } from "@/shared/hooks/badges/useVendorBadges";

export function useRenderLabel() {
	const { renderAdapterBadge } = useAdapterBadges();
	const { renderVendorBadge } = useVendorBadges();

	const renderLabel: RenderLabel = ({ label, value }, { name }) => {
		const iconType = `${value}`;
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
