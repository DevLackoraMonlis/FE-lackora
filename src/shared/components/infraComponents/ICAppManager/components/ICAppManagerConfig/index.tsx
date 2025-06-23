import ICAppManagerContext from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerProvider/ICAppManagerContext";
import ICAppManagerRestrictAccess from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerRestrictAccess";
import { Flex, Loader } from "@mantine/core";
import { useContext } from "react";

type Props = {
	pluginName: string;
	userPlugins: string[];
	onRedirectToPluginPage: () => void;
	loading?: boolean;
};

export default function ICAppManagerConfig(props: Props) {
	const { apps } = useContext(ICAppManagerContext);

	const getPlugin = apps.find((plugin) => plugin.name === props.pluginName);
	const getUserPlugin = props.userPlugins.find(
		(plugin) => plugin === props.pluginName,
	);

	if (props.loading) {
		return (
			<Flex justify="center" w="100%" h="100%" align="center">
				<Loader />
			</Flex>
		);
	}

	if (!getPlugin || !getUserPlugin || !getPlugin.config) {
		return (
			<ICAppManagerRestrictAccess
				appName={props.pluginName}
				onRedirectToAppStorePage={props.onRedirectToPluginPage}
			/>
		);
	}
	if (getPlugin.config) {
		const ConfigPlugin = getPlugin.config;
		return <ConfigPlugin />;
	}
	return null;
}
