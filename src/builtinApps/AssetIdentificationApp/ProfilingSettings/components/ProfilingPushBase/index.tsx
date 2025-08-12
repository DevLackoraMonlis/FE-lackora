import { Grid, ScrollArea } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";

import type { ProfilingInventoryRules } from "../../index.enum";
import { useProfiling, useProfilingEnabled } from "../../index.hooks";
import type { ProfilingCardData } from "../../index.types";
import ProfilingAccordionPushBase from "../ProfilingAccordionPushBase";
import ProfilingMatchedAssetsModal from "../ProfilingMatchedAssets";
import ProfilingPushBaseSkelton from "../ProfilingPushBaseSkelton";

export default function ProfilingPushBase({ type }: { type: ProfilingInventoryRules }) {
	const [openedAssets, handleOpenedAssets] = useDisclosure();
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
	const handleMatchedAssets = (id: string) => {
		setSelectedId(id);
		handleOpenedAssets.open();
	};
	const handleCloseProfiling = () => {
		setSelectedId("");
		handleOpenedAssets.close();
	};

	useEffect(() => {
		if (!inventoryRules?.isFetching && inventoryRules?.data?.results) {
			setCards(inventoryRules.data.results);
		}
	}, [inventoryRules?.isFetching]);

	return (
		<>
			<ProfilingMatchedAssetsModal
				onClose={handleCloseProfiling}
				opened={openedAssets}
				inventoryRuleId={selectedId}
				type={type}
			/>
			<ScrollArea h={height - 130}>
				<Grid p="xs" pt="sm">
					<Grid.Col span={8} offset={2} pos="relative" h={showLandingCreate ? height - 230 : "100%"}>
						{inventoryRules?.isLoading ? (
							<ProfilingPushBaseSkelton count={7} />
						) : (
							<>
								{cards.map((card) => (
									<ProfilingAccordionPushBase
										key={card.id}
										{...card}
										selectedId={selectedId}
										loading={enabledLoading}
										handleRefetchPolicies={handleRefetchRules}
										handleEnabledProfiling={handleEnabledProfiling}
										handleMatchedAssets={handleMatchedAssets}
									/>
								))}
							</>
						)}
					</Grid.Col>
				</Grid>
			</ScrollArea>
		</>
	);
}
