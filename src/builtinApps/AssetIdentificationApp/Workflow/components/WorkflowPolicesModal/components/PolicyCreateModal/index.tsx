import { Flex } from "@mantine/core";

import BCModal from "@/shared/components/baseComponents/BCModal";
import BCTriggerActions from "@/shared/components/baseComponents/BCTriggerActions";

type Props = {
	onClose: VoidFunction;
	opened: boolean;
	policyId?: string;
};

function PolicyCreate({ policyId = "" }: Props) {
	return (
		<Flex direction="column" gap="xs" mt="xs" key={policyId}>
			<BCTriggerActions />
		</Flex>
	);
}

export default function PolicyCreateModal({ onClose, opened, policyId }: Props) {
	return (
		<BCModal size="70%" onClose={onClose} opened={opened} title="Create New Policy">
			<PolicyCreate onClose={onClose} opened={opened} policyId={policyId} />
		</BCModal>
	);
}
