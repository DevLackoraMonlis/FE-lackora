import type { SessionUserType } from "@/http/httpService";
import ICLoginLocked from "@/shared/components/infraComponents/ICLogin/components/ICLoginForm/ICLoginLocked";
import { AllApplications, AppRoutes } from "@/shared/constants/routes";
import { validateInput } from "@/shared/lib/utils";
import envStore from "@/shared/stores/envStore";
import { Alert, Button, Card, Checkbox, Flex, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertOctagon, IconLock, IconUserCircle } from "@tabler/icons-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FormValues = {
	username: string;
	password: string;
};

type AuthErrorType = "credentials" | "locked";

export default function ICLoginForm() {
	const { data } = useSession();
	const sessionUser = data?.user as SessionUserType;
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<AuthErrorType | undefined>(undefined);
	const router = useRouter();

	const form = useForm<FormValues>({
		initialValues: {
			username: "",
			password: "",
		},
		validate: {
			username: (value) => validateInput(value, { onlyEnglishChars: true, required: true }),
			password: (value) =>
				validateInput(value, {
					required: true,
					minLength: 8,
					mustContainSpecialChars: true,
				}),
		},
		validateInputOnBlur: true,
	});

	const onSubmit = async (formValues: FormValues) => {
		try {
			setIsLoading(true);
			const response = await signIn("credentials", {
				redirect: false,
				password: formValues.password,
				username: formValues.username,
				baseUrl: envStore.getState().envs.baseUrl,
			});
			if (!response?.ok) {
				setError("credentials");
				setIsLoading(false);
			} else {
				router.push(
					AppRoutes.appModulePage(
						AllApplications.CYBER_ASSETS.name,
						AllApplications.CYBER_ASSETS.modules.CYBER_ASSETS,
					),
				);
			}
		} catch (_error) {
			setError("credentials");
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (sessionUser) {
			router.push(
				AppRoutes.appModulePage(
					AllApplications.CYBER_ASSETS.name,
					AllApplications.CYBER_ASSETS.modules.CYBER_ASSETS,
				),
			);
		}
	}, [sessionUser, router.push]);

	return (
		<Flex w={"100%"} h={"100%"} justify={"center"} align={"center"}>
			<Card h={error ? 700 : 600} w={"100%"} p={"2xl"} radius={"lg"}>
				<Flex direction={"column"} h={"100%"} justify={"center"} align={"flex-start"} gap={"xs"}>
					{error !== "locked" ? (
						<>
							<Title order={3}>Welcome back</Title>
							<Text c={"#868E96"} fz={"md"}>
								Please enter your login details below
							</Text>
							<form style={{ height: "fit-content", width: "100%" }} onSubmit={form.onSubmit(onSubmit)}>
								<Flex mt={"xl"} gap={"xl"} direction={"column"} w={"100%"}>
									<TextInput
										data-testid="login-username"
										required
										size={"lg"}
										leftSection={<IconUserCircle />}
										{...form.getInputProps("username")}
										label={"Username"}
									/>
									<PasswordInput
										data-testid="login-password"
										minLength={8}
										required
										size={"lg"}
										leftSection={<IconLock />}
										{...form.getInputProps("password")}
										label={"Password"}
									/>
									<Checkbox label={"Remember me"} />
									<Button
										data-testid="login-submit-button"
										size={"lg"}
										color={"main"}
										disabled={!form.isValid()}
										type={"submit"}
										loading={isLoading}
									>
										Sign in
									</Button>
									{error === "credentials" && (
										<Alert
											onClose={() => setError(undefined)}
											withCloseButton
											variant="light"
											color="red"
											title="Incorrect credentials!"
											icon={<IconAlertOctagon />}
										>
											Incorrect username or password. Please try again. You have 2 attempts left before your
											account is locked.
										</Alert>
									)}
									<Flex gap={"xs"} w={"100%"} align={"center"} justify={"center"}>
										<Text c={"main.6"}>Need access?</Text>
										<Text>Contact admin</Text>
									</Flex>
								</Flex>
							</form>
						</>
					) : (
						<ICLoginLocked onCompleteRemainingTime={() => setError(undefined)} remainTimeMinutes={60} />
					)}
				</Flex>
			</Card>
		</Flex>
	);
}
