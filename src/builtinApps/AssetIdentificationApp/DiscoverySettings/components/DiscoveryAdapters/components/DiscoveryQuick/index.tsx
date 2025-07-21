import { Badge, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

import BCModal from "@/shared/components/baseComponents/BCModal";

import { QUICK_DISCOVERY_TITLES } from "../../../../index.constants";
import { useDiscoverySettingQuickDiscovery } from "../../../../index.hooks";
import type { ConfigurationRs } from "../../../../index.types";
import { DiscoveryQuickConfirmDiscovering } from "./components/DiscoveryQuickDiscovering";
import { DiscoveryQuickResults } from "./components/DiscoveryQuickResults";

type Props = Partial<ConfigurationRs> & {
	onClose: VoidFunction;
	opened: boolean;
};

export function DiscoveryQuickModal(props: Props) {
	const [enabledQuery, handleEnabledQuery] = useDisclosure();
	const { discoverySettingRunNow } = useDiscoverySettingQuickDiscovery(
		enabledQuery,
		props.adapterId || "",
		props.configurationId || "",
	);

	const onClose = () => {
		setTimeout(() => handleEnabledQuery.close(), 1000);
		props.onClose();
	};

	const { default: defaultTitle, loading, results } = QUICK_DISCOVERY_TITLES;
	const titleSize = !enabledQuery ? defaultTitle : discoverySettingRunNow.isFetching ? loading : results;
	return (
		<BCModal
			size={titleSize.size}
			h={titleSize.hight}
			centered
			onClose={onClose}
			opened={props.opened}
			title={titleSize.title}
			withCloseButton={!!titleSize.title}
			closeOnClickOutside={!!titleSize.title}
		>
			{!enabledQuery ? (
				<>
					<Flex direction="column" gap="xs" px="xs" mb="70px">
						<Flex gap="sm" align="center" justify="center" py="sm">
							<Badge circle size="35px">
								<Flex align="center" justify="center">
									<IconPlayerPlayFilled color="white" />
								</Flex>
							</Badge>
							<Text fz="lg" fw="bold">{`Start Quick Discovery With ${props.configurationIP}`}</Text>
						</Flex>
						<Text bg="gray.1" w="90%" mx="auto" py="sm" px="md">
							This will initiate a real-time discovery on the selected gateway. Results will not be saved to
							the system. Do you want to continue?
						</Text>
					</Flex>
					<BCModal.Footer applyLabel="Start" onApply={handleEnabledQuery.open} onCancel={onClose} />
				</>
			) : discoverySettingRunNow.isFetching ? (
				<DiscoveryQuickConfirmDiscovering<Props> {...props} />
			) : (
				<DiscoveryQuickResults enabledQuery={false} {...props} />
			)}
		</BCModal>
	);
}
