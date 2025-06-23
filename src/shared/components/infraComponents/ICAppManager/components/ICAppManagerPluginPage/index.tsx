import ICAppManagerContext from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerProvider/ICAppManagerContext";
import ICAppManagerRestrictAccess from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerRestrictAccess";
import { Flex, Loader } from "@mantine/core";
import { useContext } from "react";

type Props = {
	appName: string;
	appModuleName: string;
	userAvailableApps: string[];
	userAppModules: string[];
	onRedirectToAppStorePage: () => void;
	loading?: boolean;
};

export default function ICAppManagerPluginPage(props: Props) {
	const { apps } = useContext(ICAppManagerContext);

	const app = apps.find((app) => app.name === props.appName);
	const userAvailableApp = props.userAvailableApps.find(
		(plugin) => plugin === props.appName,
	);

	if (props.loading) {
		return (
			<Flex justify="center" w="100%" h="100%" align="center">
				<Loader />
			</Flex>
		);
	}

	if (!app || !userAvailableApp || !app.modules.length) {
		return (
			<ICAppManagerRestrictAccess
				appName={props.appName}
				onRedirectToAppStorePage={props.onRedirectToAppStorePage}
			/>
		);
	}

	const getModule = app.modules.find(
		(module) => module.name === props.appModuleName,
	);
	const getUserAppModule = props.userAppModules.find(
		(module) => module === props.appModuleName,
	);

	if (!getModule || !getUserAppModule) {
		return (
			<ICAppManagerRestrictAccess
				appName={props.appName}
				onRedirectToAppStorePage={props.onRedirectToAppStorePage}
			/>
		);
	}

	const ModulePlugin = getModule.page;
	return <ModulePlugin />;
}
