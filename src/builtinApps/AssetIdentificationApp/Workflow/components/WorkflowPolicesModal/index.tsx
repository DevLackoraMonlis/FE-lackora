import { Button, Flex, Grid, Text } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

import BCDrawer from "@/shared/components/baseComponents/BCDrawer";
import BCEmptyWithCreate from "@/shared/components/baseComponents/BCEmptyWithCreate";
import { PolicyNoPolicies } from "@/shared/icons/components/policy";

import PolicyAccordionWithDnD from "./components/PolicyAccordionWithDnD";
import PolicyCreateModal from "./components/PolicyCreateModal";

type Props = {
	onClose: VoidFunction;
	opened: boolean;
	stepId?: string;
};

function WorkflowPolices({ stepId = "" }: Props) {
	const { height } = useViewportSize();
	const [openedCreateOrEdit, handleOpenedCreateOrEdit] = useDisclosure(true);

	const [selectedPolicyId, setSelectedPolicyId] = useState("");

	const total = 0;

	const handleEditOrCreatePolicy = (id?: string) => {
		setSelectedPolicyId(id || "");
		handleOpenedCreateOrEdit.open();
	};
	const handleDeletePolicy = (id: string) => {
		setSelectedPolicyId(id);
		handleOpenedCreateOrEdit.open();
	};
	const handleEnforcePolicy = (id: string) => {
		setSelectedPolicyId(id);
		handleOpenedCreateOrEdit.open();
	};
	if (!stepId) {
		return (
			<BCEmptyWithCreate
				onCreate={handleEditOrCreatePolicy}
				buttonText="Create First Policy"
				icon={<PolicyNoPolicies width={140} height={140} />}
				title="No Policies Defined Yet!"
				description="You haven’t added any workflow policies for this step. Click “Create First Policy” to get started."
			/>
		);
	}
	const commonProps = {
		handleEditOrCreatePolicy,
		handleDeletePolicy,
		handleEnforcePolicy,
	};
	return (
		<>
			<PolicyCreateModal
				onClose={handleOpenedCreateOrEdit.close}
				opened={openedCreateOrEdit}
				policyId={selectedPolicyId}
			/>
			<Flex direction="column" gap="xs" mt="xs">
				<Flex direction="column">
					<Flex justify="space-between" align="center">
						<Text fw="bold" fz="h4">{`Total Polices ( ${total ?? "-"} )`}</Text>
						<Button color="main" onClick={handleOpenedCreateOrEdit.open} leftSection={<IconPlus size={20} />}>
							Create Policy
						</Button>
					</Flex>
					<Grid gutter="sm" mt="md" pr="xs" style={{ overflowY: "auto" }} h={height - 160} pos="relative">
						<PolicyAccordionWithDnD {...commonProps} />
						{/* {adapterManagement.isLoading ? (
            <AdapterSingleCardSkelton count={9} />
          ) : (
            results?.map((item) => (
              <Grid.Col key={item.id} span={{ xs: 12, md: 6, lg: 4 }}>
                <AdapterSingleCard
                  onDeleteAdapter={() => {
                    setSelectedAdapter(item);
                    handleOpenedDelete.open();
                  }}
                  onUpdateAdapter={() => {
                    setSelectedAdapter(item);
                    handleOpenedUpdate.open();
                  }}
                  adapterBadge={renderAdapterBadge({ iconType: item.adapterType, h: "30px" })}
                  adapterIconPath={item.icon}
                  {...item}
                />
              </Grid.Col>
            ))
          )} */}
					</Grid>
				</Flex>
			</Flex>
		</>
	);
}

export default function WorkflowPolicesModal({ onClose, opened, stepId }: Props) {
	return (
		<BCDrawer size="60%" onClose={onClose} opened={opened} title="Discovery Policies">
			<WorkflowPolices onClose={onClose} opened={opened} stepId={stepId} />
		</BCDrawer>
	);
}
