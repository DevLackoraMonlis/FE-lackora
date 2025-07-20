import type { ApplicationHistoryStatus, ApplicationLicenseType } from "@/http/generated/models";
import type { BCSideFilterRenderLabel } from "@/shared/components/baseComponents/BCSideFilter";
import {
	MonoAppProductTypeEnum,
	MonoAppStatusTypeEnum,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.enum";
import { getMonoMarketAppProductButton } from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.helper";
import { useGetVendorIcons } from "@/shared/hooks/useGetVendorIcons";
import { Badge, Flex, Text } from "@mantine/core";

export const useMonoMarket = () => {
	const productTypeMap: Record<ApplicationLicenseType, MonoAppProductTypeEnum> = {
		enterprise: MonoAppProductTypeEnum.ENTERPRISE,
		professional: MonoAppProductTypeEnum.PROFESSIONAL,
		standard: MonoAppProductTypeEnum.STANDARD,
	};

	const appStatusMap: Record<ApplicationHistoryStatus, MonoAppStatusTypeEnum> = {
		active: MonoAppStatusTypeEnum.ACTIVATED,
		expired: MonoAppStatusTypeEnum.EXPIRED,
		inactive: MonoAppStatusTypeEnum.INACTIVE,
		installing: MonoAppStatusTypeEnum.INSTALLING,
		support_licensed_expired: MonoAppStatusTypeEnum.SUPPORT_LICENSE_EXPIRED,
	};

	const filterOrderMap: Record<string, number> = {
		vendor: 4,
		status: 3,
		support_license: 2,
		type: 1,
	};

	const { getVendorIcon } = useGetVendorIcons();

	const filterRenderItemMap: Record<string, BCSideFilterRenderLabel> = {
		vendor: (option) => {
			return (
				<Flex align={"center"} gap={"2xs"}>
					{getVendorIcon({ size: 20, name: option.value?.toString() })}
					<Text>{option.label}</Text>
				</Flex>
			);
		},
		status: (option) => {
			const colors: Record<ApplicationHistoryStatus, string> = {
				active: "#12B886",
				expired: "#FA5252",
				inactive: "#868E96",
				installing: "white",
				support_licensed_expired: "white",
			};
			return (
				<Badge variant={"light"} radius={"xs"} color={colors[option.value as ApplicationHistoryStatus]}>
					{option.label}
				</Badge>
			);
		},
		type: (option) => {
			return getMonoMarketAppProductButton({
				size: "large",
				type: productTypeMap[option.value as ApplicationLicenseType],
			});
		},
		support_license: (itemOption) => itemOption.label,
	};

	return { filterRenderItemMap, productTypeMap, appStatusMap, filterOrderMap };
};
