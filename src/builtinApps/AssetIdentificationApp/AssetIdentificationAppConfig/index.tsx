import { useGetConnections } from "@/http/generated/management-center-connections";
import type { LabelValueType } from "@/shared/lib/general-types";
import { validateInput } from "@/shared/lib/utils";
import { Button, Flex, LoadingOverlay, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export type AssetIdentificationAppConfigFormValues = {
	ip: string;
	connection?: LabelValueType;
};

export type AssetIdentificationAppConfigProps = {
	onChange: (formValues: AssetIdentificationAppConfigFormValues) => void;
};

export default function AssetIdentificationAppConfig(props: AssetIdentificationAppConfigProps) {
	const form = useForm<AssetIdentificationAppConfigFormValues>({
		initialValues: {
			ip: "",
		},
		validate: {
			ip: (value) =>
				validateInput(value, {
					required: true,
					mustBeIP: true,
				}),
			connection: (value) => validateInput(value?.value, { required: true }),
		},
		onValuesChange: (values) => {
			props.onChange(values);
		},
	});

	const getConnectionsQuery = useGetConnections();

	return (
		<form>
			<Flex gap={"sm"} direction={"column"} pos={"relative"}>
				<LoadingOverlay visible={getConnectionsQuery.isFetching} />
				<TextInput
					placeholder={"e.g.1.1.1.1"}
					classNames={{
						input: "bg-white",
					}}
					label={"IP"}
					{...form.getInputProps("ip")}
				/>
				<Select
					placeholder={"Search & Pick"}
					classNames={{
						input: "bg-white",
					}}
					allowDeselect={false}
					data={
						getConnectionsQuery.data?.data.results.map((item) => ({ label: item.name, value: item.id })) || []
					}
					required
					label={"Connection"}
					{...form.getInputProps("connection")}
				/>
				<Button
					w={150}
					disabled={!form.values.connection}
					onClick={() => {
						console.log("on Test Connection");
					}}
				>
					Test Connection
				</Button>
			</Flex>
		</form>
	);
}
