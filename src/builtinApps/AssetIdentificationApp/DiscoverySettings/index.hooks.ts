import { filter, groupBy } from "lodash";

import {
	useCreateDiscoverySettingConfiguration,
	useDeleteDiscoverySettingConfiguration,
	useEditDiscoverySettingConfiguration,
	useGetDiscoverySettingConfigurations,
	useGetDiscoverySettings,
} from "@/http/generated/asset-identification-discovery-settings";

import { configsTransformRs, fieldsTransformRs } from "@/shared/components/baseComponents/BCDynamicField";

import type { DiscoveryAdapterFilters } from "./index.types";

export function useDiscoveryAdapters({ type, ...clientSideParams }: DiscoveryAdapterFilters) {
	const discoveryAdaptersUQ = useGetDiscoverySettings(
		{ page: 1, limit: 99 },
		{
			query: {
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
				const results = res?.data?.results?.map(({ id, is_active, config, editable }) => ({
					id,
					editable: !editable,
					isActive: !!is_active,
					configs: configsTransformRs(config),
				}));
				return { ...res?.data, results };
			},
		},
	});
	return { discoverySettingConfigurations };
}

export function useDeleteDiscoverySetting() {
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
