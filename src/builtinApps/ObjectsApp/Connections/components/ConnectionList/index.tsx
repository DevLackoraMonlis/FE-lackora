import ConnectionCreateHTTPModal from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateHTTPModal";
import ConnectionCreateSNMPModal from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateSNMPModal";
import ConnectionCreateSSHModal from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateSSHModal";
import ConnectionCreateSelectionTypeModal from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateSelectionTypeModal";
import ConnectionEmpty from "@/builtinApps/ObjectsApp/Connections/components/ConnectionEmpty";
import ConnectionIconWrapper from "@/builtinApps/ObjectsApp/Connections/components/ConnectionIconWrapper";
import ConnectionLabelValue from "@/builtinApps/ObjectsApp/Connections/components/ConnectionLabelValue";
import ConnectionListActionButtons from "@/builtinApps/ObjectsApp/Connections/components/ConnectionList/ConnectionListActionButtons";
import ConnectionListSkeleton from "@/builtinApps/ObjectsApp/Connections/components/ConnectionList/ConnectionListSkeleton";
import {
	GET_OBJECTS_CONNECTIONS_QUERY_KEY,
	GET_OBJECTS_CONNECTION_QUERY_KEY,
} from "@/builtinApps/ObjectsApp/Connections/index.constants";
import {
	CreateConnectionHTTPProtocolType,
	type CreateConnectionSNMPAuthenticationProtocolType,
	type CreateConnectionSNMPPrivacyProtocolType,
	CreateConnectionSNMPSecurityLdLevelType,
	CreateConnectionSNMPVersionType,
	CreateConnectionSSHAuthenticationType,
} from "@/builtinApps/ObjectsApp/Connections/index.enum";
import type {
	CreateConnectionType,
	CreateConnectionTypeItem,
} from "@/builtinApps/ObjectsApp/Connections/index.types";
import type { CustomError } from "@/http/end-points/GeneralService.types";
import {
	useDeleteConnection,
	useGetConnection,
	useGetConnectionUsedInObjects,
	useGetConnections,
} from "@/http/generated/management-center-connections";
import type { EachConnectionFilterItems, EachConnectionType } from "@/http/generated/models";
import BCDeleteModal from "@/shared/components/baseComponents/BCDeleteModal";
import BCDeleteRestrictModal from "@/shared/components/baseComponents/BCDeleteRestrictModal";
import BCSideFilter, { type BCSideFilterItem } from "@/shared/components/baseComponents/BCSideFilter";
import { useConnectionIcon } from "@/shared/hooks/useConnectionIcon";
import { useStableData } from "@/shared/hooks/useStableData";
import { getErrorMessage } from "@/shared/lib/utils";
import { Accordion, Button, Flex, Grid, ScrollArea, Text } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import { omit } from "lodash";
import { useEffect, useState } from "react";

export default function ConnectionList() {
	const { height } = useViewportSize();
	const [openedCreateSelectionTypeModal, createSelectionTypeModalHandlers] = useDisclosure(false);
	const [openedCreateSSHModal, createSSHModalHandlers] = useDisclosure(false);
	const [openedCreateSNMPModal, createSNMPModalHandlers] = useDisclosure(false);
	const [openedCreateHTTPModal, createHTTPModalHandlers] = useDisclosure(false);
	const [openedDeleteModal, deleteModalHandlers] = useDisclosure(false);
	const [openedDeleteRestrictModal, deleteRestrictModalHandlers] = useDisclosure(false);
	const [selectedConnectionId, setSelectedConnectionId] = useState<string | undefined>(undefined);
	const [selectedEditConnectionId, setSelectedEditConnectionId] = useState<string | undefined>(undefined);

	const [filters, setFilters] = useState<Record<string, unknown>>();

	const getConnectionsQuery = useGetConnections(filters, {
		query: {
			queryKey: [GET_OBJECTS_CONNECTIONS_QUERY_KEY, filters],
		},
	});

	const deleteConnectionMutation = useDeleteConnection({
		mutation: {
			onSuccess: () => {
				notifications.show({
					title: "Success",
					message: "Connection Deleted Successfully",
					color: "green",
					withBorder: true,
				});
				setSelectedConnectionId(undefined);
				deleteModalHandlers.close();
				void getConnectionsQuery.refetch();
			},
		},
	});

	const deleteUsedInConnectionQuery = useGetConnectionUsedInObjects(selectedConnectionId || "", {
		query: {
			enabled: !!selectedConnectionId,
		},
	});
	const { getConnectionIcon } = useConnectionIcon();
	const selectedConnection = getConnectionsQuery.data?.data.results.find(
		(item) => item.id === selectedConnectionId,
	);
	const stableFilters = useStableData<EachConnectionFilterItems[]>(
		getConnectionsQuery.data?.data?.metadata?.filters,
	);

	const getConnectionQuery = useGetConnection(selectedEditConnectionId || "", {
		query: {
			enabled: !!selectedEditConnectionId,
			queryKey: [GET_OBJECTS_CONNECTION_QUERY_KEY, selectedEditConnectionId],
		},
	});

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

	const securityLevelMap: Record<string, CreateConnectionSNMPSecurityLdLevelType> = {
		authentication_only: CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_ONLY,
		authentication_privacy: CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_PRIVACY,
		no_security: CreateConnectionSNMPSecurityLdLevelType.NO_SECURITY,
	};

	const connectionTypeMap: Record<EachConnectionType, CreateConnectionType> = {
		http_https: "HTTP(HTTPS)",
		snmp: "SNMP",
		ssh: "SSH",
	};

	useEffect(() => {
		if (deleteUsedInConnectionQuery.error && deleteUsedInConnectionQuery.isFetched) {
			deleteRestrictModalHandlers.open();
		}
	}, [deleteUsedInConnectionQuery.error]);

	useEffect(() => {
		if (deleteUsedInConnectionQuery.data?.data) {
			deleteModalHandlers.open();
		}
	}, [deleteUsedInConnectionQuery.data?.data]);

	if (!getConnectionsQuery.data?.data.results.length && getConnectionsQuery.isFetched) {
		return <ConnectionEmpty onCreate={createSelectionTypeModalHandlers.open} />;
	}

	return (
		<Grid p="sm" pt="lg" gutter="lg" pos={"relative"}>
			<BCDeleteRestrictModal
				onOk={() => {
					setSelectedConnectionId(undefined);
					deleteRestrictModalHandlers.close();
				}}
				opened={openedDeleteRestrictModal}
				onClose={() => {
					setSelectedConnectionId(undefined);
					deleteModalHandlers.close();
				}}
				loading={false}
				title={"Deletion Restricted"}
				deleteItemName={selectedConnection?.name || ""}
				description={getErrorMessage(deleteUsedInConnectionQuery?.error as CustomError)}
			/>
			<BCDeleteModal
				onDelete={() => {
					selectedConnectionId && deleteConnectionMutation.mutate({ connectionId: selectedConnectionId });
				}}
				opened={openedDeleteModal}
				onClose={() => {
					setSelectedConnectionId(undefined);
					deleteModalHandlers.close();
				}}
				loading={deleteConnectionMutation.isPending}
				onCancel={() => {
					setSelectedConnectionId(undefined);
					deleteModalHandlers.close();
				}}
				title={"Confirm Deletion"}
				header={`${selectedConnection?.name} Connection`}
				description={
					"You are about to permanently delete this connection.\n" + "This action is irreversible."
				}
			/>
			<ConnectionCreateSelectionTypeModal
				onBeforeClick={createSelectionTypeModalHandlers.close}
				items={typeItems}
				opened={openedCreateSelectionTypeModal}
				onClose={createSelectionTypeModalHandlers.close}
			/>
			<ConnectionCreateSSHModal
				loading={getConnectionQuery.isFetching}
				initialFormValues={
					getConnectionQuery.data?.data && {
						password: getConnectionQuery.data.data.password || "",
						username: getConnectionQuery.data.data.username || "",
						authenticationType:
							getConnectionQuery.data.data.authentication_type === "username_password"
								? CreateConnectionSSHAuthenticationType.USER_PASSWORD
								: CreateConnectionSSHAuthenticationType.PUBLIC_PRIVATE_KEY,
						description: getConnectionQuery.data.data.description || "",
						enablePrivilegedMode: !!getConnectionQuery.data.data.privileged_authentication,
						name: getConnectionQuery.data.data.name,
						passphrase: getConnectionQuery.data.data.passphrase || "",
						privilegedPassword: getConnectionQuery.data.data.privileged_password || "",
						sshKey: getConnectionQuery.data.data.ssh_key || "",
						sshPort: getConnectionQuery.data.data.port || 0,
					}
				}
				id={selectedEditConnectionId}
				onTestConnection={(type) => {
					console.log(`Test connection ${type}`);
				}}
				onSuccess={getConnectionsQuery.refetch}
				onChangeType={() => {
					createSSHModalHandlers.close();
					createSelectionTypeModalHandlers.open();
				}}
				opened={openedCreateSSHModal}
				onClose={() => {
					createSSHModalHandlers.close();
					setSelectedEditConnectionId(undefined);
				}}
			/>
			<ConnectionCreateSNMPModal
				loading={getConnectionQuery.isFetching}
				initialFormValues={
					getConnectionQuery.data?.data && {
						password: getConnectionQuery.data.data.password || "",
						name: getConnectionQuery.data.data.name || "",
						description: getConnectionQuery.data.data.description || "",
						snmpVersion:
							getConnectionQuery.data.data.authentication_type === "snmpv2c"
								? CreateConnectionSNMPVersionType.SNMP_V_2_C
								: CreateConnectionSNMPVersionType.SNMP_V_3,
						authenticationProtocol: getConnectionQuery.data.data
							.authentication_protocol as CreateConnectionSNMPAuthenticationProtocolType,
						community: getConnectionQuery.data.data.community || "",
						privacyProtocol: getConnectionQuery.data.data
							.privacy_protocol as CreateConnectionSNMPPrivacyProtocolType,
						securityLevel: getConnectionQuery.data.data.security_level
							? securityLevelMap[getConnectionQuery.data.data.security_level as string]
							: CreateConnectionSNMPSecurityLdLevelType.NO_SECURITY,
						privacyPassphrase: getConnectionQuery.data.data.privacy_passphrase || "",
						user: getConnectionQuery.data.data.username || "",
						snmpPort: getConnectionQuery.data.data.port || 0,
					}
				}
				id={selectedEditConnectionId}
				onTestConnection={(type) => {
					console.log(`Test connection ${type}`);
				}}
				onSuccess={getConnectionsQuery.refetch}
				onChangeType={() => {
					createSNMPModalHandlers.close();
					createSelectionTypeModalHandlers.open();
				}}
				opened={openedCreateSNMPModal}
				onClose={() => {
					createSNMPModalHandlers.close();
					setSelectedEditConnectionId(undefined);
				}}
			/>
			<ConnectionCreateHTTPModal
				loading={getConnectionQuery.isFetching}
				initialFormValues={
					getConnectionQuery.data?.data && {
						name: getConnectionQuery.data.data.name || "",
						description: getConnectionQuery.data.data.description || "",
						username: getConnectionQuery.data.data.username || "",
						password: getConnectionQuery.data.data.password || "",
						port: getConnectionQuery.data.data.port || 0,
						protocol:
							getConnectionQuery.data.data.authentication_type === "http"
								? CreateConnectionHTTPProtocolType.HTTP
								: CreateConnectionHTTPProtocolType.HTTPS,
						baseUri: getConnectionQuery.data.data.uri_query || "",
						authenticationRequired: !!getConnectionQuery.data.data.authenticate_required,
					}
				}
				id={selectedEditConnectionId}
				onTestConnection={(type) => {
					console.log(`Test connection ${type}`);
				}}
				onSuccess={getConnectionsQuery.refetch}
				onChangeType={() => {
					createHTTPModalHandlers.close();
					createSelectionTypeModalHandlers.open();
				}}
				opened={openedCreateHTTPModal}
				onClose={() => {
					createHTTPModalHandlers.close();
					setSelectedEditConnectionId(undefined);
				}}
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
										<ConnectionListActionButtons
											loading={deleteUsedInConnectionQuery.isFetching}
											type={connectionTypeMap[item.type]}
											id={item.id}
											openHttpModal={createHTTPModalHandlers.open}
											openSnmpModal={createSNMPModalHandlers.open}
											openSshModal={createSSHModalHandlers.open}
											setSelectedConnectionId={setSelectedConnectionId}
											setSelectedEditConnectionId={setSelectedEditConnectionId}
											selectedConnectionId={selectedConnectionId}
										/>
									</Flex>
								</Accordion.Control>
								<Accordion.Panel px={"3xl"} py={"xs"}>
									<Flex direction={"column"} gap={"2xs"} w={"50%"}>
										{Object.entries(omit(item, ["id"])).map(([key, value]) => (
											<ConnectionLabelValue key={key} label={key.toUpperCase()} value={value as string} />
										))}
									</Flex>
								</Accordion.Panel>
							</Accordion.Item>
						))}
						{getConnectionsQuery.isFetching && <ConnectionListSkeleton />}
					</ScrollArea>
				</Accordion>
			</Grid.Col>
		</Grid>
	);
}
