"use client";

import ICLoginForm from "@/shared/components/infraComponents/ICLogin/components/ICLoginForm";
import ICLoginSlogan from "@/shared/components/infraComponents/ICLogin/components/ICLoginSlogan";
import { Box, Grid } from "@mantine/core";
import BG from "../../../../../public/images/login/login-background.png";
import classes from "./index.module.css";
export default function ICLogin() {
	return (
		<Box h={"100%"} w={"100%"}>
			<Grid
				gutter={0}
				classNames={{
					inner: classes.gridInner,
				}}
				style={{
					backgroundImage: `url(${BG.src})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "70% 30%",
				}}
				h={"100%"}
			>
				<Grid.Col span={4}>
					<ICLoginForm />
				</Grid.Col>
				<Grid.Col span={8}>
					<ICLoginSlogan />
				</Grid.Col>
			</Grid>
		</Box>
	);
}
