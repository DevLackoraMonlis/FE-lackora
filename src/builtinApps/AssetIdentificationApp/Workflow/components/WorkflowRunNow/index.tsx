import { Badge, Flex, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

import BCModal from "@/shared/components/baseComponents/BCModal";
import { useWorkflowRunNow } from "../../index.hooks";

type Props = {
	refetchWorkflow: VoidFunction;
	onClose: VoidFunction;
	opened: boolean;
};

export function WorkflowRunNowModal({ opened, onClose, refetchWorkflow }: Props) {
	const workflowCallback = () => {
		refetchWorkflow();
		onClose();
	};
	const { loading, workflowRunNow } = useWorkflowRunNow(workflowCallback);
	return (
		<BCModal size="35%" centered onClose={onClose} opened={opened} title="Confirmation">
			<Flex direction="column" gap="xs" px="xs" mb="70px">
				<Flex gap="sm" align="center" justify="center" py="sm">
					<Badge circle size="35px" variant="light" color="primary.3">
						<Flex align="center" justify="center" c="primary">
							<IconInfoCircle />
						</Flex>
					</Badge>
					<Text fz="lg" fw="bold">
						Run Workflow Manually?
					</Text>
				</Flex>
				<Text bg="gray.1" w="90%" mx="auto" py="sm" px="md">
					The workflow will run in 1 hour and 24 minutes. Are you sure you want to run it now?
				</Text>
			</Flex>
			<BCModal.Footer applyLabel="OK" onApply={workflowRunNow} onCancel={onClose} loading={loading} />
		</BCModal>
	);
}
