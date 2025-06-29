import ICAppManagerContext from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerProvider/ICAppManagerContext";
import ICAppManagerRestrictAccess from "@/shared/components/infraComponents/ICAppManager/components/ICAppManagerRestrictAccess";
import { Flex, Loader } from "@mantine/core";
import { useContext } from "react";

type Props = {
	appName: string;
	userAvailableApps: string[];
	onRedirectToAppStorePage: () => void;
	loading?: boolean;
};

export default function ICAppManagerLandingPage(props: Props) {
	const { apps } = useContext(ICAppManagerContext);

	const getApp = apps.find((app) => app.name === props.appName);
	const getAvailableApp = props.userAvailableApps.find((plugin) => plugin === props.appName);

	if (props.loading) {
		return (
			<Flex justify="center" w="100%" h="100%" align="center">
				<Loader />
			</Flex>
		);
	}

	if (!getApp || !getAvailableApp) {
		return (
			<ICAppManagerRestrictAccess
				appName={props.appName}
				onRedirectToAppStorePage={props.onRedirectToAppStorePage}
			/>
		);
	}

	if (getApp.landing) {
		const LandingPlugin = getApp.landing;
		return <LandingPlugin />;
	}

	return null;
}
