import { Button, Flex, Text } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import classes from "./index.module.css";

type Props = {
	onGetPlugin: () => void;
};

export default function ICAppManagerDetailsExpiredCommercial(props: Props) {
	return (
		<Flex gap={15}>
			<Flex h={42} bg="#E02D3C" justify="center" align="center" className={classes.expiredBtn} px={16} py={8}>
				<Text fw={400} size="md" c="#FAFAFA">
					Expired
				</Text>
			</Flex>
			<Button
				size="md"
				variant="outline"
				leftSection={<IconArrowNarrowRight fontVariant="default" size={24} />}
				onClick={props.onGetPlugin}
			>
				<Text variant="text" fw={600} size="md" className={classes.btnText}>
					Get Plugin
				</Text>
			</Button>
		</Flex>
	);
}
