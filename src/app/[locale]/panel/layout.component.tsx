"use client";

import type { SessionUserType } from "@/http/httpService";
import ICPanelHeader from "@/shared/components/infraComponents/ICPanelHeader";
import ICPanelSidebar from "@/shared/components/infraComponents/ICPanelSidebar";
import { AppRoutes } from "@/shared/constants/app-routes";
import { Box, Flex, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBell, IconBox } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { type PropsWithChildren, useEffect } from "react";
import classes from "./layout.module.css";

export default function PanelLayout(
	props: PropsWithChildren<{
		sessionUser: SessionUserType;
		status: "authenticated" | "loading" | "unauthenticated";
	}>,
) {
	const { black, white } = useMantineTheme();
	const [opened, handlers] = useDisclosure(false);

	useEffect(() => {
		if (props.status === "unauthenticated") {
			redirect(AppRoutes.login);
		}
	}, [props.status]);

	return (
		<Box h="100%">
			<header>
				<ICPanelHeader
					showChangeThemeButton={false}
					style={{
						width: 1440,
						height: 48,
						borderBottomWidth: "0.5px",
						justifyContent: "space-between",
						paddingTop: "4px",
						paddingRight: "14px",
						paddingBottom: "4px",
						paddingLeft: "14px",
						backgroundColor: "#1e2e4f",
					}}
					applicationLogo={<IconBox color={white} />}
					onLogout={() =>
						signOut({ redirect: true, callbackUrl: AppRoutes.login })
					}
					sessionUser={props.sessionUser}
					notification={<IconBell color={white} />}
				/>
			</header>
			<Flex className={classes.layoutBody}>
				<ICPanelSidebar opened={opened} onToggle={handlers.toggle} />
				<Box w="100%" h="100%" className={classes.layoutBodyContainer}>
					{props.children}
				</Box>
			</Flex>
		</Box>
	);
}
