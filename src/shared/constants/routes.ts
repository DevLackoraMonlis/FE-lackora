export const AppRoutes = {
	root: "/",
	panel: "/panel",
	login: "/login",
	signout: "/signout",
	updatePassword: "/update-password",
	licenseManagement: "/panel/",
	appDetailPage: (appName: string) => `/panel/app-store/${appName}`,
	appLandingPage: (appName: string) => `/panel/apps/${appName}`,
	appModulePage: (appName: string, appModuleName: string) => `/panel/apps/${appName}/${appModuleName}`,
	appModuleDetailPage: (appName: string, appModuleName: string, id?: string | number) =>
		`/panel/apps/${appName}/${appModuleName}/detail/${id}`,
};

export const AllApplications = {
	ADAPTER_MANAGEMENT: {
		name: "adapter_management",
	},
	INVENTORY_MANAGEMENT: {
		name: "inventory_management",
		modules: {
			GENERAL_INFORMATION: "General Information",
			OPERATING_SYSTEM: "Operating system",
			USERS_AND_GROUPS: "Users & Groups",
			PERSISTENCE: "Persistence",
			LIVE_SNAPSHOT: "Live Snapshot",
			SOFTWARE: "Software",
			HARDWARE: "Hardware",
			NETWORK: "Network",
		},
	},
	CYBER_ASSETS: {
		name: "cyber_asset_management",
		modules: {
			CYBER_ASSETS: "Cyber Assets",
		},
	},
	MONO_MARKET: {
		name: "marketplace",
	},
	ASSET_IDENTIFICATION: {
		name: "asset_identification",
		modules: {
			WORKFLOW: "Workflow", // "Cyber Assets Identification Workflow",
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
