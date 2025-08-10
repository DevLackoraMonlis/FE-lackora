import { useSortable } from "@dnd-kit/sortable";
import { Button, Flex, Grid, ScrollArea, Text } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconGripVertical, IconPlus } from "@tabler/icons-react";
import { type ReactNode, useCallback, useEffect, useState } from "react";

import BCEmptyOrError from "@/shared/components/baseComponents/BCEmptyOrError";
import BCEmptyWithCreate from "@/shared/components/baseComponents/BCEmptyWithCreate";
import BCSortable from "@/shared/components/baseComponents/BCSortable";
import { PolicyNoPolicies } from "@/shared/icons/components/policy";

import type { ProfilingInventoryRules } from "../../index.enum";
import { useProfiling, useProfilingEnabled, useProfilingReOrder } from "../../index.hooks";
import type { ProfilingCardData } from "../../index.types";
import DeleteProfilingModal from "../DeleteProfiling";
import ProfilingAccordion from "../ProfilingAccordion";
import ProfilingAccordionSkelton from "../ProfilingAccordionSkelton";
import ProfilingCreateOrEditModal from "../ProfilingCreateOrEditModal";

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

export default function ProfilingAccordionWithDnD({ type }: { type: ProfilingInventoryRules }) {
	const [openedDelete, handleOpenedDelete] = useDisclosure();
	const [openedCreateOrEdit, handleOpenedCreateOrEdit] = useDisclosure();
	const [cards, setCards] = useState<ProfilingCardData[]>([]);
	const [selectedId, setSelectedId] = useState("");

	const { height } = useViewportSize();
	const { inventoryRules } = useProfiling(type);
	const showLandingCreate = !inventoryRules?.isLoading && !inventoryRules?.data?.results?.length;
	const handleRefetchRules = () => {
		setSelectedId("");
		inventoryRules.refetch();
	};

	const { enabledProfiling, loading: enabledLoading } = useProfilingEnabled(handleRefetchRules);
	const handleEnabledProfiling = (id: string) => {
		setSelectedId(id);
		enabledProfiling(id, type);
	};
	const handleDeleteProfiling = (id: string) => {
		setSelectedId(id);
		handleOpenedDelete.open();
	};
	const handleEditOrCreateProfiling = (id: string) => {
		setSelectedId(id);
		handleOpenedCreateOrEdit.open();
	};
	const handleCloseProfiling = () => {
		setSelectedId("");
		handleOpenedCreateOrEdit.close();
		handleOpenedDelete.close();
	};

	useEffect(() => {
		if (!inventoryRules?.isFetching && inventoryRules?.data?.results) {
			setCards(inventoryRules.data.results);
		}
	}, [inventoryRules?.isFetching]);

	const { inventoryRulePriority } = useProfilingReOrder();
	const updateOrder = useCallback(
		(updated: ProfilingCardData[]) => {
			const updateRules = updated.map(({ id }) => id);
			setCards(updated);
			inventoryRulePriority.mutate(
				{ data: { inventory_rules: updateRules, type } },
				{
					onSuccess() {
						handleRefetchRules();
					},
				},
			);
		},
		[type],
	);

	return (
		<>
			<DeleteProfilingModal
				onClose={handleCloseProfiling}
				opened={openedDelete}
				inventoryRuleId={selectedId}
				refetchProfiling={handleRefetchRules}
				type={type}
			/>
			<ProfilingCreateOrEditModal
				onClose={handleCloseProfiling}
				opened={openedCreateOrEdit}
				inventoryRuleId={selectedId}
				refetchProfiling={handleRefetchRules}
				type={type}
			/>
			<ScrollArea h={height - 130}>
				<Grid p="xs" pt="sm">
					<Grid.Col span={8} offset={2} pos="relative" h={showLandingCreate ? height - 230 : "100%"}>
						{showLandingCreate ? (
							inventoryRules.isError ? (
								<BCEmptyOrError
									icon={<PolicyNoPolicies width={140} height={140} />}
									title="Inventory rule has error!"
								/>
							) : (
								<BCEmptyWithCreate
									onCreate={handleOpenedCreateOrEdit.open}
									icon={<PolicyNoPolicies width={140} height={140} />}
									buttonText="Create First Inventory Rule"
									title="No inventory rule has been created to identify assets yet!"
									description="To get started, define a new rule with your desired conditions and appropriate connections Define rules to identify Pull Base assets by collecting information through various adapters."
								/>
							)
						) : inventoryRules?.isLoading ? (
							<ProfilingAccordionSkelton count={6} />
						) : (
							<>
								<Flex justify="space-between" align="center" mb="xs">
									<Text fw="bold" fz="h4">{`Inventory Rules ( ${inventoryRules?.data?.total ?? "-"} )`}</Text>
									<Button
										color="main"
										onClick={handleOpenedCreateOrEdit.open}
										leftSection={<IconPlus size={20} />}
									>
										Create New Rule
									</Button>
								</Flex>
								<BCSortable<ProfilingCardData>
									items={cards}
									handleItemChange={(_event, updated) => updateOrder(updated)}
								>
									{cards.map((card) => (
										<DnDCardBox
											key={card.id}
											id={card.id}
											content={
												<ProfilingAccordion
													{...card}
													selectedId={selectedId}
													loading={enabledLoading}
													handleDeleteProfiling={handleDeleteProfiling}
													handleRefetchPolicies={handleRefetchRules}
													handleEnabledProfiling={handleEnabledProfiling}
													handleEditOrCreateProfiling={handleEditOrCreateProfiling}
												/>
											}
										/>
									))}
								</BCSortable>
							</>
						)}
					</Grid.Col>
				</Grid>
			</ScrollArea>
		</>
	);
}
