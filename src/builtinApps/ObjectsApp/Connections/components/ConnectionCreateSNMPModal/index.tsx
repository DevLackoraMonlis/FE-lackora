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
import { useCreateConnection, useEditConnection } from "@/http/generated/management-center-connections";
import type { CreateConnection, EachConnectionSecurityLevel } from "@/http/generated/models";
import { getChangedFields, validateInput } from "@/shared/lib/utils";
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
			snmpPort: 161,
			snmpVersion: CreateConnectionSNMPVersionType.SNMP_V_2_C,
			securityLevel: CreateConnectionSNMPSecurityLdLevelType.NO_SECURITY,
			privacyProtocol: CreateConnectionSNMPPrivacyProtocolType.AES,
			authenticationProtocol: CreateConnectionSNMPAuthenticationProtocolType.MD5,
		},
		validate: {
			name: (value) =>
				validateInput(value, {
					required: true,
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
					return validateInput(value, { required: true });
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
		form.reset();
		props.onClose();
	};

	const createSNMPConnectionMutation = useCreateConnection({
		mutation: {
			onMutate: () => ({ successMessage: "SNMP Connection Created Successfully" }),
		},
	});
	const updateSNMPConnectionMutation = useEditConnection({
		mutation: {
			onMutate: () => ({ successMessage: "SNMP Connection Updated Successfully" }),
		},
	});

	const securityLevelMap: Record<CreateConnectionSNMPSecurityLdLevelType, EachConnectionSecurityLevel> = {
		[CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_ONLY]: "authentication_only",
		[CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_PRIVACY]: "authentication_privacy",
		[CreateConnectionSNMPSecurityLdLevelType.NO_SECURITY]: "no_security",
	};

	function getPayload(formValues: CreateConnectionSNMPFormValues): CreateConnection {
		return {
			description: formValues.description,
			password:
				formValues.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_2_C ||
				(formValues.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 &&
					formValues.securityLevel !== CreateConnectionSNMPSecurityLdLevelType.NO_SECURITY)
					? formValues.password
					: null,
			name: formValues.name,
			port: formValues.snmpPort,
			security_level:
				formValues.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 && formValues.securityLevel
					? securityLevelMap[formValues.securityLevel]
					: null,
			community:
				formValues.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_2_C ? formValues.community : null,
			type: "snmp",
			authentication_type:
				formValues.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_2_C ? "snmpv2c" : "snmpv3",
			username: formValues.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 ? formValues.user : null,
			authentication_protocol:
				formValues.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 &&
				formValues.securityLevel !== CreateConnectionSNMPSecurityLdLevelType.NO_SECURITY
					? formValues.authenticationProtocol
					: null,
			privacy_protocol:
				formValues.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 &&
				formValues.securityLevel === CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_PRIVACY
					? formValues.privacyProtocol
					: null,
			privacy_passphrase:
				formValues.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 &&
				formValues.securityLevel === CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_PRIVACY
					? formValues.privacyPassphrase
					: null,
		};
	}

	const handleSubmit = (formValues: CreateConnectionSNMPFormValues) => {
		const newPayload = getPayload(formValues);

		if (props.initialFormValues && props.id) {
			const oldPayload = getPayload(props.initialFormValues);
			const changedPayload = getChangedFields<CreateConnection>(oldPayload, newPayload);
			if (!Object.keys(changedPayload).length) {
				notifications.show({
					title: "No Changes Made",
					message: "You haven't made any changes to the form.",
					color: "green",
					withBorder: true,
				});
				return;
			}
			updateSNMPConnectionMutation.mutate(
				{ data: changedPayload, connectionId: props.id },
				{
					onSuccess: () => {
						props.onSuccess();
						handleClose();
					},
				},
			);
		} else {
			createSNMPConnectionMutation.mutate(
				{ data: newPayload },
				{
					onSuccess: () => {
						props.onSuccess();
						handleClose();
					},
				},
			);
		}
	};

	useEffect(() => {
		if (props.initialFormValues) {
			form.setValues(props.initialFormValues);
		} else {
			form.reset();
		}
	}, [props.initialFormValues, form.setValues]);

	return (
		<ConnectionCreateDefaultModal
			isEditMode={!!props.initialFormValues}
			opened={props.opened}
			onClose={handleClose}
		>
			<ConnectionCreateFormChangeTypeWrapper
				isEditMode={!!props.initialFormValues}
				loading={props.loading}
				type={"SNMP"}
				onChangeType={() => {
					form.reset();
					props.onChangeType("SNMP");
				}}
			>
				<CreateConnectionSNMPFormProvider form={form}>
					<form className={"h-full w-full"} onSubmit={form.onSubmit(handleSubmit)}>
						<Flex
							h={form.values.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_2_C ? 500 : 650}
							p={"lg"}
							gap={"xs"}
							direction={"column"}
						>
							<ConnectionCreateSNMPFormSettings />
						</Flex>
						<ConnectionCreateFormFooter
							loading={createSNMPConnectionMutation.isPending || updateSNMPConnectionMutation.isPending}
							onCancel={handleClose}
						/>
					</form>
				</CreateConnectionSNMPFormProvider>
			</ConnectionCreateFormChangeTypeWrapper>
		</ConnectionCreateDefaultModal>
	);
}
