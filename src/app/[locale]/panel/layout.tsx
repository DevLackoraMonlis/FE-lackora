import PanelLayout from "@/app/[locale]/panel/layout.component";
import { GlobalService } from "@/http/end-points/GlobalService";
import type { ActiveApplicationsResponse } from "@/http/generated/models";
import type { SessionUserType } from "@/http/httpService";
import { AppRoutes } from "@/shared/constants/routes";
import { sessionOptions } from "@/shared/lib/sessionOptions";
import { ActiveAppsProvider } from "@/shared/providers/ActiveAppsProvider";
import type { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

export default async function Layout(props: PropsWithChildren) {
	const session = await getServerSession(sessionOptions);
	const sessionUser = session?.user as SessionUserType;

	let accessToken = sessionUser?.data?.access_token;
	const refreshToken = sessionUser?.data?.refresh_token;

	if (!accessToken || !refreshToken) {
		redirect(AppRoutes.signout);
	}

	let xNonce: string | undefined;
	let activeApps: ActiveApplicationsResponse | undefined;

	try {
		console.info("trying to get new x-nonce ...");
		// const xNonceRes = await getHttpRequestXNonce({
		// 	baseUrl: process.env.BASE_URL,
		// 	method: "GET",
		// 	route: "/api/application-management/active-applications",
		// });
		xNonce = "xNonceRes.data.nonce";
		console.info("get new x-nonce successfully");
		console.info("trying to get active-apps ...");
		const activeAppsRes = await GlobalService.getActiveApplications(
			process.env.BASE_URL,
			accessToken,
			xNonce,
		);
		console.info("get active-apps successfully");
		activeApps = activeAppsRes.data;
	} catch (err) {
		const error = err as AxiosError;
		if (error.response?.status === 401) {
			try {
				console.info("trying to get new new access token based on last refresh token ...");
				const newTokenRes = await GlobalService.getRefreshToken(refreshToken, process.env.BASE_URL || "");
				accessToken = newTokenRes.data.access_token;

				console.info("trying to get new x-nonce with new token ...");
				// const xNonceRes = await getHttpRequestXNonce({
				// 	baseUrl: process.env.BASE_URL,
				// 	method: "GET",
				// 	route: "/api/application-management/active-applications",
				// });
				xNonce = "xNonceRes.data.nonce";
				console.info("get new x-nonce with new token successfully");
				console.info("trying to get new active-apps with new token ...");
				const activeAppsRes = await GlobalService.getActiveApplications(
					process.env.BASE_URL,
					accessToken,
					xNonce,
				);
				activeApps = activeAppsRes.data;
				console.info("get active-apps with new token successfully");
			} catch {
				redirect(AppRoutes.signout);
			}
		} else {
			console.error("Unhandled server error while getting active apps:", error);
			redirect(AppRoutes.signout);
		}
	}

	return (
		<ActiveAppsProvider apps={activeApps?.applications || []}>
			<PanelLayout sessionUser={sessionUser} status={sessionUser ? "authenticated" : "unauthenticated"}>
				{props.children}
			</PanelLayout>
		</ActiveAppsProvider>
	);
}
