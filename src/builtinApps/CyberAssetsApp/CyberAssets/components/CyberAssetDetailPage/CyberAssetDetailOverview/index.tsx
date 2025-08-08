import CyberAssetDetailOverviewApplications from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewApplications";
import CyberAssetDetailOverviewAvailabilityAndActivity from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewAvailabilityAndActivity";
import CyberAssetDetailOverviewCPU from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewCPU";
import CyberAssetDetailOverviewCard from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewCard";
import CyberAssetDetailOverviewChanges from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewChanges";
import CyberAssetDetailOverviewConfigurationItems from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewConfigurationItems";
import CyberAssetDetailOverviewDisk from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewDisk";
import CyberAssetDetailOverviewNetwork from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewNetwork";
import CyberAssetDetailOverviewNotifications from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewNotifications";
import CyberAssetDetailOverviewOperatingSystem from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewOperatingSystem";
import CyberAssetDetailOverviewRAM from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewRAM";
import CyberAssetDetailOverviewSecurity from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewSecurity";
import CyberAssetDetailOverviewTopServices from "@/builtinApps/CyberAssetsApp/CyberAssets/components/CyberAssetDetailPage/CyberAssetDetailOverview/CyberAssetDetailOverviewTopServices";
import type { CyberAssetOsTypeEnum } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.enum";
import { useCyberAssetDetailOverview } from "@/builtinApps/CyberAssetsApp/CyberAssets/index.hooks";
import { Box, Button, Grid, ScrollArea, Tooltip } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconArrowNarrowRight, IconInfoCircle } from "@tabler/icons-react";

const ArrowButton = (props: { onClick?: VoidFunction }) => {
	return (
		<Button onClick={props.onClick} p={0} size={"xs"} variant={"transparent"}>
			<IconArrowNarrowRight size={20} />
		</Button>
	);
};

export default function CyberAssetDetailOverview(props: {
	id?: string;
	appName?: string;
	osType: CyberAssetOsTypeEnum;
	onNetworkRedirect: VoidFunction;
	onChangesRedirect: VoidFunction;
	onTopServicesRedirect: VoidFunction;
	onApplicationsRedirect: VoidFunction;
	onSecurityRedirect: VoidFunction;
	onActivityRedirect: VoidFunction;
}) {
	const { height } = useViewportSize();
	const {
		availabilityAndActivity,
		getAssetOverviewApplicationsDataQuery,
		getAssetOverviewBaseDataQuery,
		getAssetOverviewLatestChangesDataQuery,
		getAssetOverviewNotificationsDataQuery,
		getAssetOverviewSecurityDataQuery,
		getAssetOverviewTopServicesDataQuery,
		getAssetOverviewAvailabilityDataQuery,
		getAssetOverviewActivityDataQuery,
	} = useCyberAssetDetailOverview(props.id, props.appName);

	return (
		<Box p={"sm"}>
			<ScrollArea h={height - 145} mt={"xs"} scrollbars={"y"} scrollbarSize={2}>
				<Grid gutter={"xs"}>
					<Grid.Col span={3}>
						<CyberAssetDetailOverviewCard
							mih={105}
							isLoading={getAssetOverviewBaseDataQuery.isFetching}
							title={"Configuration Items"}
							titleRight={
								<Tooltip label={"Description"}>
									<IconInfoCircle size={20} />
								</Tooltip>
							}
						>
							<CyberAssetDetailOverviewConfigurationItems
								configurationItemsCount={getAssetOverviewBaseDataQuery.data?.data.configurationItemsCount}
							/>
						</CyberAssetDetailOverviewCard>
					</Grid.Col>
					<Grid.Col span={3}>
						<CyberAssetDetailOverviewCard
							isLoading={getAssetOverviewBaseDataQuery.isFetching}
							mih={105}
							title={"Operating System"}
						>
							<CyberAssetDetailOverviewOperatingSystem
								osName={getAssetOverviewBaseDataQuery.data?.data.osName}
								osType={props.osType}
							/>
						</CyberAssetDetailOverviewCard>
					</Grid.Col>
					<Grid.Col span={3}>
						<CyberAssetDetailOverviewCard
							isLoading={getAssetOverviewBaseDataQuery.isFetching}
							mih={105}
							title={"CPU"}
						>
							<CyberAssetDetailOverviewCPU cpu={getAssetOverviewBaseDataQuery.data?.data.cpu} />
						</CyberAssetDetailOverviewCard>
					</Grid.Col>
					<Grid.Col span={3}>
						<Grid gutter={"xs"}>
							<Grid.Col span={6}>
								<CyberAssetDetailOverviewCard
									isLoading={getAssetOverviewBaseDataQuery.isFetching}
									mih={105}
									title={"RAM"}
								>
									<CyberAssetDetailOverviewRAM ram={getAssetOverviewBaseDataQuery.data?.data.ram} />
								</CyberAssetDetailOverviewCard>
							</Grid.Col>
							<Grid.Col span={6}>
								<CyberAssetDetailOverviewCard
									isLoading={getAssetOverviewBaseDataQuery.isFetching}
									mih={105}
									title={"Disk"}
								>
									<CyberAssetDetailOverviewDisk disk={getAssetOverviewBaseDataQuery.data?.data.disk} />
								</CyberAssetDetailOverviewCard>
							</Grid.Col>
						</Grid>
					</Grid.Col>
				</Grid>

				<Grid gutter={"xs"}>
					<Grid.Col span={6}>
						<CyberAssetDetailOverviewCard
							isLoading={getAssetOverviewBaseDataQuery.isFetching}
							mih={120}
							title={"Network"}
							rightSection={<ArrowButton onClick={props.onNetworkRedirect} />}
						>
							<CyberAssetDetailOverviewNetwork network={getAssetOverviewBaseDataQuery.data?.data.network} />
						</CyberAssetDetailOverviewCard>
					</Grid.Col>

					<Grid.Col span={6}>
						<CyberAssetDetailOverviewCard
							isLoading={getAssetOverviewLatestChangesDataQuery.isFetching}
							mih={120}
							title={"Changes"}
							rightSection={<ArrowButton onClick={props.onChangesRedirect} />}
						>
							<CyberAssetDetailOverviewChanges
								changes={getAssetOverviewLatestChangesDataQuery.data?.data.changes}
							/>
						</CyberAssetDetailOverviewCard>
					</Grid.Col>
				</Grid>
				<Grid gutter={"xs"}>
					<Grid.Col span={6}>
						<CyberAssetDetailOverviewCard
							isLoading={getAssetOverviewTopServicesDataQuery.isFetching}
							mih={300}
							title={"Top Services"}
							rightSection={<ArrowButton onClick={props.onTopServicesRedirect} />}
						>
							<CyberAssetDetailOverviewTopServices
								serviceStartTypes={getAssetOverviewTopServicesDataQuery.data?.data.serviceStartTypes}
								topServices={getAssetOverviewTopServicesDataQuery.data?.data.topServices}
							/>
						</CyberAssetDetailOverviewCard>
					</Grid.Col>
					<Grid.Col span={6}>
						<CyberAssetDetailOverviewCard
							isLoading={getAssetOverviewApplicationsDataQuery.isFetching}
							mih={300}
							title={"Applications"}
							rightSection={<ArrowButton onClick={props.onApplicationsRedirect} />}
						>
							<CyberAssetDetailOverviewApplications
								applications={getAssetOverviewApplicationsDataQuery.data?.data.applications}
							/>
						</CyberAssetDetailOverviewCard>
					</Grid.Col>
				</Grid>

				<Grid>
					<Grid.Col span={4}>
						<CyberAssetDetailOverviewCard
							mih={590}
							isLoading={getAssetOverviewSecurityDataQuery.isFetching}
							title={"Security"}
							rightSection={<ArrowButton onClick={props.onSecurityRedirect} />}
						>
							<CyberAssetDetailOverviewSecurity
								security={getAssetOverviewSecurityDataQuery.data?.data.security}
							/>
						</CyberAssetDetailOverviewCard>
					</Grid.Col>
					<Grid.Col span={4}>
						<CyberAssetDetailOverviewCard
							mih={590}
							isLoading={
								getAssetOverviewAvailabilityDataQuery.isFetching ||
								getAssetOverviewActivityDataQuery.isFetching
							}
							title={"Availability & Activity"}
							rightSection={<ArrowButton onClick={props.onActivityRedirect} />}
						>
							<CyberAssetDetailOverviewAvailabilityAndActivity
								availabilityAndActivity={availabilityAndActivity.availabilityAndActivity}
							/>
						</CyberAssetDetailOverviewCard>
					</Grid.Col>
					<Grid.Col span={4}>
						<CyberAssetDetailOverviewCard
							mih={590}
							isLoading={getAssetOverviewNotificationsDataQuery.isFetching}
							title={"Notifications"}
						>
							<CyberAssetDetailOverviewNotifications
								notifications={getAssetOverviewNotificationsDataQuery.data?.data.notifications}
							/>
						</CyberAssetDetailOverviewCard>
					</Grid.Col>
				</Grid>
			</ScrollArea>
		</Box>
	);
}
