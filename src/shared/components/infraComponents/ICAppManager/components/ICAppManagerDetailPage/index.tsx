import ICAppManagerContext from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerProvider/ICAppManagerContext";
import ICAppManagerRestrictAccess from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerRestrictAccess";
import { Flex, Loader } from "@mantine/core";
import { useContext } from "react";

type Props = {
	pluginName: string;
	moduleName: string;
	userApps: string[];
	userAppModules: string[];
	onRedirectToPluginPage: () => void;
	loading?: boolean;
};

export default function ICAppManagerDetailPage(props: Props) {
	const { apps } = useContext(ICAppManagerContext);

	const getPlugin = apps.find((plugin) => plugin.name === props.pluginName);
	const getUserPlugin = props.userApps.find(
		(plugin) => plugin === props.pluginName,
	);

	if (props.loading) {
		return (
			<Flex justify="center" w="100%" h="100%" align="center">
				<Loader />
			</Flex>
		);
	}

	if (!getPlugin || !getUserPlugin || !getPlugin.modules.length) {
		return (
			<ICAppManagerRestrictAccess
				appName={props.pluginName}
				onRedirectToAppStorePage={props.onRedirectToPluginPage}
			/>
		);
	}

	const getModule = getPlugin.modules.find(
		(module) => module.name === props.moduleName,
	);
	const getUserPluginModule = props.userAppModules.find(
		(module) => module === props.moduleName,
	);

	if (!getModule || !getUserPluginModule) {
		return (
			<ICAppManagerRestrictAccess
				appName={props.pluginName}
				onRedirectToAppStorePage={props.onRedirectToPluginPage}
			/>
		);
	}

	if (getModule.detailPage) {
		const ModulePlugin = getModule.detailPage;
		return <ModulePlugin />;
	}

	return null;
}
