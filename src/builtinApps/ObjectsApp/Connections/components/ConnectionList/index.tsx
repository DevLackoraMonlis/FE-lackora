import ConnectionEmpty from "@/builtinApps/ObjectsApp/Connections/components/ConnectionEmpty";
import { GET_OBJECTS_CONNECTIONS_QUERY_KEY } from "@/builtinApps/ObjectsApp/Connections/components/index.constants";
import { useGetConnections } from "@/http/generated/management-center-connections";
import { useDisclosure } from "@mantine/hooks";

export default function ConnectionList() {
	const [_openedCreateModal, createModalHandlers] = useDisclosure(false);

	const getConnectionsQuery = useGetConnections(undefined, {
		query: {
			queryKey: [GET_OBJECTS_CONNECTIONS_QUERY_KEY],
		},
	});

	if (!getConnectionsQuery.data?.data.results.length && getConnectionsQuery.isFetched) {
		return <ConnectionEmpty onCreate={createModalHandlers.open} />;
	}

	return <div>Connection List</div>;
}
