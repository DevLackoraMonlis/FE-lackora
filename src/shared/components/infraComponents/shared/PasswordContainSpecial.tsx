import { CheckIcon, Text, useMantineTheme } from '@mantine/core';

export default function PasswordContainSpecial(props: { checkingPasswordData?: boolean }) {
	const theme = useMantineTheme();

	return (
		<>
			{props.checkingPasswordData && <CheckIcon size={18} color={theme.colors.green[5]} />}
			<Text size="sm">At least one special character</Text>
		</>
	);
}
