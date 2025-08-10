import BCSortable from "@/shared/components/baseComponents/BCSortable";
import { useSortable } from "@dnd-kit/sortable";
import { Flex } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import { type ReactNode, useCallback, useEffect, useState } from "react";

import {
	useWorkflowPolicyEnabled,
	useWorkflowPolicyEnforce,
	useWorkflowPolicyReOrder,
} from "../../../../index.hooks";
import type { PolicyCardData, PolicyHandles, PolicyWorkflowTypes } from "../../../../index.types";
import PolicyAccordion from "../PolicyAccordion";

const DnDCardBox = ({ id, content }: { id: string; content: ReactNode }) => {
	const { listeners, setNodeRef, transform, transition } = useSortable({ id });

	const style = {
		...(transform?.y && {
			transform: `translate3d(0px, ${transform?.y}px, 0)`,
		}),
		transition,
		width: "100%",
	};

	return (
		<Flex justify="space-between" gap="sm" style={style} ref={setNodeRef}>
			<Flex pt="2lg" pl="xs">
				<IconGripVertical size={20} {...listeners} />
			</Flex>
			{content}
		</Flex>
	);
};

export default function PolicyAccordionWithDnD({
	policyCards,
	workflowName,
	...handles
}: PolicyHandles & { workflowName: string }) {
	const [cards, setCards] = useState<PolicyCardData[]>([]);
	const [selectedId, setSelectedId] = useState("");
	const { reOrderPolices } = useWorkflowPolicyReOrder();
	const { workflowEnabledPolicy, loading: enabledLoading } = useWorkflowPolicyEnabled(
		handles.handleRefetchPolicies,
	);
	const handleWorkflowEnabledPolicy = (id: string) => {
		setSelectedId(id);
		workflowEnabledPolicy(id);
	};
	const { workflowEnforcePolicy, loading: enforceLoading } = useWorkflowPolicyEnforce(
		handles.handleRefetchPolicies,
	);
	const handleWorkflowEnforcePolicy = (id: string) => {
		setSelectedId(id);
		workflowEnforcePolicy(id);
	};

	const updateOrder = useCallback(
		(updated: PolicyCardData[]) => {
			const policies = updated.map(({ id }) => id);
			reOrderPolices.mutate(
				{ data: { policies, workflow: workflowName as PolicyWorkflowTypes } },
				{
					onSuccess() {
						setCards(updated);
					},
				},
			);
		},
		[workflowName],
	);

	useEffect(() => {
		policyCards && setCards(policyCards);
		return () => setCards([]);
	}, [policyCards]);

	return (
		<BCSortable<PolicyCardData> items={cards} handleItemChange={(_event, updated) => updateOrder(updated)}>
			{cards.map((card) => (
				<DnDCardBox
					key={card.id}
					id={card.id}
					content={
						<PolicyAccordion
							{...card}
							{...handles}
							selectedId={selectedId}
							loading={enforceLoading || enabledLoading}
							handleWorkflowEnforcePolicy={handleWorkflowEnforcePolicy}
							handleWorkflowEnabledPolicy={handleWorkflowEnabledPolicy}
						/>
					}
				/>
			))}
		</BCSortable>
	);
}
