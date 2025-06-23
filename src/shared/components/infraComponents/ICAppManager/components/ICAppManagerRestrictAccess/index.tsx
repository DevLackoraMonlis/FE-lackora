import { Button, Flex, Text } from "@mantine/core";
import { IconAccessibleOff, IconArrowNarrowRight } from "@tabler/icons-react";
import type { ICAppManagerRestrictProps } from "../../index.types";
import classes from "./index.module.css";

export default function ICAppManagerRestrictAccess(
	props: ICAppManagerRestrictProps,
) {
	return (
		<Flex w="100%" align="center" justify="center">
			<Flex w={733} direction="column" gap={15} align="center" justify="center">
				<IconAccessibleOff />
				<Text className={classes.title} fw={800}>
					Access Denied!
				</Text>
				<Text fw={300} size="md" className={classes.description}>
					It appears that you don’t have permission to view this page. If you
					believe this is an error, please reach out to our support team or
					click the link below to go back to the plugin list.
				</Text>
				<Button
					onClick={props.onRedirectToAppStorePage}
					// className={classes.pluginBtn}
					w={332}
					size="md"
					rightSection={<IconArrowNarrowRight size={24} />}
				>
					<Text fw={700} size="md">
						Return to the Plugin List
					</Text>
				</Button>
			</Flex>
		</Flex>
	);
}
