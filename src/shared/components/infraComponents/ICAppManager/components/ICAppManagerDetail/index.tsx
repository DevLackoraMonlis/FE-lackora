import { Box, Card, Flex, Skeleton, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useAppManagerIcon from "../../hooks/useAppManagerIcon";
import {
	ICAppManagerBusinessTypeEnum,
	type ICAppManagerDetailsProps,
	type ICAppManagerIconType,
	type ICAppManagerProps,
} from "../../index.types";

import ICAppManagerActivateModal from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerActivateModal";
import ICAppManagerAlertModal from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerAlertModal";
import ICAppManagerDetailsCards from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerDetail/components/ICAppManagerDetailsCards";
import ICAppManagerDetailsInstallSteps from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerDetail/components/ICAppManagerDetailsInstallSteps";
import ICAppManagerDetailsStatus from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerDetail/components/ICAppManagerDetailsStatus";
import ICAppManagerDetailsTabs from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerDetail/components/ICAppManagerDetailsTabs";
import { useGetPluginDetails } from "@/shared/components/infraComponents/ICAppManager/hooks/useAppManagerDetail";
import { IconInfoCircle } from "@tabler/icons-react";
import classes from "./index.module.css";

export default function ICAppManagerDetail(props: {
	getAppDetails: ICAppManagerProps["getAppApi"];
	submitApi: ICAppManagerProps["submitActivateAppApi"];
	name?: string;
	getAppHistory: ICAppManagerDetailsProps["getAppHistory"];
	onRequestPurchase?: ICAppManagerProps["onRequestPurchase"];
	onGotoLicenseManagement: ICAppManagerProps["onGotoLicenseManagement"];
}) {
	const [pluginActivateModal, handlerEnableActivateModal] = useDisclosure(false);
	const [pluginAlertModal, handlerEnableAlertModal] = useDisclosure(false);

	const { pluginDetails, pluginDetailsLoading, pluginDetailsRefetch } = useGetPluginDetails({
		getPluginDetails: props.getAppDetails,
		name: props.name,
	});

	const onRequestPurchase = () => {
		props.onRequestPurchase?.(props.name || "");
	};

	const onGotoLicenseManagement = () => {
		props.onGotoLicenseManagement();
	};

	const { PLUGIN_ICON } = useAppManagerIcon({
		isNew: pluginDetails?.isNew,
		isInstalled: pluginDetails?.isInstalled,
		wrapperSize: 96,
		size: 64,
		badgeIconSize: 20,
	});

	return (
		<Box>
			<Flex px={50} py={20} w="100%" gap={20} direction="column">
				<Flex w="100%" align="center" gap={16}>
					<Skeleton visible={pluginDetailsLoading} width={96} height={96}>
						{PLUGIN_ICON[pluginDetails?.name as ICAppManagerIconType] || "-"}
					</Skeleton>
					<Flex direction="column" gap={8}>
						{pluginDetailsLoading ? (
							<Skeleton height={8} width="100%" />
						) : (
							<Text fw={700} className={classes.headerText}>
								{pluginDetails?.name || "-"}
							</Text>
						)}
						<Skeleton visible={pluginDetailsLoading} width="100%" height={50}>
							<ICAppManagerDetailsStatus
								active={!!pluginDetails?.active}
								expireDate={pluginDetails?.expireDate || ""}
								isExpiredLicenseSupport={!!pluginDetails?.isExpiredLicenseSupport}
								isExpiredCommercial={!!pluginDetails?.isExpiredCommercial}
								isInstalled={!!pluginDetails?.isInstalled}
								isNew={!!pluginDetails?.isNew}
								activationCode={pluginDetails?.activationCode || ""}
								pluginType={pluginDetails?.type as ICAppManagerBusinessTypeEnum}
								onGetPlugin={
									pluginDetails?.isExpiredLicenseSupport
										? handlerEnableAlertModal.open
										: handlerEnableActivateModal.open
								}
							/>
						</Skeleton>
					</Flex>
				</Flex>
				{pluginDetails?.type === ICAppManagerBusinessTypeEnum.FREE && (
					<Flex
						p={8}
						pl={15}
						w="100%"
						h="fit-content"
						justify="start"
						align="center"
						gap={6}
						className={classes.notifCardBox}
					>
						<IconInfoCircle width={24} height={24} />
						<Text fw={600} size="sm">
							The services provided by this plugin are dependent on your support service license and are valid
							until the license expires.
						</Text>
					</Flex>
				)}
				<Skeleton visible={pluginDetailsLoading} height="100%" width="100%">
					<Text fw={400} size="sm" className={classes.text}>
						{pluginDetails?.description || "-"}
					</Text>
				</Skeleton>
				<ICAppManagerDetailsCards data={pluginDetails} loading={pluginDetailsLoading} />
				{pluginDetails?.isInstalled ? (
					<ICAppManagerDetailsTabs
						name={pluginDetails?.name || ""}
						getPluginHistory={props.getAppHistory}
						loading={pluginDetailsLoading}
						summary={pluginDetails?.summary as string}
					/>
				) : (
					<Card px={12} py={13} withBorder className={classes.cardBox}>
						<Text fw={700} size="lg">
							Summary
						</Text>
						<Skeleton visible={pluginDetailsLoading} height="100%" width="100%">
							<Text fw={400} size="sm" className={classes.text}>
								{pluginDetails?.summary || ""}
							</Text>
						</Skeleton>
					</Card>
				)}
				{pluginDetails?.isInstalling && pluginDetails?.installingSteps.length > 0 && (
					<ICAppManagerDetailsInstallSteps
						name={pluginDetails?.name}
						installingSteps={pluginDetails?.installingSteps}
					/>
				)}
				<ICAppManagerActivateModal
					opened={pluginActivateModal}
					onClose={handlerEnableActivateModal.close}
					onSuccess={pluginDetailsRefetch}
					submitApi={props.submitApi}
					onRequestPurchase={onRequestPurchase}
					name={pluginDetails?.name || ""}
				/>
				<ICAppManagerAlertModal
					opened={pluginAlertModal}
					onClose={handlerEnableAlertModal.close}
					onGotoLicenseManagement={onGotoLicenseManagement}
				/>
			</Flex>
		</Box>
	);
}
