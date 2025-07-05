import ConnectionCreateDefaultModal from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateDefaultModal";
import ConnectionCreateFormChangeTypeWrapper from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateFormChangeTypeWrapper";
import ConnectionCreateFormFooter from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateFormFooter";
import ConnectionCreateSNMPFormSettings from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateSNMPModal/ConnectionCreateSNMPFormSettings";
import {
	CreateConnectionSNMPFormProvider,
	type CreateConnectionSNMPFormValues,
	useCreateConnectionSNMPForm,
} from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateSNMPModal/index.form";
import { CreateConnectionSSHAuthenticationType } from "@/builtinApps/ObjectsApp/Connections/index.enum";
import type { CreateConnectionModalProps } from "@/builtinApps/ObjectsApp/Connections/index.types";
import { useCreateConnection } from "@/http/generated/management-center-connections";
import type { CreateConnection } from "@/http/generated/models";
import { validateInput } from "@/shared/lib/utils";
import { Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function ConnectionCreateSNMPModal(props: CreateConnectionModalProps) {
	const form = useCreateConnectionSNMPForm({
		initialValues: {
			authenticationType: CreateConnectionSSHAuthenticationType.USER_PASSWORD,
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
			onSuccess: () => {
				notifications.show({
					title: "Success",
					message: "SSH Connection Created Successfully",
					color: "green",
					withBorder: true,
				});
				props.onSuccessCreate();
				handleClose();
			},
		},
	});

	const handleSubmit = (formValues: CreateConnectionSNMPFormValues) => {
		const payload: CreateConnection = {
			authenticate_required: false,
			description: formValues.description,
			authentication_type:
				formValues.authenticationType === CreateConnectionSSHAuthenticationType.USER_PASSWORD
					? "username_password"
					: "public_private_key",
			password:
				formValues.authenticationType === CreateConnectionSSHAuthenticationType.USER_PASSWORD
					? formValues.password
					: null,
			name: formValues.name,
			port: formValues.sshPort,
			type: "ssh",
			username:
				formValues.authenticationType === CreateConnectionSSHAuthenticationType.USER_PASSWORD
					? formValues.username
					: "",
			privileged_password: formValues.privilegedPassword,
			privileged_authentication: formValues.enablePrivilegedMode,
		};
		createSSHConnectionMutation.mutate({ data: payload });
	};

	return (
		<ConnectionCreateDefaultModal opened={props.opened} onClose={handleClose}>
			<ConnectionCreateFormChangeTypeWrapper
				type={"SSH"}
				onChangeType={() => {
					form.reset();
					props.onChangeType("SSH");
				}}
			>
				<CreateConnectionSNMPFormProvider form={form}>
					<form className={"h-full w-full"} onSubmit={form.onSubmit(handleSubmit)}>
						<Flex
							h={
								form.values.authenticationType === CreateConnectionSSHAuthenticationType.USER_PASSWORD
									? 600
									: 700
							}
							p={"lg"}
							gap={"xs"}
							direction={"column"}
						>
							<ConnectionCreateSNMPFormSettings onTestConnection={props.onTestConnection} />
						</Flex>
						<ConnectionCreateFormFooter
							loading={createSSHConnectionMutation.isPending}
							onCancel={handleClose}
						/>
					</form>
				</CreateConnectionSNMPFormProvider>
			</ConnectionCreateFormChangeTypeWrapper>
		</ConnectionCreateDefaultModal>
	);
}
