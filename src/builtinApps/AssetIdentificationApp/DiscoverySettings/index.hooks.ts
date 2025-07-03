import { filter, groupBy } from "lodash";

import {
	useCreateDiscoverySettingConfiguration,
	useDeleteDiscoverySettingConfiguration,
	useEditDiscoverySettingConfiguration,
	useGetDiscoverySettingConfigurations,
	useGetDiscoverySettings,
} from "@/http/generated/asset-identification-discovery-settings";
import { getObjectRelatedRecords } from "@/http/generated/object-management";

import type {
	DiscoveryAdapterConfiguration,
	DiscoveryAdapterFilters,
	DiscoveryAdaptersField,
} from "./index.types";

export function useDiscoveryAdapters({ type, ...clientSideParams }: DiscoveryAdapterFilters) {
	const discoveryAdaptersUQ = useGetDiscoverySettings(
		{ page: 1, limit: 99 },
		{
			query: {
				select: (res) => {
					const results = res?.data?.results?.map(({ name, fields, is_used, ...item }) => ({
						...item,
						is_used: !!is_used,
						fields: fields.map(({ object_type, ...item }) => ({
							...item,
							api: getObjectRelatedRecords,
							objectType: object_type,
						})) as unknown as DiscoveryAdaptersField[],
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
	results = filter(results, ({ display_name }) => !search || display_name?.includes(search));
	results = filter(results, ({ is_used }) => type === "none-credential" || is_used === !!used);
	filters?.forEach(({ param }) => {
		const filtered = clientSideParams[param];
		results = filter(
			results,
			(item) =>
				!filtered || (Array.isArray(filtered) && filtered?.includes(`${item[param as keyof typeof item]}`)),
		);
	});
	// update result
	const discoveryAdapters = { ...discoveryAdaptersUQ, data: { ...data, results } };
	return { discoveryAdapters };
}

export function useDiscoveryAdapterById(adapterId: string, enabled: boolean) {
	const discoverySettingConfigurations = useGetDiscoverySettingConfigurations(adapterId, {
		query: {
			enabled: !!adapterId && enabled,
			select: (res) => {
				const results = res?.data?.results?.map(({ id, is_active, config, creator }) => ({
					id,
					configs: config as unknown as DiscoveryAdapterConfiguration[],
					isActive: !!is_active,
					editable: creator !== "SYSTEM",
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
