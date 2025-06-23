import { Flex, Text } from "@mantine/core";

export default function ICAppManagerHeader() {
	return (
		<Flex direction="column">
			<Text fw={700} fz={22} c="#121721">
				Plugin Management
			</Text>
			<Text fw={400} fz={12} c="#41454D">
				Plugins are modular software components that add specific features or
				functionalities to your main application. Through Plugin Management, you
				can easily install, update, or configure these extensions to tailor the
				system to your needs.
			</Text>
		</Flex>
	);
}
