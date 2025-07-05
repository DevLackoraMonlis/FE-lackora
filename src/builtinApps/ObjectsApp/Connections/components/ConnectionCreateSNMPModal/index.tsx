import ConnectionCreateDefaultModal from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateDefaultModal";
import ConnectionCreateFormChangeTypeWrapper from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateFormChangeTypeWrapper";
import ConnectionCreateFormFooter from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateFormFooter";
import ConnectionCreateSNMPFormSettings from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateSNMPModal/ConnectionCreateSNMPFormSettings";
import {
	CreateConnectionSNMPFormProvider,
	type CreateConnectionSNMPFormValues,
	useCreateConnectionSNMPForm,
} from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateSNMPModal/index.form";
import {
	CreateConnectionSNMPAuthenticationProtocolType,
	CreateConnectionSNMPPrivacyProtocolType,
	CreateConnectionSNMPSecurityLdLevelType,
	CreateConnectionSNMPVersionType,
} from "@/builtinApps/ObjectsApp/Connections/index.enum";
import type { CreateConnectionModalProps } from "@/builtinApps/ObjectsApp/Connections/index.types";
import { useCreateConnection } from "@/http/generated/management-center-connections";
import type { CreateConnection } from "@/http/generated/models";
import { validateInput } from "@/shared/lib/utils";
import { Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

export default function ConnectionCreateSNMPModal(
	props: CreateConnectionModalProps<CreateConnectionSNMPFormValues>,
) {
	const form = useCreateConnectionSNMPForm({
		initialValues: {
			description: "",
			name: "",
			snmpPort: 22,
			snmpVersion: CreateConnectionSNMPVersionType.SNMP_V_2_C,
			securityLevel: CreateConnectionSNMPSecurityLdLevelType.NO_SECURITY,
			privacyProtocol: CreateConnectionSNMPPrivacyProtocolType.AES,
			authenticationProtocol: CreateConnectionSNMPAuthenticationProtocolType.MD5,
		},
		validate: {
			name: (value) =>
				validateInput(value, {
					required: true,
					onlyEnglishWithSpaces: true,
				}),
			snmpPort: (value) =>
				validateInput(value, {
					required: true,
					mustBeNumber: true,
				}),
			community: (value, values) => {
				if (values.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_2_C) {
					return validateInput(value, { required: true });
				}
				return null;
			},
			securityLevel: (value, values) => {
				if (values.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3) {
					return validateInput(value, {
						required: true,
					});
				}
				return null;
			},
			user: (value, values) => {
				if (values.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3) {
					return validateInput(value, { required: true, onlyEnglishWithSpaces: true });
				}
				return null;
			},
			password: (value, values) => {
				if (
					values.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 &&
					values.securityLevel === CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_ONLY
				) {
					return validateInput(value, { required: true, onlyEnglishChars: true });
				}
				return null;
			},
			authenticationProtocol: (value, values) => {
				if (
					values.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 &&
					values.securityLevel === CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_ONLY
				) {
					return validateInput(value, { required: true });
				}
				return null;
			},
			privacyProtocol: (value, values) => {
				if (
					values.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 &&
					values.securityLevel === CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_PRIVACY
				) {
					return validateInput(value, { required: true });
				}
				return null;
			},
			privacyPassphrase: (value, values) => {
				if (
					values.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 &&
					values.securityLevel === CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_PRIVACY
				) {
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

	const createSNMPConnectionMutation = useCreateConnection({
		mutation: {
			onSuccess: () => {
				notifications.show({
					title: "Success",
					message: "SNMP Connection Created Successfully",
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
			description: formValues.description,
			password:
				formValues.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_2_C
					? formValues.community
					: formValues.password,
			name: formValues.name,
			port: formValues.snmpPort,
			type: "snmp",
			authentication_type:
				formValues.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_2_C ? "snmpv2c" : "snmpv3",
			username: formValues.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 ? formValues.user : null,
			authentication_protocol:
				formValues.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 &&
				formValues.securityLevel === CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_ONLY
					? formValues.authenticationProtocol
					: null,
			privacy_protocol:
				formValues.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 &&
				formValues.securityLevel === CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_ONLY
					? formValues.privacyProtocol
					: null,
			privacy_passphrase:
				formValues.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 &&
				formValues.securityLevel === CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_ONLY
					? formValues.privacyPassphrase
					: null,
		};
		createSNMPConnectionMutation.mutate({ data: payload });
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
				type={"SNMP"}
				onChangeType={() => {
					form.reset();
					props.onChangeType("SNMP");
				}}
			>
				<CreateConnectionSNMPFormProvider form={form}>
					<form className={"h-full w-full"} onSubmit={form.onSubmit(handleSubmit)}>
						<Flex h={700} p={"lg"} gap={"xs"} direction={"column"}>
							<ConnectionCreateSNMPFormSettings onTestConnection={props.onTestConnection} />
						</Flex>
						<ConnectionCreateFormFooter
							loading={createSNMPConnectionMutation.isPending}
							onCancel={handleClose}
						/>
					</form>
				</CreateConnectionSNMPFormProvider>
			</ConnectionCreateFormChangeTypeWrapper>
		</ConnectionCreateDefaultModal>
	);
}
