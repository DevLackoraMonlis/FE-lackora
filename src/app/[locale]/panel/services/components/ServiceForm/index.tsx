import { Tabs } from "@mantine/core";
import { IconClick, IconPlus } from "@tabler/icons-react";

import BCModal from "@/shared/components/baseComponents/BCModal";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";

import SelectedService from "./components/SelectedService";
import ServiceForm from "./components/ServiceForm";

type Props = {
	refetchList: VoidFunction;
	onClose: VoidFunction;
	opened: boolean;
};

export default function ServiceFormModal(props: Props) {
	const { isMd } = useBreakpoint();
	return (
		<BCModal
			size={isMd ? "60%" : "100%"}
			centered
			closeOnClickOutside={false}
			onClose={props.onClose}
			opened={props.opened}
			title="Add new service"
		>
			<Tabs defaultValue="select">
				<Tabs.List grow justify="center">
					<Tabs.Tab value="select" leftSection={<IconClick size={15} />}>
						Select service
					</Tabs.Tab>
					<Tabs.Tab value="create" leftSection={<IconPlus size={15} />}>
						Create new service
					</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel value="select">
					<SelectedService />
				</Tabs.Panel>
				<Tabs.Panel value="create">
					<ServiceForm {...props} />
				</Tabs.Panel>
			</Tabs>
		</BCModal>
	);
}
