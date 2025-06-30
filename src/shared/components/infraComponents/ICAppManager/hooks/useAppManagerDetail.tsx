import { useQuery } from "@tanstack/react-query";
import type {
	ICAppManagerDetailsProps,
	ICAppManagerHistoryRq,
	ICAppManagerProps,
	PaginationRq,
} from "../index.types";

export const useGetPluginDetails = (params: {
	getPluginDetails: ICAppManagerProps["getAppApi"];
	name?: string;
}) => {
	const {
		data: pluginDetails,
		isFetching: pluginDetailsLoading,
		refetch: pluginDetailsRefetch,
	} = useQuery({
		queryKey: ["get-plugin-details", params?.name],
		queryFn: ({ signal }) => params.getPluginDetails({ name: params.name || "" }, { signal }),
		select: (res) => res.data,
		refetchOnMount: true,
	});

	return {
		pluginDetails,
		pluginDetailsLoading,
		pluginDetailsRefetch,
	};
};

export const useGetPluginHistory = (params: {
	getPluginHistory: ICAppManagerDetailsProps["getAppHistory"];
	payload: ICAppManagerHistoryRq;
}) => {
	const {
		data: pluginHistory,
		isFetching: pluginHistoryLoading,
		refetch: pluginHistoryRefetch,
	} = useQuery({
		queryKey: ["get-plugin-history", params?.payload?.name, params?.payload?.pagination],
		queryFn: () =>
			params.getPluginHistory({
				name: params?.payload?.name,
				pagination: params?.payload?.pagination as PaginationRq,
			}),
		enabled: !!params.payload?.name,
		refetchOnMount: true,
	});

	return {
		pluginHistory,
		pluginHistoryLoading,
		pluginHistoryRefetch,
	};
};
