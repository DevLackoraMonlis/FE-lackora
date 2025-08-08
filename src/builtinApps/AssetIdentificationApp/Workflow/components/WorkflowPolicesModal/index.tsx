import { Button, Flex, Grid, Text } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

import BCDrawer from "@/shared/components/baseComponents/BCDrawer";
import BCEmptyWithCreate from "@/shared/components/baseComponents/BCEmptyWithCreate";
import { PolicyNoPolicies } from "@/shared/icons/components/policy";

import { useWorkflowPolicy } from "../../index.hooks";
import PolicyAccordionSkelton from "./components/PolicyAccordionSkelton";
import PolicyAccordionWithDnD from "./components/PolicyAccordionWithDnD";
import PolicyCreateOrEditModal from "./components/PolicyCreateOrEditModal";

type Props = {
	onClose: VoidFunction;
	opened: boolean;
	stepName?: string;
};

function WorkflowPolices({ stepName = "" }: Props) {
	const { height } = useViewportSize();
	const [openedCreateOrEdit, handleOpenedCreateOrEdit] = useDisclosure();
	const { polices } = useWorkflowPolicy(stepName);

	const [selectedPolicyId, setSelectedPolicyId] = useState("");
	const handleEditOrCreatePolicy = (id?: string) => {
		setSelectedPolicyId(id || "");
		handleOpenedCreateOrEdit.open();
	};
	const handleDeletePolicy = (id: string) => {
		setSelectedPolicyId(id);
		handleOpenedCreateOrEdit.open();
	};
	const handleRefetchPolicies = () => {
		polices.refetch();
	};
	const commonProps = {
		handleEditOrCreatePolicy,
		handleDeletePolicy,
		handleRefetchPolicies,
	};
	return (
		<>
			<PolicyCreateOrEditModal
				onClose={handleOpenedCreateOrEdit.close}
				opened={openedCreateOrEdit}
				policyId={selectedPolicyId}
				onSubmit={(_values) => {}}
			/>
			{!polices?.isLoading && !polices?.data?.results?.length ? (
				<BCEmptyWithCreate
					onCreate={handleEditOrCreatePolicy}
					buttonText="Create First Policy"
					icon={<PolicyNoPolicies width={140} height={140} />}
					title="No Policies Defined Yet!"
					description="You haven’t added any workflow policies for this step. Click “Create First Policy” to get started."
				/>
			) : (
				<Flex direction="column" gap="xs" mt="xs">
					<Flex direction="column">
						<Flex justify="space-between" align="center">
							<Text fw="bold" fz="h4">{`Total Polices ( ${polices?.data?.total ?? "-"} )`}</Text>
							<Button
								color="main"
								onClick={handleOpenedCreateOrEdit.open}
								leftSection={<IconPlus size={20} />}
							>
								Create Policy
							</Button>
						</Flex>
						<Grid gutter="sm" mt="md" pr="xs" style={{ overflowY: "auto" }} h={height - 160} pos="relative">
							{polices?.isLoading ? (
								<PolicyAccordionSkelton count={7} />
							) : (
								<PolicyAccordionWithDnD
									policyCards={polices?.data?.results}
									workflowName={stepName}
									{...commonProps}
								/>
							)}
						</Grid>
					</Flex>
				</Flex>
			)}
		</>
	);
}

export default function WorkflowPolicesModal({ onClose, opened, stepName }: Props) {
	return (
		<BCDrawer size="60%" onClose={onClose} opened={opened} title="Discovery Policies">
			<WorkflowPolices onClose={onClose} opened={opened} stepName={stepName} />
		</BCDrawer>
	);
}
