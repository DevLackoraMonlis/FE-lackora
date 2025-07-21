import type {
	BCSideFilterItem,
	BCSideFilterItemOption,
} from "@/shared/components/baseComponents/BCSideFilter";
import { Badge, type BadgeProps, Image } from "@mantine/core";

import { useAdapterBadges } from "@/shared/hooks/badges/useAdapterBadges";
import { useVendorIcons } from "@/shared/hooks/icons/useVendorIcons";

type RenderLabel = (
	params: Partial<BCSideFilterItemOption>,
	filterItem: Partial<BCSideFilterItem>,
) => React.ReactNode;

export function useRenderFilterLabels() {
	const { getVendorIcon } = useVendorIcons();
	const { renderAdapterBadge } = useAdapterBadges();

	const renderLabel: RenderLabel = ({ label, value, icon }, { name }, props?: BadgeProps) => {
		const iconType = `${value}`;
		const badgeLabel = label || `${value ?? "-"}`;
		switch (name) {
			case "adapter_type":
				return renderAdapterBadge({ iconType, ...props });
			default:
				return (
					<Badge
						m={0}
						p={0}
						component="span"
						radius="xs"
						variant="transparent"
						c="black"
						leftSection={
							icon ? (
								<Image w="20px" h="30px" fit="contain" radius="md" src={icon} alt={badgeLabel} />
							) : badgeLabel?.toLocaleLowerCase() === "generic" ? (
								getVendorIcon("generic", { size: 20 })
							) : null
						}
						{...props}
					>
						{badgeLabel}
					</Badge>
				);
		}
	};
	return { renderLabel };
}
