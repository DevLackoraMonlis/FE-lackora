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
	MANAGEMENT_CENTER: {
		name: "management_center",
		modules: {
			WORKFLOW: "Cyber Assets Identification Workflow",
		},
	},
} as const;
