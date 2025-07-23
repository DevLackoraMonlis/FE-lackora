import type { ICPanelHeaderProps } from "@/shared/components/infraComponents/ICPanelHeader/index.types";
import PasswordContainCharacters from "@/shared/components/infraComponents/shared/PasswordContainCharacters";
import PasswordContainNumber from "@/shared/components/infraComponents/shared/PasswordContainNumber";
import PasswordContainSpecial from "@/shared/components/infraComponents/shared/PasswordContainSpecial";
import { AppRoutes } from "@/shared/constants/routes";
import { Button, Card, CheckIcon, Flex, Modal, PasswordInput, Text } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { signOut } from "next-auth/react";
import PasswordContainUpperCase from "../../../shared/PasswordContainUpperCase";
import { useChangePassword, useCheckingPassword, useGetGeneratePasswordQuery } from "../../index.hooks";
import classes from "../../index.module.css";

type Props = ICPanelHeaderProps & {
	opened: boolean;
	onClose: () => void;
};

type FormValues = {
	confirmPassword: string;
	newPassword: string;
	oldPassword: string;
};

export default function ICPanelHeaderAvatarMenuResetPassword(props: Props) {
	const { checkingPasswordData, handleValidatePassword, isValidPassword } = useCheckingPassword();

	const { changePassword } = useChangePassword({
		onSuccess: () => signOut({ redirect: true, callbackUrl: AppRoutes.login }),
	});

	const { getGeneratePassword } = useGetGeneratePasswordQuery();

	const form = useForm<FormValues>({
		initialValues: {
			confirmPassword: "",
			newPassword: "",
			oldPassword: "",
		},
		validate: {
			oldPassword: hasLength({ min: 8 }, "Current password is required"),
			newPassword: (value, values) => {
				if (values.oldPassword === value) {
					return "you have entered your current password";
				}
				return isValidPassword ? null : "New password is required";
			},
			confirmPassword: (value, values) => (value !== values.newPassword ? "Password doesn't match" : null),
		},
		onValuesChange: (values) => {
			handleValidatePassword(values.newPassword);
		},
		validateInputOnBlur: true,
	});

	const handleGeneratePassword = () => {
		getGeneratePassword({}).then((res) => {
			form.setFieldValue("new_password", res?.data?.password);
		});
	};

	const handleSubmit = (formValues: FormValues) => {
		changePassword.mutate({
			old_password: formValues.oldPassword,
			new_password: formValues.newPassword,
		});
	};

	return (
		<Modal
			title="Reset Password"
			opened={props.opened}
			onClose={() => {
				form.reset();
				props.onClose();
			}}
			centered
			radius="lg"
			classNames={{
				header: classes.cardHeader,
				title: classes.cardTitle,
			}}
			transitionProps={{
				transition: "fade",
				duration: 600,
				timingFunction: "linear",
			}}
			overlayProps={{
				backgroundOpacity: 0.55,
				blur: 3,
			}}
		>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Card p="md" mt="md" bg="transparent">
					<Flex direction="column" rowGap="xl">
						<PasswordInput
							label={
								<Text size="sm" fw="bolder">
									Current Password
								</Text>
							}
							{...form.getInputProps("old_password")}
						/>
						<PasswordInput
							label={
								<Text size="sm" fw="bolder">
									New Password
								</Text>
							}
							{...form.getInputProps("new_password")}
						/>
						<Flex direction="column">
							<Flex justify="space-between" align="center">
								<Text fw={600} size="xs">
									Password Requirements:
								</Text>
								<Button
									id="data-test-create-user-input-generate-password"
									variant="outline"
									size="xs"
									className={classes.generatePasswordBtn}
									onClick={handleGeneratePassword}
									loading={false}
								>
									<Text fw={600} size="xs" className={classes.generatePasswordBtnText}>
										Generate Password
									</Text>
								</Button>
							</Flex>
							<Flex direction="column" gap={5}>
								<Flex columnGap={5}>
									<PasswordContainCharacters checkingPasswordData={checkingPasswordData?.lengthCheck} />
								</Flex>
								<Flex columnGap={5}>
									<PasswordContainUpperCase
										checkingPasswordData={
											checkingPasswordData?.uppercaseCheck && checkingPasswordData?.lowercaseCheck
										}
									/>
								</Flex>
								<Flex columnGap={5}>
									<PasswordContainSpecial checkingPasswordData={checkingPasswordData?.specialCharCheck} />
								</Flex>
								<Flex columnGap={5}>
									<PasswordContainNumber checkingPasswordData={checkingPasswordData?.numericCheck} />
								</Flex>
							</Flex>
						</Flex>
						<PasswordInput
							label={
								<Text size="sm" fw={700}>
									Confirm Your New Password
								</Text>
							}
							{...form.getInputProps("confirmPassword")}
						/>
						<Button
							type="submit"
							loading={changePassword.isPending}
							disabled={!form.isValid()}
							fullWidth
							leftSection={<CheckIcon size={18} />}
						>
							Reset Password
						</Button>
					</Flex>
				</Card>
			</form>
		</Modal>
	);
}
