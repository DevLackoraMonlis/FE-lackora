import { useGetDiscoverySettingLastRun } from "@/http/generated/asset-identification-discovery-settings";
import { useGetWorkflows } from "@/http/generated/work-flow";

import { allMockData } from "./data";

export function useWorkflow() {
	const workflows = useGetWorkflows({
		query: {
			refetchOnMount: true,
			staleTime: 0,
			gcTime: 0,
		},
	});
	return { ...workflows, data: allMockData?.completed };
}

export function useWorkflowScanHistory(enabled: boolean, _queryParams: Record<string, unknown>) {
	const detectedAssets = useGetDiscoverySettingLastRun("adapterId", "lastExecutionId", {
		query: {
			refetchOnMount: true,
			staleTime: 0,
			gcTime: 0,
			enabled: enabled,
			select: (res) => {
				const results =
					res?.data?.results?.map((item = {}) => {
						const record = item as Record<string, string>;
						return {
							key: record.ip,
							scanId: record.ip,
							status: "complete",
						};
					}) || [];
				return { ...res.data, results };
			},
		},
	});
	return { detectedAssets };
}

export function useWorkflowDetectedAssets(enabled: boolean, _queryParams: Record<string, unknown>) {
	const detectedAssets = useGetDiscoverySettingLastRun("adapterId", "lastExecutionId", {
		query: {
			refetchOnMount: true,
			staleTime: 0,
			gcTime: 0,
			enabled: enabled,
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
