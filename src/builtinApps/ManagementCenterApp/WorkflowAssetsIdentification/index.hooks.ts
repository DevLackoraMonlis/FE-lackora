import { useGetDiscoverySettingLastRun } from "@/http/generated/asset-identification-discovery-settings";

export function useWorkflowDetectedAssets(enabled: boolean, adapterId: string, lastExecutionId: string) {
	const detectedAssets = useGetDiscoverySettingLastRun(adapterId, lastExecutionId, {
		query: {
			refetchOnMount: true,
			staleTime: 0,
			gcTime: 0,
			enabled: enabled && !!(adapterId && lastExecutionId),
			select: (res) => {
				const results =
					res?.data?.results?.map((item = {}) => {
						const record = item as Record<string, string>;
						return {
							key: `${record.ip}-${record.mac}-${record.created_time}`,
							ipAddress: record.ip,
							macAddress: record.mac,
							discoveryTime: record.created_time,
							gateway: record.gateway,
						};
					}) || [];
				return { ...res.data, results };
			},
		},
	});

	return { detectedAssets };
}
