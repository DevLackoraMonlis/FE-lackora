import ConnectionCreateSSHModal from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateSSHModal";
import ConnectionCreateSelectionTypeModal from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateSelectionTypeModal";
import ConnectionEmpty from "@/builtinApps/ObjectsApp/Connections/components/ConnectionEmpty";
import ConnectionIconWrapper from "@/builtinApps/ObjectsApp/Connections/components/ConnectionIconWrapper";
import ConnectionLabelValue from "@/builtinApps/ObjectsApp/Connections/components/ConnectionLabelValue";
import { GET_OBJECTS_CONNECTIONS_QUERY_KEY } from "@/builtinApps/ObjectsApp/Connections/index.constants";
import type { CreateConnectionTypeItem } from "@/builtinApps/ObjectsApp/Connections/index.types";
import { useGetConnections } from "@/http/generated/management-center-connections";
import type { EachConnectionFilterItems } from "@/http/generated/models";
import BCSideFilter, { type BCSideFilterItem } from "@/shared/components/baseComponents/BCSideFilter";
import { useConnectionIcon } from "@/shared/hooks/useConnectionIcon";
import { useStableData } from "@/shared/hooks/useStableData";
import { Accordion, Badge, Button, Flex, Grid, ScrollArea, Skeleton, Text } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { omit } from "lodash";
import { useState } from "react";
import { v4 } from "uuid";

export default function ConnectionList() {
	const { height } = useViewportSize();
	const [openedCreateSelectionTypeModal, createSelectionTypeModalHandlers] = useDisclosure(false);
	const [openedCreateSSHModal, createSSHModalHandlers] = useDisclosure(false);
	const [_openedCreateSNMPModal, createSNMPModalHandlers] = useDisclosure(false);
	const [_openedCreateHTTPModal, createHTTPModalHandlers] = useDisclosure(false);

	const [filters, setFilters] = useState<Record<string, unknown>>();

	const getConnectionsQuery = useGetConnections(filters, {
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

	const typeItems: CreateConnectionTypeItem[] = [
		{
			name: "SSH Connection",
			description: "Secure remote access to servers or devices.",
			onClick: createSSHModalHandlers.open,
			type: "SSH",
		},
		{
			name: "SNMP Connection",
			description: "Monitor and manage network devices.",
			onClick: createSNMPModalHandlers.open,
			type: "SNMP",
		},
		{
			name: "HTTP(HTTPS) Basic Connection",
			description: "Connect to APIs and web services.",
			onClick: createHTTPModalHandlers.open,
			type: "HTTP(HTTPS)",
		},
	];

	if (!getConnectionsQuery.data?.data.results.length && getConnectionsQuery.isFetched) {
		return <ConnectionEmpty onCreate={createSelectionTypeModalHandlers.open} />;
	}

	return (
		<Grid p="sm" pt="lg" gutter="lg" pos={"relative"}>
			<ConnectionCreateSelectionTypeModal
				onBeforeClick={createSelectionTypeModalHandlers.close}
				items={typeItems}
				opened={openedCreateSelectionTypeModal}
				onClose={createSelectionTypeModalHandlers.close}
			/>
			<ConnectionCreateSSHModal
				onTestConnection={(type) => {
					console.log(`Test connection ${type}`);
				}}
				onSuccessCreate={getConnectionsQuery.refetch}
				onChangeType={() => {
					createSSHModalHandlers.close();
					createSelectionTypeModalHandlers.open();
				}}
				opened={openedCreateSSHModal}
				onClose={createSSHModalHandlers.close}
			/>
			<Grid.Col span={{ xs: 12, lg: 3 }}>
				<BCSideFilter
					height={height - 220}
					onChange={setFilters}
					filterItems={[...dynamicFilters]}
					searchPlaceholder={"Search by adapter Name"}
				/>
			</Grid.Col>
			<Grid.Col span={{ xs: 12, lg: 9 }}>
				<Flex justify={"space-between"} align={"center"} py={"md"}>
					<Text fz={"lg"} fw={"bold"}>{`Connections (${getConnectionsQuery.data?.data.total ?? 0})`}</Text>
					<Button onClick={createSelectionTypeModalHandlers.open} color={"main"} leftSection={<IconPlus />}>
						Create Connection
					</Button>
				</Flex>
				<Accordion variant="separated">
					<ScrollArea h={height - 195}>
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
								<Accordion.Panel px={"3xl"} py={"xs"}>
									<Flex direction={"column"} w={"50%"}>
										{Object.entries(omit(item, ["id"])).map(([key, value]) => (
											<ConnectionLabelValue key={key} label={key} value={value as string} />
										))}
									</Flex>
								</Accordion.Panel>
							</Accordion.Item>
						))}
						{getConnectionsQuery.isFetching &&
							Array(3)
								.fill(0)
								.map(() => (
									<Flex key={v4()} gap={"md"} align={"center"} h={100} w={"100%"} justify={"space-between"}>
										<Skeleton animate height={50} circle />
										<Flex w={"100%"} direction={"column"} gap={"sm"}>
											<Skeleton animate width={"100%"} height={8} radius="xl" />
											<Skeleton animate width={"100%"} height={8} radius="xl" />
										</Flex>
									</Flex>
								))}
					</ScrollArea>
				</Accordion>
			</Grid.Col>
		</Grid>
	);
}
