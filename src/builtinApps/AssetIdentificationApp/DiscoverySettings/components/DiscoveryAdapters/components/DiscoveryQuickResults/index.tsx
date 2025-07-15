import { useDiscoverySettingQuickDiscovery } from "../../../../index.hooks";
import type { ConfigurationRs } from "../../../../index.types";

type Props = Partial<ConfigurationRs>;

export function DiscoveryQuickResults(props: Props) {
	const { discoverySettingRunNow } = useDiscoverySettingQuickDiscovery(
		true,
		props.adapterId || "",
		props.configurationId || "",
	);
	console.log(discoverySettingRunNow);
	return "";
}
