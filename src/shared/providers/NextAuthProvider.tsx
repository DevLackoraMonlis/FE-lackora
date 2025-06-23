"use client";

import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";

export default function NextAuthSessionProvider(props: PropsWithChildren) {
	return <SessionProvider>{props.children}</SessionProvider>;
}
