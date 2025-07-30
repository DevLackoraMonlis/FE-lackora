import { ActionIcon, Flex, type MantineSize, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

type Props = {
	onSubmitSearch: (value: string) => void;
	clientSide?: boolean;
	placeholder?: string;
	inputWidth?: string;
	inputSize?: MantineSize;
	iconSize?: MantineSize;
};

export default function BCSearchInput({
	onSubmitSearch,
	clientSide = false,
	inputWidth = "240px",
	placeholder = "",
	inputSize,
	iconSize,
}: Props) {
	const [value, setValue] = useState("");
	const handleSubmit = () => {
		onSubmitSearch?.(value);
	};

	useEffect(() => {
		if (clientSide || !value) {
			handleSubmit();
		}
	}, [value]);

	return (
		<Flex gap="xs" align="center">
			<TextInput
				value={value}
				placeholder={placeholder}
				size={inputSize}
				onChange={(event) => setValue(event.currentTarget.value)}
				w={inputWidth}
				leftSectionPointerEvents="none"
				leftSection={<IconSearch size={15} />}
				onKeyDown={getHotkeyHandler([["Enter", handleSubmit]])}
				rightSectionPointerEvents="auto"
				rightSection={
					value ? <IconX size={15} onClick={() => setValue("")} className="cursor-pointer" /> : undefined
				}
			/>
			{!clientSide && (
				<ActionIcon size={iconSize || "input-sm"} onClick={handleSubmit}>
					<IconSearch size={20} />
				</ActionIcon>
			)}
		</Flex>
	);
}
