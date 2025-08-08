import { Flex } from "@mantine/core";
import { clone, pullAt } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
	useWorkflowPolicyEnabled,
	useWorkflowPolicyEnforce,
	useWorkflowPolicyReOrder,
} from "../../../../index.hooks";
import type { PolicyCardData, PolicyHandles, PolicyWorkflowTypes } from "../../../../index.types";
import PolicyAccordion from "../PolicyAccordion";
import DnDCardBox from "./components/DnDCardBox";

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

	const moveCard = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			const updated = clone(cards);
			const [draggedItem] = pullAt(updated, dragIndex);
			updated.splice(hoverIndex, 0, draggedItem);
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
		[cards, workflowName],
	);

	const renderCard = useCallback((card: PolicyCardData, index: number) => {
		return (
			<DnDCardBox
				key={card.id}
				id={card.id}
				index={index}
				moveCard={moveCard}
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
		);
	}, []);

	useEffect(() => {
		policyCards && setCards(policyCards);
		return () => setCards([]);
	}, [policyCards]);

	return (
		<DndProvider backend={HTML5Backend}>
			<Flex direction="column" gap="xs" w="100%">
				{cards.map((card, i) => renderCard(card, i))}
			</Flex>
		</DndProvider>
	);
}
