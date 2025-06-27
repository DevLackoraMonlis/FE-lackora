"use client";
import { AppRoutes } from "@/shared/constants/app-routes";
import { Flex, Loader } from "@mantine/core";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SignOut() {
	useEffect(() => {
		void signOut({ callbackUrl: AppRoutes.login, redirect: true });
	}, []);
	return (
		<Flex w={"100%"} h={"100%"} align={"center"} justify={"center"}>
			<Loader />
		</Flex>
	);
}
