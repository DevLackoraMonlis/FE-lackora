import PanelLayout from "@/app/[locale]/panel/layout.component";
import type { SessionUserType } from "@/http/httpService";
import { sessionOptions } from "@/shared/lib/sessionOptions";
import { getServerSession } from "next-auth";
import type { PropsWithChildren } from "react";

export default async function Layout(props: PropsWithChildren) {
	const session = await getServerSession(sessionOptions);
	const sessionUser = session?.user as SessionUserType;

	return (
		<PanelLayout
			sessionUser={sessionUser}
			status={sessionUser ? "authenticated" : "unauthenticated"}
		>
			{props.children}
		</PanelLayout>
	);
}
