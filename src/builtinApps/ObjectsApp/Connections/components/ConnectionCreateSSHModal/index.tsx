import ConnectionCreateDefaultModal from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateDefaultModal";
import ConnectionCreateFormChangeTypeWrapper from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateFormChangeTypeWrapper";
import ConnectionCreateFormFooter from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateFormFooter";
import ConnectionCreateSSHFormSettings from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateSSHModal/ConnectionCreateSSHFormSettings";
import {
	CreateConnectionSSHFormProvider,
	type CreateConnectionSSHFormValues,
	useCreateConnectionSSHForm,
} from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateSSHModal/index.form";
import { CreateConnectionSSHAuthenticationType } from "@/builtinApps/ObjectsApp/Connections/index.enum";
import type { CreateConnectionModalProps } from "@/builtinApps/ObjectsApp/Connections/index.types";
import { useCreateConnection, useEditConnection } from "@/http/generated/management-center-connections";
import type { CreateConnection } from "@/http/generated/models";
import { validateInput } from "@/shared/lib/utils";
import { Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

export default function ConnectionCreateSSHModal(
	props: CreateConnectionModalProps<CreateConnectionSSHFormValues>,
) {
	const form = useCreateConnectionSSHForm({
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
					return validateInput(value, { required: true, onlyEnglishWithSpaces: true });
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
				props.onSuccess();
				handleClose();
			},
		},
	});

	const updateSSHConnectionMutation = useEditConnection({
		mutation: {
			onSuccess: () => {
				notifications.show({
					title: "Success",
					message: "SSH Connection Updated Successfully",
					color: "green",
					withBorder: true,
				});
				props.onSuccess();
				handleClose();
			},
		},
	});

	const handleSubmit = (formValues: CreateConnectionSSHFormValues) => {
		const payload: CreateConnection = {
			authenticate_required: false,
			description: formValues.description,
			privacy_passphrase: formValues.passphrase,
			authentication_type:
				formValues.authenticationType === CreateConnectionSSHAuthenticationType.USER_PASSWORD
					? "username_password"
					: "public_private_key",
			password:
				formValues.authenticationType === CreateConnectionSSHAuthenticationType.USER_PASSWORD
					? formValues.password
					: "",
			ssh_key: formValues.sshKey,
			passphrase: formValues.passphrase,
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
		if (props.initialFormValues && props.id) {
			updateSSHConnectionMutation.mutate({ data: payload, connectionId: props.id });
		} else {
			createSSHConnectionMutation.mutate({ data: payload });
		}
	};

	useEffect(() => {
		if (props.initialFormValues) {
			form.setValues(props.initialFormValues);
		}
	}, [props.initialFormValues, form.setValues]);

	return (
		<ConnectionCreateDefaultModal
			isEditMode={!!props.initialFormValues}
			opened={props.opened}
			onClose={handleClose}
		>
			<ConnectionCreateFormChangeTypeWrapper
				loading={props.loading}
				type={"SSH"}
				onChangeType={() => {
					form.reset();
					props.onChangeType("SSH");
				}}
			>
				<CreateConnectionSSHFormProvider form={form}>
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
							<ConnectionCreateSSHFormSettings onTestConnection={props.onTestConnection} />
						</Flex>
						<ConnectionCreateFormFooter
							loading={createSSHConnectionMutation.isPending || updateSSHConnectionMutation.isPending}
							onCancel={handleClose}
						/>
					</form>
				</CreateConnectionSSHFormProvider>
			</ConnectionCreateFormChangeTypeWrapper>
		</ConnectionCreateDefaultModal>
	);
}
