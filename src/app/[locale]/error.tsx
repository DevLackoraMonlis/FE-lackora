"use client";

import { Box, Button, Flex, Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useEffect } from "react";
import { UAParser } from "ua-parser-js";
import { clientLogger } from "../lib/logger/clientLogger";

export default function ErrorComponent({
	error,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const ua = UAParser();
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<Flex
			direction="column"
			justify="center"
			align="center"
			gap={20}
			w={"100%"}
			h={"90%"}
		>
			<Box c="yellow.3">
				<IconAlertTriangle size={100} />
			</Box>
			<Text fw="bolder" fz={22}>
				Something went wrong
			</Text>
			<Text c={"gray.4"}>
				There was a problem processing the request. Please Wait a few moments,
				then try again or return to last page.
			</Text>
			<Button
				variant="filled"
				onClick={() => {
					window.location.reload();
					return clientLogger.error(error.message, { ...error, ...ua });
				}}
			>
				Return to last page
			</Button>
		</Flex>
	);
}
