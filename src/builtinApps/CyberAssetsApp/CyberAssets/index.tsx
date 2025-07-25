import CyberAssetsCrudButtons from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetsCrudButtons";
import { CYBER_ASSETS_FORMATTED_COLUMNS } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.constants";
import {
	CyberAssetCriticality,
	CyberAssetDiscoveryType,
	CyberAssetState,
	CyberAssetStatus,
} from "@/builtinApps/CyberAssetsApp/CyberAssets/index.enum";
import BCMultiTabPage from "@/shared/components/baseComponents/BCMultiTabPage";
import type { BCMultiTabPageActions } from "@/shared/components/baseComponents/BCMultiTabPage/index.types";
import ICAdvancedFilter from "@/shared/components/infraComponents/ICAdvancedFilter";
import { createDynamicICAdvancedStore } from "@/shared/components/infraComponents/ICAdvancedFilter/index.store";
import type {
	ICAdvancedFilterDataRs,
	ICAdvancedFilterProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import { Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useRef } from "react";
import { v4 } from "uuid";

const randomIP = () => `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;

const randomMAC = () =>
	Array.from({ length: 6 }, () =>
		Math.floor(Math.random() * 256)
			.toString(16)
			.padStart(2, "0"),
	).join(":");

type AddNewPageType = Pick<ICAdvancedFilterProps<ICAdvancedFilterDataRs>, "defaultVariables" | "store">;

export default function CyberAssetsLandingPage() {
	const { height } = useViewportSize();
	const ref = useRef<BCMultiTabPageActions<AddNewPageType> | null>(null);

	const totalAssets = 2500;
	const getRandomItem = (arr: unknown[]) => arr[Math.floor(Math.random() * arr.length)];

	const data: ICAdvancedFilterDataRs[] = Array.from({ length: 50 }, (_, i) => ({
		id: v4(),
		hostname: `Host-${i + 1}`,
		private_ip: randomIP(),
		mac_address: randomMAC(),
		previous_status: getRandomItem([
			CyberAssetStatus.PROFILED,
			CyberAssetStatus.UNREACHABLE,
			CyberAssetStatus.DEFECTIVE,
			CyberAssetStatus.EXTERNAL,
			CyberAssetStatus.GUEST,
			CyberAssetStatus.ASSOCIATED,
			CyberAssetStatus.NO_POLICY,
		]) as string,
		current_status: getRandomItem([
			CyberAssetStatus.PROFILED,
			CyberAssetStatus.UNREACHABLE,
			CyberAssetStatus.DEFECTIVE,
			CyberAssetStatus.EXTERNAL,
			CyberAssetStatus.GUEST,
			CyberAssetStatus.ASSOCIATED,
			CyberAssetStatus.NO_POLICY,
		]) as string,
		criticality: getRandomItem([
			CyberAssetCriticality.LOW,
			CyberAssetCriticality.MEDIUM,
			CyberAssetCriticality.HIGH,
			CyberAssetCriticality.VERY_HIGH,
		]) as string,
		os: getRandomItem(["windows", "linux", "macos", "unix"]) as string,
		discovery_type: getRandomItem([
			CyberAssetDiscoveryType.MANUAL,
			CyberAssetDiscoveryType.DISCOVERED,
			CyberAssetDiscoveryType.BY_INVENTORY,
		]) as string,
		state: getRandomItem([CyberAssetState.MANAGEABLE, CyberAssetState.UNMANAGEABLE]) as string,
		message: `Sample message for host ${i + 1}`,
	}));

	const mainStore = createDynamicICAdvancedStore();

	return (
		<BCMultiTabPage<AddNewPageType>
			subTitle={<Text c={"gray.7"} fz={"xs"}>{`(Result for last Scan: ${totalAssets})`}</Text>}
			staticPageTitle={"All Assets"}
			ref={ref}
			title={"Cyber Assets"}
			mainPage={(params) => (
				<ICAdvancedFilter<ICAdvancedFilterDataRs>
					excludeColumns={["id"]}
					store={params?.store || mainStore}
					searchInputPlaceholder={"Search by hostname"}
					searchInputItems={[
						{
							label: "Host Name",
							value: "hostname",
						},
					]}
					data={data}
					run={() => {
						console.log("run");
					}}
					columns={CYBER_ASSETS_FORMATTED_COLUMNS}
					allColumns={[]}
					height={height - 200}
					idAccessor={"id"}
					isLoading={false}
					totalRecords={100}
					minColumnSize={180}
					defaultColumnSize={200}
					leftSection={
						<CyberAssetsCrudButtons
							onDelete={() => {
								console.log("delete");
							}}
							onEdit={() => {
								console.log("edit");
							}}
							onNew={() => {
								console.log("edit");
								ref.current?.addNewPage("new Asset", {
									store: createDynamicICAdvancedStore(),
									defaultVariables: {
										page: 1,
										limit: 1000,
										columns: [],
										search: {
											value: "morteza for test default",
											columnName: "",
										},
										conditions: [],
									},
								});
							}}
						/>
					}
					defaultVariables={params?.defaultVariables}
				/>
			)}
		/>
	);
}
