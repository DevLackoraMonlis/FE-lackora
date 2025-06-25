import PanelLayout from "@/app/[locale]/panel/layout.component";
import { getHttpRequestXNonce } from "@/app/actions/get-http-request-x-nonce";
import { GlobalService } from "@/http/end-points/GlobalService";
import type { ActiveApplicationsResponse } from "@/http/generated/models";
import type { SessionUserType } from "@/http/httpService";
import { sessionOptions } from "@/shared/lib/sessionOptions";
import { ActiveAppsProvider } from "@/shared/providers/ActiveAppsProvider";
import { getServerSession } from "next-auth";
import type { PropsWithChildren } from "react";

export default async function Layout(props: PropsWithChildren) {
	const session = await getServerSession(sessionOptions);
	const sessionUser = session?.user as SessionUserType;
	let activeApps: ActiveApplicationsResponse | undefined;
	let xNonce: string | undefined;

	try {
		const getXNonce = await getHttpRequestXNonce({
			baseUrl: process.env.BASE_URL,
			method: "GET",
			route: "/api/application-management/active-applications",
			accessToken: sessionUser?.data?.access_token,
		});
		xNonce = getXNonce.data;
	} catch (err) {
		console.log("Error while Getting getXNonce at server", err);
	}

	try {
		const getUserActiveApps = await GlobalService.getActiveApplications(
			process.env.BASE_URL,
			sessionUser?.data?.access_token,
			xNonce,
		);
		activeApps = getUserActiveApps.data;
	} catch (err) {
		console.log("Error in Getting getUserActiveApps at server", err);
	}

	return (
		<ActiveAppsProvider apps={activeApps?.applications || []}>
			<PanelLayout
				sessionUser={sessionUser}
				status={sessionUser ? "authenticated" : "unauthenticated"}
			>
				{props.children}
			</PanelLayout>
		</ActiveAppsProvider>
	);
}
