import ConnectionCreateDefaultModal from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateDefaultModal";
import ConnectionCreateFormChangeTypeWrapper from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateFormChangeTypeWrapper";
import ConnectionCreateFormFooter from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateFormFooter";
import ConnectionCreateHTTPFormSettings from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateHTTPModal/ConnectionCreateHTTPFormSettings";
import {
	CreateConnectionHTTPFormProvider,
	type CreateConnectionHTTPFormValues,
	useCreateConnectionHTTPForm,
} from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateHTTPModal/index.form";
import { CreateConnectionHTTPProtocolType } from "@/builtinApps/ObjectsApp/Connections/index.enum";
import type { CreateConnectionModalProps } from "@/builtinApps/ObjectsApp/Connections/index.types";
import { useCreateConnection, useEditConnection } from "@/http/generated/management-center-connections";
import type { CreateConnection } from "@/http/generated/models";
import { getChangedFields, validateInput } from "@/shared/lib/utils";
import { Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

export default function ConnectionCreateHTTPModal(
	props: CreateConnectionModalProps<CreateConnectionHTTPFormValues>,
) {
	const form = useCreateConnectionHTTPForm({
		initialValues: {
			description: "",
			name: "",
			port: 80,
			authenticationRequired: false,
			baseUri: "",
			protocol: CreateConnectionHTTPProtocolType.HTTP,
		},
		validate: {
			name: (value) =>
				validateInput(value, {
					required: true,
				}),
			port: (value) =>
				validateInput(value, {
					required: true,
					mustBeNumber: true,
				}),
			baseUri: (value) =>
				validateInput(value, {
					required: true,
					mustBeURI: true,
				}),
			username: (value, values) => {
				if (values.authenticationRequired) {
					return validateInput(value, {
						required: true,
						onlyEnglishWithSpaces: true,
					});
				}
				return null;
			},
			password: (value, values) => {
				if (values.authenticationRequired) {
					return validateInput(value, {
						required: true,
					});
				}
				return null;
			},
		},
	});

	const handleClose = () => {
		form.reset();
		props.onClose();
	};

	const createHTTPConnectionMutation = useCreateConnection({
		mutation: {
			onMutate: () => ({ successMessage: "HTTP(HTTPS) Connection Created Successfully" }),
		},
	});

	const updateHTTPConnectionMutation = useEditConnection({
		mutation: {
			onMutate: () => ({ successMessage: "HTTP(HTTPS) Connection Updated Successfully" }),
		},
	});

	function getPayload(formValues: CreateConnectionHTTPFormValues): CreateConnection {
		return {
			description: formValues.description,
			password: formValues.authenticationRequired ? formValues.password : null,
			name: formValues.name,
			port: formValues.port,
			type: "http_https",
			username: formValues.authenticationRequired ? formValues.username : null,
			uri_query: formValues.baseUri,
			authenticate_required: formValues.authenticationRequired,
			authentication_type: formValues.protocol === "HTTP" ? "http" : "https",
		};
	}

	const handleSubmit = (formValues: CreateConnectionHTTPFormValues) => {
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
			updateHTTPConnectionMutation.mutate(
				{ data: changedPayload, connectionId: props.id },
				{
					onSuccess: () => {
						props.onSuccess();
						handleClose();
					},
				},
			);
		} else {
			createHTTPConnectionMutation.mutate(
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
				type={"HTTP(HTTPS)"}
				onChangeType={() => {
					form.reset();
					props.onChangeType("HTTP(HTTPS)");
				}}
			>
				<CreateConnectionHTTPFormProvider form={form}>
					<form className={"h-full w-full"} onSubmit={form.onSubmit(handleSubmit)}>
						<Flex h={550} p={"lg"} gap={"xs"} direction={"column"}>
							<ConnectionCreateHTTPFormSettings />
						</Flex>
						<ConnectionCreateFormFooter
							loading={createHTTPConnectionMutation.isPending || updateHTTPConnectionMutation.isPending}
							onCancel={handleClose}
						/>
					</form>
				</CreateConnectionHTTPFormProvider>
			</ConnectionCreateFormChangeTypeWrapper>
		</ConnectionCreateDefaultModal>
	);
}
