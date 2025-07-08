import { ActionIcon, Box, Fieldset, Flex, Grid, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";

import { useCreateWebService } from "@/http/generated/management-center-web-services";
import { getDynamicField } from "@/shared/components/baseComponents/BCDynamicField";
import { GET_OBJECT_DATA_QUERY_KEY } from "@/shared/components/baseComponents/BCDynamicField/index.constants";
import type { BCDynamicFieldProps } from "@/shared/components/baseComponents/BCDynamicField/index.types";
import { validateInput } from "@/shared/lib/utils";

type FormValues = {
	name: string;
	uri: string;
	matcher: string;
	code: string;
	description: string;
};

const fields: BCDynamicFieldProps<"">[] = [
	{
		type: "String",
		key: "name",
		label: "Web Service Name",
		placeholder: "e.g., Web Service Name",
		otherElementOptions: {
			span: 12,
			withAsterisk: true,
		},
	},
	{
		type: "Textarea",
		key: "uri",
		placeholder: "e.g., /health",
		label: "URI Query",
		otherElementOptions: {
			span: 12,
			withAsterisk: true,
		},
	},
	{
		type: "String",
		key: "matcher",
		label: "Response Matcher",
		placeholder: "e.g., status=ok",
		otherElementOptions: {
			span: 8,
			withAsterisk: true,
		},
	},
	{
		type: "Select",
		key: "code",
		placeholder: "e.g., 200",
		label: "Response Code",
		otherElementOptions: {
			span: 4,
			withAsterisk: true,
		},
		options: Object.values(HttpStatusCode)
			.filter(Number)
			.map((value) => ({
				label: value.toString(),
				value: value.toString(),
			})),
	},
	{
		type: "Textarea",
		key: "description",
		label: "Description",
		otherElementOptions: {
			span: 12,
		},
	},
];

export default function NoneCredentialCreateWebService({ onCancel }: { onCancel: VoidFunction }) {
	const queryClient = useQueryClient();
	const form = useForm<FormValues>({
		validate: {
			name: (value) => validateInput(value, { required: true }),
			uri: (value) => validateInput(value, { required: true, mustBeURI: true }),
			matcher: (value) => validateInput(value, { required: true }),
			code: (value) => validateInput(value, { required: true }),
		},
	});

	const createWebService = useCreateWebService();
	const handleSubmit = (values: typeof form.values) => {
		createWebService.mutate(
			{
				data: {
					name: values.name,
					response_code: Number(values.code),
					response_matcher: values.matcher,
					uri_query: values.uri,
					description: values.description || "",
				},
			},
			{
				onSuccess() {
					queryClient.refetchQueries({ queryKey: [GET_OBJECT_DATA_QUERY_KEY] });
					onCancel();
				},
			},
		);
	};

	return (
		<Box pos="relative" mt="xs">
			<LoadingOverlay visible={createWebService.isPending} />
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Flex gap="xs" mt="xs">
					<Fieldset variant="filled" w="100%" pb="xs" pt="2xs">
						<Grid gutter="xs">
							{fields.map(({ key, ...item }) => {
								return (
									<Grid.Col span={{ xs: 12, md: item?.otherElementOptions?.span as number }} key={key}>
										{getDynamicField({
											formInputProps: {
												key: form.key(key),
												...form.getInputProps(key),
											},
											key,
											...item,
										})}
									</Grid.Col>
								);
							})}
						</Grid>
					</Fieldset>
					<Flex direction="column" gap="xs" justify="center" align="center">
						<ActionIcon size="lg" title="Save" type="submit" c="gray.2" bg="primary.8">
							<IconCheck size={20} />
						</ActionIcon>
						<ActionIcon size="lg" title="Cancel" type="reset" c="gray.8" bg="gray.2" onClick={onCancel}>
							<IconX size={20} />
						</ActionIcon>
					</Flex>
				</Flex>
			</form>
		</Box>
	);
}
