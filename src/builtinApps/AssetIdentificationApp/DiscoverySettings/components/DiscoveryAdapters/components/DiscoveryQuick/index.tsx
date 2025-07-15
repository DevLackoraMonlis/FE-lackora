import { Badge, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import BCModal from "@/shared/components/baseComponents/BCModal";

import { QUICK_DISCOVERY_TITLES } from "../../../../index.constants";
import { useDiscoverySettingQuickDiscovery } from "../../../../index.hooks";
import type { ConfigurationRs } from "../../../../index.types";
import { DiscoveryQuickResults } from "../DiscoveryQuickResults";
import { DiscoveryQuickConfirmDiscovering } from "./components/DiscoveryQuickDiscovering";

type Props = Partial<ConfigurationRs> & {
	onClose: VoidFunction;
	opened: boolean;
};

export function DiscoveryQuickModal(props: Props) {
	const [title, setTitle] = useState(QUICK_DISCOVERY_TITLES.default);
	const [enabledQuery, handleEnabledQuery] = useDisclosure();
	const { discoverySettingRunNow } = useDiscoverySettingQuickDiscovery(
		enabledQuery,
		props.adapterId || "",
		props.configurationId || "",
	);

	const onClose = () => {
		handleEnabledQuery.close();
		props.onClose();
	};

	useEffect(() => {
		return () => {
			handleEnabledQuery.close();
			setTitle(QUICK_DISCOVERY_TITLES.default);
		};
	}, []);

	return (
		<BCModal
			size="40%"
			centered
			title={title}
			onClose={onClose}
			opened={props.opened}
			withCloseButton={!!title}
			closeOnClickOutside={!!title}
		>
			{!enabledQuery ? (
				<>
					<Flex direction="column" gap="xs" px="xs" mb="70px">
						<Flex gap="sm" align="center" justify="center" py="sm">
							<Badge circle size="30px">
								<IconPlayerPlayFilled color="white" />
							</Badge>
							<Text fz="lg" fw="bold">{`Start Quick Discovery With ${props.configurationIP}`}</Text>
						</Flex>
						<Text bg="gray.1" w="90%" mx="auto" py="sm" px="md">
							This will initiate a real-time discovery on the selected gateway. Results will not be saved to
							the system. Do you want to continue?
						</Text>
					</Flex>
					<BCModal.Footer
						applyLabel="Start"
						onApply={() => {
							setTitle("");
							handleEnabledQuery.open();
						}}
						onCancel={onClose}
					/>
				</>
			) : discoverySettingRunNow.isLoading ? (
				<DiscoveryQuickConfirmDiscovering<Props> {...props} />
			) : (
				<DiscoveryQuickResults {...props} />
			)}
		</BCModal>
	);
}
