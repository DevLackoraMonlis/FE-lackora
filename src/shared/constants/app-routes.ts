export const AppRoutes = {
	root: "/",
	panel: "/panel",
	login: "/login",
	signout: "/signout",
	updatePassword: "/update-password",
	appStore: "/panel/app-store",
	licenseManagement: "/panel/",
	appDetailPage: (appName: string) => `/panel/app-store/${appName}`,
	appLandingPage: (appName: string) => `/panel/apps/${appName}`,
	appModulePage: (appName: string, appModuleName: string) =>
		`/panel/apps/${appName}/${appModuleName}`,
	appModuleDetailPage: (
		appName: string,
		appModuleName: string,
		id?: string | number,
	) => `/panel/apps/${appName}/${appModuleName}/detail/${id}`,
};
