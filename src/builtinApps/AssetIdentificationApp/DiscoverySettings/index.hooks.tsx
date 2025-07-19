import { Badge } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { filter, groupBy, isObject } from "lodash";

import {
	discoverySettingConfigurationTestConnection,
	useCreateDiscoverySettingConfiguration,
	useDeleteDiscoverySettingConfiguration,
	useDiscoverySettingRunNow,
	useEditDiscoverySettingConfiguration,
	useGetDiscoverySettingConfigurations,
	useGetDiscoverySettings,
} from "@/http/generated/asset-identification-discovery-settings";

import type { CustomError, CustomSuccess } from "@/http/end-points/GeneralService.types";
import { configsTransformRs, fieldsTransformRs } from "@/shared/components/baseComponents/BCDynamicField";
import { getErrorMessage, getSuccessMessage } from "@/shared/lib/utils";

import { GET_DISCOVERY_SETTINGS_QUERY_KEY } from "./index.constants";
import type { DiscoveryAdapterFilters } from "./index.types";

export function useDiscoveryAdapters({ type, ...clientSideParams }: DiscoveryAdapterFilters) {
	const discoveryAdaptersUQ = useGetDiscoverySettings(
		{ page: 1, limit: 99 },
		{
			query: {
				queryKey: [GET_DISCOVERY_SETTINGS_QUERY_KEY],
				select: (res) => {
					const results = res?.data?.results?.map(({ name, fields, is_used, ...item }) => ({
						...item,
						is_used: !!is_used,
						fields: fieldsTransformRs(fields),
					}));
					return { ...res?.data, results };
				},
			},
		},
	);
	// client side filtering
	const data = discoveryAdaptersUQ?.data;
	const filters = discoveryAdaptersUQ?.data?.metadata?.filters;
	const groupByType = groupBy(data?.results, "type");
	let results = groupByType[type];
	const { search, used } = clientSideParams;
	if (search) {
		results = filter(results, ({ display_name }) =>
			display_name?.toLowerCase()?.includes(search.toLowerCase()),
		);
	}

	results = filter(results, ({ is_used }) => type === "none-credential" || is_used === !!used);
	filters?.forEach(({ param }) => {
		const filtered = clientSideParams[param] as unknown[];
		if (filtered?.length) {
			results = filter(
				results,
				(item) =>
					!filtered || (Array.isArray(filtered) && filtered?.includes(`${item[param as keyof typeof item]}`)),
			);
		}
	});
	// update result
	const discoveryAdapters = { ...discoveryAdaptersUQ, data: { ...data, results } };
	return { discoveryAdapters };
}

export function useDiscoveryAdapterById(adapterId: string, enabled: boolean) {
	const discoverySettingConfigurations = useGetDiscoverySettingConfigurations(adapterId, {
		query: {
			enabled: !!adapterId && enabled,
			refetchOnMount: false,
			select: (res) => {
				const results = res?.data?.results?.map(({ id, is_active, config, editable, adapter_id }) => {
					const updateConfigValues = config.map(({ value, ...item }) => ({
						...item,
						value:
							typeof value === "number"
								? `${value}`
								: isObject(value)
									? {
											label: value.label,
											value: typeof value.value === "number" ? `${value}` : value.value,
										}
									: value,
					}));
					return {
						id,
						adapterId: adapter_id,
						editable: editable !== false,
						isActive: !!is_active,
						configs: configsTransformRs(updateConfigValues),
					};
				});
				return { ...res?.data, results };
			},
		},
	});
	return { discoverySettingConfigurations };
}

export function useDeleteDiscoverySetting() {
	const deleteDiscoverySetting = useDeleteDiscoverySettingConfiguration({
		mutation: {
			onSuccess() {
				notifications.show({
					title: "Gateway deleted successfully",
					message:
						"Some assets associated with the deleted gateway may become Unreachable or Unmanageable in future discovery scans.",
					color: "green",
					withBorder: true,
					icon: (
						<Badge variant="light" circle c="white" bg="green" size="30px">
							<IconCheck />
						</Badge>
					),
				});
			},
		},
	});
	return { deleteDiscoverySetting };
}

export function useDeleteNoneCredential() {
	const deleteDiscoverySetting = useDeleteDiscoverySettingConfiguration();
	return { deleteDiscoverySetting };
}

export function useEditDiscoverySetting() {
	const editDiscoverySetting = useEditDiscoverySettingConfiguration();
	return { editDiscoverySetting };
}

export function useCreateDiscoverySetting() {
	const createDiscoverySetting = useCreateDiscoverySettingConfiguration();
	return { createDiscoverySetting };
}

export function useTestDiscoverySettingConnection() {
	const [testLoading, toggleTestLoading] = useToggle([false, true]);

	function testDiscoverySettingConnection(adapterId: string, configuration_id: string) {
		toggleTestLoading(true);
		discoverySettingConfigurationTestConnection(adapterId, { configuration_id })
			.then((response) => {
				toggleTestLoading(false);
				notifications.show({
					message: getSuccessMessage(response as CustomSuccess),
					color: response?.data?.status ? "green" : "red",
					withBorder: true,
				});
			})
			.catch((error) => {
				toggleTestLoading(false);
				notifications.show({
					title: "Failed",
					message: getErrorMessage(error as CustomError),
					color: "red",
					withBorder: true,
				});
			});
	}

	return { testDiscoverySettingConnection, testLoading };
}

export function useDiscoverySettingQuickDiscovery(
	enabled: boolean,
	adapterId: string,
	configuration_id: string,
) {
	const discoverySettingRunNow = useDiscoverySettingRunNow(
		adapterId,
		{ configuration_id },
		{
			query: {
				refetchOnMount: true,
				staleTime: 0,
				gcTime: 0,
				enabled: enabled && !!(adapterId && configuration_id),
				select: (res) => {
					const results =
						res?.data?.results?.map((item) => {
							const record = item as Record<string, string>;
							return {
								key: `${record?.ip}-${record?.mac}-${record?.created_time}`,
								ipAddress: record?.ip,
								macAddress: record?.mac,
								discoveryTime: record?.created_time,
							};
						}) || [];
					return { ...res.data, results };
				},
			},
		},
	);

	return { discoverySettingRunNow };
}
