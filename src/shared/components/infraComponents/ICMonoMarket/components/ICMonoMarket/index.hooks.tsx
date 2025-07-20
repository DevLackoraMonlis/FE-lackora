import type { ApplicationHistoryStatus, ApplicationLicenseType } from "@/http/generated/models";
import type { BCSideFilterRenderLabel } from "@/shared/components/baseComponents/BCSideFilter";
import {
	MonoAppProductTypeEnum,
	MonoAppStatusTypeEnum,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.enum";
import {
	getMonoMarketAppActivationStatusBadge,
	getMonoMarketAppProductButton,
} from "@/shared/components/infraComponents/ICMonoMarket/components/ICMonoMarket/index.helper";
import { useGetVendorIcons } from "@/shared/hooks/useGetVendorIcons";
import { Flex, Text } from "@mantine/core";

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
		status: (option) =>
			getMonoMarketAppActivationStatusBadge(appStatusMap[option.value as ApplicationHistoryStatus]),
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
