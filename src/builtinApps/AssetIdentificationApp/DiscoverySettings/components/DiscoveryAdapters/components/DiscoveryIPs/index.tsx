import BCDrawer from "@/shared/components/baseComponents/BCDrawer";

import type { ConfigurationRs } from "../../../../index.types";
import { DiscoveryQuickResults } from "../DiscoveryQuickResults";

type Props = Partial<ConfigurationRs> & {
	onClose: VoidFunction;
	opened: boolean;
};

export function DiscoveryIPsDrawerModal({ onClose, opened, ...configs }: Props) {
	return (
		<BCDrawer onClose={onClose} opened={opened} title="Discovered IPs">
			<DiscoveryQuickResults enabledQuery={true} hightOffset={310} {...configs} />
		</BCDrawer>
	);
}
