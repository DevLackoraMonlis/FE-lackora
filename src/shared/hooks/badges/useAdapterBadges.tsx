import { Badge, type BadgeProps } from "@mantine/core";

import { useAdapterIcons } from "@/shared/icons/hooks/useAdapterIcons";

const adaptersColors = {
	monitor: "green",
	discovery: "primary",
	inventory: "orange",
	management: "purple",
	web: "white",
	port: "white",
	none: "",
};

const adaptersColorsKeys = Object.keys(adaptersColors);

export const useAdapterBadges = () => {
	const { getAdapterIcon } = useAdapterIcons();

	const renderAdapterBadge = ({
		iconType,
		badgeLabel,
		iconSize = 15,
		iconLeft = false,
		...props
	}: BadgeProps & {
		iconType: string;
		badgeLabel?: string;
		iconSize?: number;
		iconLeft?: boolean;
	}) => {
		const findColorType = adaptersColorsKeys.find((key) => iconType?.toLowerCase().includes(key)) || "none";
		const baseColor = adaptersColors[findColorType as keyof typeof adaptersColors];
		return (
			<Badge
				component="span"
				radius="xs"
				variant="light"
				color={baseColor || ""}
				{...props}
				{...{ [iconLeft ? "leftSection" : "rightSection"]: getAdapterIcon(iconType, { size: iconSize }) }}
			>
				{badgeLabel || iconType || "-"}
			</Badge>
		);
	};

	return { renderAdapterBadge };
};
