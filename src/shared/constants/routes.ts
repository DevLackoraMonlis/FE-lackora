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
