import {
	useGetWorkflowHistory,
	useGetWorkflowHistoryDetail,
	useGetWorkflowStep,
	useGetWorkflows,
} from "@/http/generated/workflow-management";

export function useWorkflow(refetchInterval: false | number = false) {
	const workflows = useGetWorkflows({
		query: {
			refetchOnMount: true,
			staleTime: 0,
			gcTime: 0,
			refetchInterval,
			select: (res) => res.data,
		},
	});
	return { workflows, isLoading: workflows?.isLoading };
}

export function useWorkflowScanHistory(queryParams: Record<string, unknown>) {
	const scanHistoryList = useGetWorkflowHistory(queryParams, {
		query: {
			select: (res) => {
				const results =
					res?.data?.results?.map((record) => {
						return {
							id: record.id || "",
							scanId: record.scan_id || "",
							status: record.status,
						};
					}) || [];
				return { ...res.data, results };
			},
		},
	});
	return { scanHistoryList };
}

export function useWorkflowHistoryDetail(stepId: string, _queryParams: Record<string, unknown>) {
	const historyDetail = useGetWorkflowHistoryDetail(stepId, {
		query: {
			enabled: !!stepId,
			select: (res) => {
				const results =
					res?.data?.results?.map((record) => {
						return {
							key: `${record.ip}-${record.mac}-${record.gateway_name}`,
							ipAddress: record.ip,
							macAddress: record.mac,
							discoveryTime: record.discovery_time,
							gateway: record.gateway_name,
						};
					}) || [];
				return { ...res.data, results };
			},
		},
	});
	return { historyDetail };
}

export function useWorkflowStep(stepId: string) {
	const stepDetails = useGetWorkflowStep(stepId, {
		query: {
			enabled: !!stepId,
			select: (res) => {
				const results =
					res?.data?.results?.map((record) => {
						return {
							key: `${record.ip}-${record.mac}-${record.gateway_name}`,
							ipAddress: record.ip as string,
							macAddress: record.mac as string,
							discoveryTime: record.discovery_time as string,
							gateway: record.gateway_name as string,
						};
					}) || [];
				return { ...res.data, results };
			},
		},
	});
	return { stepDetails };
}
