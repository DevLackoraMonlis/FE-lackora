import {
	Button,
	type Direction,
	Divider,
	Flex,
	Text,
	useMantineTheme,
} from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";

type Props = {
	setDirection: Dispatch<SetStateAction<"rtl" | "ltr">>;
	direction: Direction;
};

export default function ICLicenseAgreementHeader(props: Props) {
	const theme = useMantineTheme();

	return (
		<>
			<Flex align="center" justify="space-between" p="md">
				<Text size="xl" fw="bolder">
					{props.direction === "rtl"
						? "توافق نامه استفاده از سامانه CoreLog"
						: "CoreLog License Agreement"}
				</Text>
				<Button
					onClick={() =>
						props.setDirection((prevState) =>
							prevState === "rtl" ? "ltr" : "rtl",
						)
					}
					variant="outline"
					leftSection={
						<IconWorld width={20} height={20} color={theme.colors.primary[6]} />
					}
				>
					{props.direction === "rtl" ? "English" : "فارسی"}
				</Button>
			</Flex>
			<Divider />
		</>
	);
}
