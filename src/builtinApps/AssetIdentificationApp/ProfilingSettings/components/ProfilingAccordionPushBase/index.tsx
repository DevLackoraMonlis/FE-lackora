import { Switch, Text, getGradient } from "@mantine/core";
import { Badge, Card, Flex, Highlight } from "@mantine/core";
import { IconGavel } from "@tabler/icons-react";

import type { ProfilingCardData, ProfilingHandles } from "../../index.types";

type Props = ProfilingCardData &
	Omit<ProfilingHandles, "profilingCards" | "handleEditOrCreateProfiling" | "handleDeleteProfiling"> & {
		selectedId: string;
		loading: boolean;
	};

export default function ProfilingAccordionPushBase({ id, ...props }: Props) {
	return (
		<Card mt="xs">
			<Flex align="center" justify="space-between">
				<Flex align="center" gap="xs">
					<Card
						w={40}
						h={40}
						variant="light"
						shadow="none"
						padding={0}
						styles={(theme) => ({
							root: {
								background: getGradient({ deg: 180, from: "primary.4", to: "primary.9" }, theme),
								color: theme.white,
							},
						})}
					>
						<Flex justify="center" align="center" m="auto">
							<IconGavel size={20} />
						</Flex>
					</Card>
					<Flex direction="column">
						<Text fw="bold">{props.title}</Text>
						<Text fz="xs">{props.description}</Text>
					</Flex>
				</Flex>
				<Flex align="center" gap="xs" px="sm">
					{!!props.matched_assets && (
						<Badge
							w="180px"
							variant="light"
							color="gray"
							tt="capitalize"
							p="sm"
							onClick={(e) => {
								e.stopPropagation();
								props.handleMatchedAssets(id);
							}}
						>
							<Highlight
								className="cursor-pointer"
								highlight={[`${props.matched_assets ?? "-"}`]}
								highlightStyles={{
									background: "transparent",
									fontWeight: "bold",
									textDecoration: "underline",
									margin: "0px 5px",
								}}
							>
								{`${props.matched_assets ?? "-"} MATCHED ASSETS`}
							</Highlight>
						</Badge>
					)}
					<Switch
						checked={props.isActive}
						color="green"
						labelPosition="left"
						label={props.isActive ? "Enable" : "Disable"}
						radius="lg"
						onChange={() => props.handleEnabledProfiling(id)}
						className="cursor-pointer"
					/>
				</Flex>
			</Flex>
		</Card>
	);
}
