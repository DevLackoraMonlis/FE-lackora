import { ActionIcon, Flex, type MantineSize, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
	onSubmitSearch: (value: string) => void;
	placeholder?: string;
	inputSize?: MantineSize;
	iconSize?: MantineSize;
};

export default function BCSearchInput({ onSubmitSearch, placeholder, inputSize, iconSize }: Props) {
	const [value, setValue] = useState("");

	const handleSubmit = () => {
		onSubmitSearch(value);
		setValue("");
	};

	return (
		<Flex gap="xs" align="center">
			<TextInput
				value={value}
				placeholder={placeholder}
				size={inputSize}
				onChange={(event) => setValue(event.currentTarget.value)}
				miw="250px"
				leftSectionPointerEvents="none"
				leftSection={<IconSearch size={15} />}
				onKeyDown={getHotkeyHandler([["Enter", handleSubmit]])}
				rightSectionPointerEvents="auto"
				rightSection={value ? <IconX size={15} onClick={() => setValue("")} /> : undefined}
			/>
			<ActionIcon size={iconSize || "input-sm"} onClick={handleSubmit}>
				<IconSearch size={20} />
			</ActionIcon>
		</Flex>
	);
}
