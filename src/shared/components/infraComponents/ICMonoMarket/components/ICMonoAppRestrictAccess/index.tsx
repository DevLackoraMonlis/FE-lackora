"use client";
import { Button, Flex, Text } from "@mantine/core";
import { IconAccessibleOff, IconArrowNarrowRight } from "@tabler/icons-react";

type Props = {
	onRedirectToMonoMarketPage: VoidFunction;
};

export default function ICMonoAppRestrictAccess(props: Props) {
	return (
		<Flex w="100%" align="center" justify="center">
			<Flex w={733} h={800} direction="column" gap={15} align="center" justify="center">
				<IconAccessibleOff width={200} height={200} />
				<Text fz={"2xl"} fw={800}>
					Access Denied!
				</Text>
				<Text fw={300} size="md" fz={"md"}>
					It appears that you don’t have permission to view this page. If you believe this is an error, please
					reach out to our support team or click the link below to go back to the plugin list.
				</Text>
				<Button
					onClick={props.onRedirectToMonoMarketPage}
					color={"main"}
					w={332}
					size="md"
					rightSection={<IconArrowNarrowRight size={24} />}
				>
					<Text fw={700} size="md">
						Return to the Mono Market
					</Text>
				</Button>
			</Flex>
		</Flex>
	);
}
