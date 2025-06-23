import ICAppManagerCardActivatedApp from "@/shared/components/infraComponents/ICAppManager/components/ICAppManager/components/ICAppManagerCard/ICAppManagerCardActivatedApp";
import ICAppManagerCardExpiredApp from "@/shared/components/infraComponents/ICAppManager/components/ICAppManager/components/ICAppManagerCard/ICAppManagerCardExpiredApp";
import ICAppManagerCardInstallStep from "@/shared/components/infraComponents/ICAppManager/components/ICAppManager/components/ICAppManagerCard/ICAppManagerCardInstallStep";
import ICAppManagerCardNotInstalledApp from "@/shared/components/infraComponents/ICAppManager/components/ICAppManager/components/ICAppManagerCard/ICAppManagerCardNotInstalledApp";
import ICAppManagerActivateModal from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerActivateModal";
import { Flex, Text } from "@mantine/core";
import { useDisclosure, usePrevious } from "@mantine/hooks";
import type React from "react";
import { useEffect } from "react";
import useAppManagerIcon from "../../../../hooks/useAppManagerIcon";
import type {
	ICAppManagerCardProps,
	ICAppManagerIconType,
	ICAppManagerProps,
	ICAppManagerRs,
	ModulePermissionRs,
} from "../../../../index.types";
import classes from "./index.module.css";

type Props = {
	onClick: ICAppManagerCardProps["onClick"];
	onShowNotification: ICAppManagerCardProps["onShowNotification"];
	cardData: ICAppManagerRs;
	openLicenseModal: () => void;
	refetch: () => void;
	submitApi: ICAppManagerProps["submitActivateAppApi"];
	onRequestPurchase?: ICAppManagerProps["onRequestPurchase"];
	showSupportLicenseError: boolean;
	permissions: ModulePermissionRs;
};

export default function AppManagerCard(props: Props) {
	const [activateModalOpened, handlerActivateModalModal] = useDisclosure();
	const previousValue = usePrevious(props.cardData.installingSteps);

	const handelClickCard = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		pliginName: string,
	) => {
		e.stopPropagation();
		if (!props.cardData.isInstalling) {
			props.onClick(pliginName);
		}
	};

	const { PLUGIN_ICON } = useAppManagerIcon({
		size: 32,
		isInstalled: props.cardData.isInstalled,
		isNew: props.cardData.isNew,
		badgeIconSize: 16,
		wrapperSize: 48,
	});

	const generateChildByStatus = () => {
		if (!props.cardData.isInstalled) {
			return (
				<ICAppManagerCardNotInstalledApp
					permissions={props.permissions}
					openLicenseModal={props.openLicenseModal}
					isExpiredLicenseSupport={props.showSupportLicenseError}
					openActivateModalModal={handlerActivateModalModal.open}
					type={props.cardData.type}
				/>
			);
		}
		if (props.cardData.active) {
			return (
				<ICAppManagerCardActivatedApp
					type={props.cardData.type}
					expireDate={props.cardData.expireDate}
					hasConfig={props.cardData.hasConfig}
				/>
			);
		}

		if (
			props.cardData.isExpiredCommercial ||
			props.cardData.isExpiredLicenseSupport
		) {
			return (
				<ICAppManagerCardExpiredApp
					permissions={props.permissions}
					openLicenseModal={props.openLicenseModal}
					isExpiredLicenseSupport={props.cardData.isExpiredLicenseSupport}
					isExpiredCommercial={props.cardData.isExpiredCommercial}
					type={props.cardData.type}
					openActivateModalModal={handlerActivateModalModal.open}
				/>
			);
		}
	};

	const isActiveLastStep = props.cardData.installingSteps.at(-1)?.active;

	useEffect(() => {
		if (previousValue && !previousValue?.at(-1)?.active && isActiveLastStep) {
			props.onShowNotification(
				props.cardData.name,
				props.cardData.module as string[],
			);
		}
	}, [
		isActiveLastStep,
		props.onShowNotification,
		previousValue,
		props.cardData,
	]);

	return (
		<>
			<ICAppManagerActivateModal
				name={props.cardData.name}
				opened={activateModalOpened}
				onClose={handlerActivateModalModal.close}
				submitApi={props.submitApi}
				onSuccess={() => props.refetch()}
				onRequestPurchase={props.onRequestPurchase}
			/>
			{/* UI section */}
			<Flex
				onClick={(e) => handelClickCard(e, props.cardData.name)}
				direction="column"
				gap="xs"
				p="md"
				w="100%"
				h={160}
				pos="relative"
				className={
					props.cardData.isInstalling
						? classes.pluginManagerInstallCardRoot
						: classes.pluginManagerCardRoot
				}
			>
				{props.cardData.isInstalling && (
					<ICAppManagerCardInstallStep
						installingSteps={props.cardData.installingSteps}
						name={props.cardData.name}
					/>
				)}
				<Flex justify="space-between" w="100%" align="flex-start">
					{PLUGIN_ICON[props.cardData.name as ICAppManagerIconType] || "-"}
					{generateChildByStatus()}
				</Flex>
				<Text fw={700} fz={16} className={classes.namePluginCard}>
					{props.cardData.name}
				</Text>
				<Text fw={400} fz={12} className={classes.descriptionPluginCard}>
					{props.cardData.description}
				</Text>
			</Flex>
		</>
	);
}
