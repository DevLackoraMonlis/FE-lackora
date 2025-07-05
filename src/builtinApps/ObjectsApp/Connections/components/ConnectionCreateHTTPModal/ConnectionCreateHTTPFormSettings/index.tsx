import ConnectionCreateFormSections from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateFormSections";
import {
	type CreateConnectionHTTPFormValues,
	useCreateConnectionHTTPFormContext,
} from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateHTTPModal/index.form";
import { CreateConnectionHTTPProtocolType } from "@/builtinApps/ObjectsApp/Connections/index.enum";
import type { CreateConnectionModalProps } from "@/builtinApps/ObjectsApp/Connections/index.types";
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
} from "@mantine/core";

export default function ConnectionCreateHTTPFormSettings(
	props: Pick<CreateConnectionModalProps<CreateConnectionHTTPFormValues>, "onTestConnection">,
) {
	const form = useCreateConnectionHTTPFormContext();

	return (
		<ConnectionCreateFormSections
			connectionNameInputProps={{
				...form.getInputProps("name"),
			}}
			connectionDescriptionInputProps={{
				...form.getInputProps("description"),
			}}
			connectionSettingSection={
				<Flex direction={"column"} gap={"xs"}>
					<Grid align={"center"}>
						<Grid.Col span={12}>
							<TextInput
								key={"baseUri"}
								w={"100%"}
								required
								label={"Base URI"}
								{...form.getInputProps("baseUri")}
							/>
						</Grid.Col>
						<Grid.Col span={4}>
							<RadioGroup
								key={"protocol"}
								w={"100%"}
								defaultValue={CreateConnectionHTTPProtocolType.HTTP}
								{...form.getInputProps("protocol", { type: "checkbox" })}
								label={"Protocol"}
							>
								<Group mt="xs">
									<Radio
										label={CreateConnectionHTTPProtocolType.HTTP}
										value={CreateConnectionHTTPProtocolType.HTTP}
									/>
									<Radio
										label={CreateConnectionHTTPProtocolType.HTTPS}
										value={CreateConnectionHTTPProtocolType.HTTPS}
									/>
								</Group>
							</RadioGroup>
						</Grid.Col>
						<Grid.Col span={8}>
							<NumberInput
								key={"port"}
								w={"100%"}
								hideControls
								allowDecimal={false}
								allowNegative={false}
								allowLeadingZeros={false}
								required
								label={"Port"}
								{...form.getInputProps("port")}
							/>
						</Grid.Col>
					</Grid>
					<Grid align={"center"}>
						<Grid.Col span={4}>
							<Checkbox
								key={"authenticationRequired"}
								w={"100%"}
								styles={{
									label: {
										fontSize: 12,
									},
								}}
								label={"Authentication Required"}
								{...form.getInputProps("authenticationRequired", { type: "checkbox" })}
							/>
						</Grid.Col>
						<Grid.Col span={4}>
							<TextInput
								disabled={!form.values.authenticationRequired}
								w={"100%"}
								key={"user"}
								required
								placeholder={"Username"}
								{...form.getInputProps("username")}
							/>
						</Grid.Col>
						<Grid.Col span={4}>
							<PasswordInput
								placeholder={"Password"}
								disabled={!form.values.authenticationRequired}
								w={"100%"}
								key={"password"}
								required
								{...form.getInputProps("password")}
							/>
						</Grid.Col>
					</Grid>
					<Button w={200} variant={"light"} onClick={() => props.onTestConnection("SSH")}>
						Test Connection
					</Button>
				</Flex>
			}
		/>
	);
}
