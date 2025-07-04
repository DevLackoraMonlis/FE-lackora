import { Flex } from "@mantine/core";
import type { PropsWithChildren } from "react";
import classes from "./index.module.css";

export default function ConnectionIconWrapper(props: PropsWithChildren) {
	return (
		<Flex justify={"center"} align={"center"} className={classes.root}>
			{props.children}
		</Flex>
	);
}
