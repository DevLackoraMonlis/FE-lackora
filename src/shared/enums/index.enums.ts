export const AllApplications = {
	ADAPTER_MANAGEMENT: {
		name: "adapter_management",
	},
	MONO_MARKET: {
		name: "marketplace",
	},
	ASSET_IDENTIFICATION: {
		name: "asset_identification",
		modules: {
			DISCOVERY_SETTINGS: "Discovery Settings",
			PROFILING_SETTINGS: "Profiling Settings",
		},
	},
	OBJECTS: {
		name: "object_management",
		modules: {
			CONNECTIONS: "Connections",
		},
	},
} as const;
