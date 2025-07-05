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
import { useCreateConnection } from "@/http/generated/management-center-connections";
import type { CreateConnection } from "@/http/generated/models";
import { validateInput } from "@/shared/lib/utils";
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
			port: 0,
			authenticationRequired: false,
			baseUri: "",
			protocol: CreateConnectionHTTPProtocolType.HTTP,
		},
		validate: {
			name: (value) =>
				validateInput(value, {
					required: true,
					onlyEnglishWithSpaces: true,
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
		props.onClose();
		form.reset();
	};

	const createHTTPConnectionMutation = useCreateConnection({
		mutation: {
			onSuccess: () => {
				notifications.show({
					title: "Success",
					message: "HTTP(HTTPS) Connection Created Successfully",
					color: "green",
					withBorder: true,
				});
				props.onSuccessCreate();
				handleClose();
			},
		},
	});

	const handleSubmit = (formValues: CreateConnectionHTTPFormValues) => {
		const payload: CreateConnection = {
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
		createHTTPConnectionMutation.mutate({ data: payload });
	};

	useEffect(() => {
		if (props.initialFormValues) {
			form.setValues(props.initialFormValues);
		}
	}, [props.initialFormValues, form.setValues]);

	return (
		<ConnectionCreateDefaultModal opened={props.opened} onClose={handleClose}>
			<ConnectionCreateFormChangeTypeWrapper
				loading={props.loading}
				type={"HTTP(HTTPS)"}
				onChangeType={() => {
					form.reset();
					props.onChangeType("HTTP(HTTPS)");
				}}
			>
				<CreateConnectionHTTPFormProvider form={form}>
					<form className={"h-full w-full"} onSubmit={form.onSubmit(handleSubmit)}>
						<Flex h={600} p={"lg"} gap={"xs"} direction={"column"}>
							<ConnectionCreateHTTPFormSettings onTestConnection={props.onTestConnection} />
						</Flex>
						<ConnectionCreateFormFooter
							loading={createHTTPConnectionMutation.isPending}
							onCancel={handleClose}
						/>
					</form>
				</CreateConnectionHTTPFormProvider>
			</ConnectionCreateFormChangeTypeWrapper>
		</ConnectionCreateDefaultModal>
	);
}
