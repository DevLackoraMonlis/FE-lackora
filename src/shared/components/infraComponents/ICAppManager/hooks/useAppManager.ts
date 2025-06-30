import { useQuery } from "@tanstack/react-query";
import type { ICAppManagerProps, ICAppManagerRq } from "../index.types";

export const useAppManager = (params: {
	payload: ICAppManagerRq;
	getAppsApi: ICAppManagerProps["getAppsApi"];
}) => {
	const { data, isLoading, refetch, isFetching } = useQuery({
		queryKey: ["get-list-all-apps", params.payload],
		queryFn: ({ signal }) => params.getAppsApi(params.payload, { signal }),
		refetchOnMount: true,
		refetchInterval: 5 * 1000,
	});

	return { data, isLoading, refetch, isFetching };
};
