import { ActionIcon, Flex, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconScaleOutline } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
	search: string;
	setSearch: (search: string) => void;
};

export default function ICAppManagerFilterSearchBox(props: Props) {
	const [search, setSearch] = useState<string>(props.search);

	return (
		<Flex gap={4} align="center">
			<TextInput
				value={search}
				onKeyDown={getHotkeyHandler([["Enter", () => props.setSearch(search)]])}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search"
				w={258}
			/>
			<ActionIcon color="primary" onClick={() => props.setSearch(search)}>
				<IconScaleOutline />
			</ActionIcon>
		</Flex>
	);
}
