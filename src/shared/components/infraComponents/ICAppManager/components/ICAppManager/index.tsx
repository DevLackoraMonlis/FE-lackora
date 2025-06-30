import { Flex, Grid, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useAppManager } from "../../hooks/useAppManager";
import type {
	ICAppManagerPricingType,
	ICAppManagerProps,
	ICAppManagerRqFilterType,
	ICAppManagerRqSortByType,
} from "../../index.types";

import AppManagerCard from "@/shared/components/infraComponents/ICAppManager/components/ICAppManager/components/ICAppManagerCard";
import ICAppManagerFilterPricing from "@/shared/components/infraComponents/ICAppManager/components/ICAppManager/components/ICAppManagerFilter/ICAppManagerFilterPricing";
import ICAppManagerFilterSearchBox from "@/shared/components/infraComponents/ICAppManager/components/ICAppManager/components/ICAppManagerFilter/ICAppManagerFilterSearchBox";
import ICAppManagerFilterSegmentControl from "@/shared/components/infraComponents/ICAppManager/components/ICAppManager/components/ICAppManagerFilter/ICAppManagerFilterSegmentControl";
import { PLUGIN_MANAGER_FILTER_SEGMENT_ITEM } from "@/shared/components/infraComponents/ICAppManager/components/ICAppManager/components/ICAppManagerFilter/ICAppManagerFilterSegmentControl/index.constants";
import ICAppManagerFilterSorting from "@/shared/components/infraComponents/ICAppManager/components/ICAppManager/components/ICAppManagerFilter/ICAppManagerFilterSorting";
import ICAppManagerHeader from "@/shared/components/infraComponents/ICAppManager/components/ICAppManager/components/ICAppManagerHeader";
import ICAppManagerLicenseSupportAlertModal from "@/shared/components/infraComponents/ICAppManager/components/ICAppManager/components/ICAppManagerLicenseSupportAlertModal";
import ICAppManagerSupportLicenseExpiredAlert from "@/shared/components/infraComponents/ICAppManager/components/ICAppManager/components/ICAppManagerSupportLicenseExpiredAlert";
import { useTablePagination } from "@/shared/hooks/useTablePagination";

type Props = ICAppManagerProps;

export default function ICAppManager(props: Props) {
	const [opened, handlerModal] = useDisclosure();
	const [selectPricingValue, setSelectPricingValue] = useState<ICAppManagerPricingType>(
		"ALL" as ICAppManagerPricingType,
	);
	const [selectedType, setSelectedType] = useState<ICAppManagerRqFilterType>(
		PLUGIN_MANAGER_FILTER_SEGMENT_ITEM[0].value,
	);
	const [search, setSearch] = useState<string>("");
	const [sortBy, setSortBy] = useState<ICAppManagerRqSortByType>("Name");

	const { pageSize, page } = useTablePagination();

	const { data, isLoading, refetch } = useAppManager({
		payload: {
			pricing: selectPricingValue,
			page,
			pageSize,
			filter: selectedType,
			search,
			sortBy,
		},
		getAppsApi: props.getAppsApi,
	});

	useEffect(() => {
		if (props.showSupportLicenseError) {
			handlerModal.open();
		}
	}, [props.showSupportLicenseError, handlerModal.open]);

	return (
		<>
			<ICAppManagerLicenseSupportAlertModal
				onGotoLicenseManagement={props.onGotoLicenseManagement}
				close={handlerModal.close}
				opened={opened}
			/>
			<Flex w="100%" direction="column" pos="relative">
				<Flex direction="column" gap="md" p="md">
					<ICAppManagerHeader />
					{props.showSupportLicenseError && (
						<ICAppManagerSupportLicenseExpiredAlert onGotoLicenseManagement={props.onGotoLicenseManagement} />
					)}
					<Flex justify="space-between">
						<ICAppManagerFilterSegmentControl
							info={data?.data.info || { All: 0, Featured: 0, MyApps: 0 }}
							selectedType={selectedType}
							setSelectedType={setSelectedType}
						/>
						<Flex gap={8}>
							<ICAppManagerFilterSearchBox search={search} setSearch={setSearch} />
							<ICAppManagerFilterPricing
								selectValue={selectPricingValue}
								setSelectValue={setSelectPricingValue}
							/>
							<ICAppManagerFilterSorting selectValue={sortBy} setSelectValue={setSortBy} />
						</Flex>
					</Flex>
					<LoadingOverlay visible={isLoading} />
					<Grid gutter={8} w="100%">
						{data?.data.results?.map((item) => (
							<Grid.Col key={item.name} span={4} w="100%">
								<AppManagerCard
									showSupportLicenseError={props.showSupportLicenseError}
									onShowNotification={props.onShowNotification}
									key={item.name}
									submitApi={props.submitActivateAppApi}
									refetch={refetch}
									onClick={props.onClick}
									cardData={item}
									openLicenseModal={handlerModal.open}
									onRequestPurchase={props.onRequestPurchase}
								/>
							</Grid.Col>
						))}
					</Grid>
				</Flex>
			</Flex>
		</>
	);
}
