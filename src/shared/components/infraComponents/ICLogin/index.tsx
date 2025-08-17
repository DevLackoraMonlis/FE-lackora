"use client";

import ICLoginForm from "@/shared/components/infraComponents/ICLogin/components/ICLoginForm";
import GlobalSettingContext from "@/shared/contexts/globalSettingContext";
import { Box, Grid } from "@mantine/core";
import { useContext } from "react";
import BG_Green from "../../../../../public/images/login/login-bg-green-min.png";
import BG_Pink from "../../../../../public/images/login/login-bg-pink-min.png";
import classes from "./index.module.css";

export default function ICLogin() {
	const globalTheme = useContext(GlobalSettingContext);
	return (
		<Box h={"100%"} w={"100%"}>
			<Grid
				gutter={0}
				classNames={{
					inner: classes.gridInner,
				}}
				style={{
					backgroundImage: `url(${globalTheme.theme === "green" ? BG_Green.src : BG_Pink.src})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "90% 10%",
				}}
				h={"100%"}
			>
				<Grid.Col span={{ "2xs": 0, sm: 4, lg: 6 }} />
				<Grid.Col span={{ "2xs": 12, sm: 8, lg: 4 }}>
					<ICLoginForm />
				</Grid.Col>
			</Grid>
		</Box>
	);
}
