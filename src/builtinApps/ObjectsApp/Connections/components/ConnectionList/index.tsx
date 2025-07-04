import ConnectionEmpty from "@/builtinApps/ObjectsApp/Connections/components/ConnectionEmpty";
import ConnectionIconWrapper from "@/builtinApps/ObjectsApp/Connections/components/ConnectionIconWrapper";
import { GET_OBJECTS_CONNECTIONS_QUERY_KEY } from "@/builtinApps/ObjectsApp/Connections/components/index.constants";
import { useGetConnections } from "@/http/generated/management-center-connections";
import type { EachConnectionFilterItems } from "@/http/generated/models";
import BCSideFilter, { type BCSideFilterItem } from "@/shared/components/baseComponents/BCSideFilter";
import { useConnectionIcon } from "@/shared/hooks/useConnectionIcon";
import { useStableData } from "@/shared/hooks/useStableData";
import { Accordion, Badge, Button, Flex, Grid, Text } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function ConnectionList() {
	const { height } = useViewportSize();
	const [_openedCreateModal, createModalHandlers] = useDisclosure(false);

	const [filters, setFilters] = useState<Record<string, unknown>>();

	const getConnectionsQuery = useGetConnections(undefined, {
		query: {
			queryKey: [GET_OBJECTS_CONNECTIONS_QUERY_KEY, filters],
		},
	});
	const { getConnectionIcon } = useConnectionIcon();

	const stableFilters = useStableData<EachConnectionFilterItems[]>(
		getConnectionsQuery.data?.data?.metadata?.filters,
	);

	const dynamicFilters: BCSideFilterItem[] =
		stableFilters?.map((filter) => {
			const filterItem: BCSideFilterItem = {
				items: filter.items,
				label: filter.label,
				name: filter.param,
				type: "CheckedList",
			};
			return filterItem;
		}) || [];

	if (!getConnectionsQuery.data?.data.results.length && getConnectionsQuery.isFetched) {
		return <ConnectionEmpty onCreate={createModalHandlers.open} />;
	}

	return (
		<Grid p="sm" pt="lg" gutter="lg" pos={"relative"}>
			<Grid.Col span={{ xs: 12, lg: 3 }}>
				<BCSideFilter
					height={height - 250}
					onChange={setFilters}
					filterItems={[...dynamicFilters]}
					searchPlaceholder={"Search by adapter Name"}
				/>
			</Grid.Col>
			<Grid.Col span={{ xs: 12, lg: 9 }}>
				<Accordion variant="separated">
					{getConnectionsQuery.data?.data.results.map((item) => (
						<Accordion.Item key={item.id} value={item.id}>
							<Accordion.Control>
								<Flex align="center" justify="space-between">
									<Flex gap="xs" align={"center"}>
										<ConnectionIconWrapper>{getConnectionIcon(item.type)}</ConnectionIconWrapper>
										<Flex direction="column">
											<Text fw="bold">{item.name}</Text>
											<Text fz="sm" c="gray.6">
												{item.description || "-"}
											</Text>
										</Flex>
									</Flex>
									<Flex align="center" gap="xs" px="sm">
										<Badge radius={"xs"} size={"lg"} variant="light" color={"gray"}>
											<Text p="2xs">{item.type.toUpperCase()}</Text>
										</Badge>
										<Button variant={"light"} leftSection={<IconPencil />}>
											Edit
										</Button>
										<Button variant={"light"} leftSection={<IconTrash />}>
											Delete
										</Button>
									</Flex>
								</Flex>
							</Accordion.Control>
							<Accordion.Panel>
								<Text py="xs" c="gray.6">
									Added Gateways
								</Text>
							</Accordion.Panel>
						</Accordion.Item>
					))}
				</Accordion>
			</Grid.Col>
		</Grid>
	);
}
