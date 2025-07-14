import { Badge, type BadgeProps } from "@mantine/core";

import { useVendorIcons } from "@/shared/hooks/icons/useVendorIcons";

export const useVendorBadges = () => {
	const { getVendorIcon } = useVendorIcons();

	const renderVendorBadge = ({
		iconType,
		badgeLabel,
		iconSize = 15,
		iconLeft = true,
		...props
	}: BadgeProps & {
		iconType: string;
		badgeLabel?: string;
		iconSize?: number;
		iconLeft?: boolean;
	}) => {
		return (
			<Badge
				component="span"
				radius="xs"
				variant="transparent"
				c="black"
				{...props}
				{...{ [iconLeft ? "leftSection" : "rightSection"]: getVendorIcon(iconType, { size: iconSize }) }}
			>
				{iconType || badgeLabel || "-"}
			</Badge>
		);
	};

	return { renderVendorBadge };
};
