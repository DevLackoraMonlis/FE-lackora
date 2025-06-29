import { CheckIcon, Text, useMantineTheme } from "@mantine/core";

export default function PasswordContainLowerAndUpperCase(props: {
	checkingPasswordData?: boolean;
}) {
	const theme = useMantineTheme();

	return (
		<>
			{props.checkingPasswordData && (
				<CheckIcon size={18} color={theme.colors.green[5]} />
			)}
			<Text size="sm">Be a mixture of lower and upper cases</Text>
		</>
	);
}
