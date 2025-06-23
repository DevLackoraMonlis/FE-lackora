import { Button, Text } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons-react";

type Props = {
	onGetPlugin: () => void;
};

export default function ICAppManagerDetailsNotInstalledLicense(props: Props) {
	return (
		<Button
			h={40}
			variant="outline"
			leftSection={<IconArrowNarrowRight fontVariant="default" size={24} />}
			onClick={props.onGetPlugin}
		>
			<Text variant="text" fw={600} size="md">
				Get Plugin
			</Text>
		</Button>
	);
}
