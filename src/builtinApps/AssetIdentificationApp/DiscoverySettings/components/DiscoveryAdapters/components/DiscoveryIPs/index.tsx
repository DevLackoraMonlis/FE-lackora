import BCDrawer from "@/shared/components/baseComponents/BCDrawer";

import type { ConfigurationRs } from "../../../../index.types";
import { DiscoveryLastRun } from "./components/DiscoveryLastRun";

type Props = Partial<ConfigurationRs> & {
	onClose: VoidFunction;
	opened: boolean;
};

export function DiscoveryIPsDrawerModal({ onClose, opened, ...configs }: Props) {
	return (
		<BCDrawer onClose={onClose} opened={opened} title="Discovered IPs">
			<DiscoveryLastRun enabledQuery={true} hightOffset={310} {...configs} />
		</BCDrawer>
	);
}
