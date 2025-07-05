import ConnectionCreateFormChangeTypeWrapper from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateFormChangeTypeWrapper";
import ConnectionCreateFormSections from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateFormSections";
import type {
	CreateConnectionChangeTypeFn,
	CreateConnectionType,
} from "@/builtinApps/ObjectsApp/Connections/components/index.types";
import { useCreateConnection } from "@/http/generated/management-center-connections";
import type { CreateConnection } from "@/http/generated/models";
import BCModal from "@/shared/components/baseComponents/BCModal";
import { validateInput } from "@/shared/lib/utils";
import {
	Button,
	Checkbox,
	Flex,
	Grid,
	Group,
	NumberInput,
	PasswordInput,
	Radio,
	RadioGroup,
	TextInput,
	Textarea,
	Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle } from "@tabler/icons-react";

type Props = {
	opened: boolean;
	onClose: VoidFunction;
	onChangeType: CreateConnectionChangeTypeFn;
	onTestConnection: (type: CreateConnectionType) => void;
	onSuccessCreate: VoidFunction;
};

enum AuthenticationType {
	USER_PASSWORD = "User/Password",
	PUBLIC_PRIVATE_KEY = "Public/Private key",
}

type FormValues = {
	name: string;
	description: string;
	sshPort: number;
	authenticationType: AuthenticationType;
	sshKey?: string;
	passphrase?: string;
	enablePrivilegedMode: boolean;
	username?: string;
	password?: string;
	privilegedPassword?: string;
};

export default function ConnectionCreateSSHModal(props: Props) {
	const form = useForm<FormValues>({
		initialValues: {
			authenticationType: AuthenticationType.USER_PASSWORD,
			description: "",
			name: "",
			sshPort: 22,
			enablePrivilegedMode: false,
		},
		validate: {
			name: (value) =>
				validateInput(value, {
					required: true,
				}),
			sshPort: (value) =>
				validateInput(value, {
					required: true,
					mustBeNumber: true,
				}),
			password: (value, values) => {
				if (values.authenticationType === "User/Password") {
					return validateInput(value, { required: true });
				}
				return null;
			},
			privilegedPassword: (value, values) => {
				if (values.enablePrivilegedMode) {
					return validateInput(value, {
						required: true,
					});
				}
				return null;
			},
			passphrase: (value, values) => {
				if (values.authenticationType === "Public/Private key") {
					return validateInput(value, { required: true });
				}
				return null;
			},

			username: (value, values) => {
				if (values.authenticationType === "User/Password") {
					return validateInput(value, { required: true });
				}
				return null;
			},
		},
	});

	const handleClose = () => {
		props.onClose();
		form.reset();
	};

	const createSSHConnectionMutation = useCreateConnection({
		mutation: {
			onMutate: () => ({ successMessage: "SSH Connection Created Successfully" }),
			onSuccess: () => {
				props.onSuccessCreate();
				handleClose();
			},
		},
	});

	const handleSubmit = (formValues: FormValues) => {
		const payload: CreateConnection = {
			authenticate_required: false,
			description: formValues.description,
			authentication_type:
				formValues.authenticationType === AuthenticationType.USER_PASSWORD
					? "username_password"
					: "public_private_key",
			password:
				formValues.authenticationType === AuthenticationType.USER_PASSWORD ? formValues.password : null,
			name: formValues.name,
			port: formValues.sshPort,
			type: "ssh",
			username: formValues.authenticationType === AuthenticationType.USER_PASSWORD ? formValues.username : "",
			privileged_password: formValues.privilegedPassword,
			privileged_authentication: formValues.enablePrivilegedMode,
		};
		createSSHConnectionMutation.mutate({ data: payload });
	};

	console.log(form.values);

	return (
		<BCModal
			withCloseButton={false}
			size={600}
			opened={props.opened}
			onClose={handleClose}
			title={"Create New Connection"}
		>
			<ConnectionCreateFormChangeTypeWrapper
				type={"SSH"}
				onChangeType={() => {
					form.reset();
					props.onChangeType("SSH");
				}}
			>
				<form className={"h-full w-full"} onSubmit={form.onSubmit(handleSubmit)}>
					<Flex
						h={form.values.authenticationType === AuthenticationType.USER_PASSWORD ? 600 : 700}
						p={"lg"}
						gap={"xs"}
						direction={"column"}
					>
						<ConnectionCreateFormSections
							connectionNameInputProps={{
								...form.getInputProps("name"),
							}}
							connectionDescriptionInputProps={{
								...form.getInputProps("description"),
							}}
							connectionSettingSection={
								<Flex direction={"column"} gap={"xs"}>
									<Flex justify={"space-between"}>
										<NumberInput
											hideControls
											allowDecimal={false}
											allowNegative={false}
											allowLeadingZeros={false}
											required
											label={"SSH Port"}
											{...form.getInputProps("sshPort")}
										/>
										<RadioGroup
											defaultValue={AuthenticationType.USER_PASSWORD}
											{...form.getInputProps("authenticationType", { type: "checkbox" })}
											label={"Authentication Type"}
										>
											<Group mt="xs">
												<Radio
													label={AuthenticationType.USER_PASSWORD}
													value={AuthenticationType.USER_PASSWORD}
												/>
												<Radio
													label={AuthenticationType.PUBLIC_PRIVATE_KEY}
													value={AuthenticationType.PUBLIC_PRIVATE_KEY}
												/>
											</Group>
										</RadioGroup>
									</Flex>
									{form.values.authenticationType === AuthenticationType.USER_PASSWORD && (
										<Flex direction={"column"} gap={"sm"}>
											<Grid>
												<Grid.Col span={6}>
													<TextInput w={"100%"} required label={"User"} {...form.getInputProps("username")} />
												</Grid.Col>
												<Grid.Col span={6}>
													<PasswordInput
														w={"100%"}
														required
														label={"Password"}
														{...form.getInputProps("password")}
													/>
												</Grid.Col>
											</Grid>
											<Grid align={"center"}>
												<Grid.Col span={6}>
													<Flex align={"center"} gap={"xs"}>
														<Checkbox
															label={"Enable privileged mode"}
															{...form.getInputProps("enablePrivilegedMode")}
														/>
														<Tooltip label={"Description about this section"}>
															<IconInfoCircle color={"blue"} size={14} />
														</Tooltip>
													</Flex>
												</Grid.Col>
												{form.values.enablePrivilegedMode && (
													<Grid.Col span={6}>
														<PasswordInput
															w={"100%"}
															required
															{...form.getInputProps("privilegedPassword")}
														/>
													</Grid.Col>
												)}
											</Grid>
										</Flex>
									)}
									{form.values.authenticationType === AuthenticationType.PUBLIC_PRIVATE_KEY && (
										<Flex direction={"column"} gap={"sm"}>
											<Textarea rows={3} label={"SSH Key"} {...form.getInputProps("sshKey")} />
											<PasswordInput required label={"Passphrase"} {...form.getInputProps("passphrase")} />
											<Grid align={"center"}>
												<Grid.Col span={6}>
													<Flex align={"center"} gap={"xs"}>
														<Checkbox
															label={"Enable privileged mode"}
															{...form.getInputProps("enablePrivilegedMode")}
														/>
														<Tooltip label={"Description about this section"}>
															<IconInfoCircle color={"blue"} size={14} />
														</Tooltip>
													</Flex>
												</Grid.Col>
												{form.values.enablePrivilegedMode && (
													<Grid.Col span={6}>
														<PasswordInput
															w={"100%"}
															required
															{...form.getInputProps("privilegedPassword")}
														/>
													</Grid.Col>
												)}
											</Grid>
										</Flex>
									)}
									<Button w={200} variant={"light"} onClick={() => props.onTestConnection("SSH")}>
										Test Connection
									</Button>
								</Flex>
							}
						/>
					</Flex>
					<BCModal.EmptyFooter>
						<Flex gap={"sm"} className={"h-full w-full"} px={"sm"} align={"center"} justify={"flex-end"}>
							<Button loading={createSSHConnectionMutation.isPending} type={"submit"}>
								Save
							</Button>
							<Button
								loading={createSSHConnectionMutation.isPending}
								variant={"default"}
								onClick={handleClose}
							>
								Cancel
							</Button>
						</Flex>
					</BCModal.EmptyFooter>
				</form>
			</ConnectionCreateFormChangeTypeWrapper>
		</BCModal>
	);
}
