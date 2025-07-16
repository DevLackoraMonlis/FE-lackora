import { ActionIcon, Flex, Input, type InputProps } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

type Props = InputProps & {
	onSubmitSearch: (value: string) => void;
};
export default function BCSearchInput({ onSubmitSearch, ...props }: Props) {
	const [value, setValue] = useState("");

	const handleSubmit = () => {
		onSubmitSearch(value);
		setValue("");
	};

	return (
		<Flex gap="xs" align="center">
			<Input
				value={value}
				onChange={(event) => setValue(event.currentTarget.value)}
				miw="250px"
				leftSectionPointerEvents="none"
				leftSection={<IconSearch size={15} />}
				{...props}
				onKeyDown={getHotkeyHandler([["Enter", handleSubmit]])}
				rightSectionPointerEvents="auto"
				rightSection={value ? <Input.ClearButton size="sm" onClick={() => setValue("")} /> : undefined}
			/>
			<ActionIcon size={props.size} onClick={handleSubmit}>
				<IconSearch size={15} />
			</ActionIcon>
		</Flex>
	);
}
