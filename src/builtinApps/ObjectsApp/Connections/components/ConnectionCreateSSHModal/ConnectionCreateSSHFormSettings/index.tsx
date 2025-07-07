import ConnectionCreateFormSections from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateFormSections";
import {
	type CreateConnectionSSHFormValues,
	useCreateConnectionSSHFormContext,
} from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateSSHModal/index.form";
import { CreateConnectionSSHAuthenticationType } from "@/builtinApps/ObjectsApp/Connections/index.enum";
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
	Textarea,
	Tooltip,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export default function ConnectionCreateSSHFormSettings(
	props: Pick<CreateConnectionModalProps<CreateConnectionSSHFormValues>, "onTestConnection">,
) {
	const form = useCreateConnectionSSHFormContext();

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
						<RadioGroup {...form.getInputProps("authenticationType")} label={"Authentication Type"}>
							<Group mt="xs">
								<Radio
									label={CreateConnectionSSHAuthenticationType.USER_PASSWORD}
									value={CreateConnectionSSHAuthenticationType.USER_PASSWORD}
								/>
								<Radio
									label={CreateConnectionSSHAuthenticationType.PUBLIC_PRIVATE_KEY}
									value={CreateConnectionSSHAuthenticationType.PUBLIC_PRIVATE_KEY}
								/>
							</Group>
						</RadioGroup>
					</Flex>
					<Flex
						direction={"column"}
						gap={"sm"}
						lightHidden={
							form.values.authenticationType !== CreateConnectionSSHAuthenticationType.USER_PASSWORD
						}
						darkHidden={
							form.values.authenticationType !== CreateConnectionSSHAuthenticationType.USER_PASSWORD
						}
					>
						<Grid>
							<Grid.Col span={6}>
								<TextInput
									autoComplete={"new-password"}
									w={"100%"}
									required={
										form.values.authenticationType === CreateConnectionSSHAuthenticationType.USER_PASSWORD
									}
									label={"User"}
									{...form.getInputProps("username")}
								/>
							</Grid.Col>
							<Grid.Col span={6}>
								<PasswordInput
									autoComplete={"new-password"}
									w={"100%"}
									required={
										form.values.authenticationType === CreateConnectionSSHAuthenticationType.USER_PASSWORD
									}
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
										{...form.getInputProps("enablePrivilegedMode", { type: "checkbox" })}
									/>
									<Tooltip label={"Description about this section"}>
										<IconInfoCircle color={"blue"} size={14} />
									</Tooltip>
								</Flex>
							</Grid.Col>
							{form.values.enablePrivilegedMode && (
								<Grid.Col span={6}>
									<PasswordInput
										placeholder={"Privileged Password"}
										w={"100%"}
										required
										{...form.getInputProps("privilegedPassword")}
									/>
								</Grid.Col>
							)}
						</Grid>
					</Flex>
					<Flex
						direction={"column"}
						gap={"sm"}
						lightHidden={
							form.values.authenticationType !== CreateConnectionSSHAuthenticationType.PUBLIC_PRIVATE_KEY
						}
						darkHidden={
							form.values.authenticationType !== CreateConnectionSSHAuthenticationType.PUBLIC_PRIVATE_KEY
						}
					>
						<Textarea rows={3} label={"SSH Key"} {...form.getInputProps("sshKey")} />
						<PasswordInput
							required={
								form.values.authenticationType === CreateConnectionSSHAuthenticationType.PUBLIC_PRIVATE_KEY
							}
							label={"Passphrase"}
							autoComplete={"new-password"}
							{...form.getInputProps("passphrase")}
						/>
						<Grid align={"center"}>
							<Grid.Col span={6}>
								<Flex align={"center"} gap={"xs"}>
									<Checkbox
										label={"Enable privileged mode"}
										{...form.getInputProps("enablePrivilegedMode", { type: "checkbox" })}
									/>
									<Tooltip label={"Description about this section"}>
										<IconInfoCircle color={"blue"} size={14} />
									</Tooltip>
								</Flex>
							</Grid.Col>
							{form.values.enablePrivilegedMode && (
								<Grid.Col span={6}>
									<PasswordInput
										placeholder={"Privileged Password"}
										w={"100%"}
										required
										{...form.getInputProps("privilegedPassword")}
									/>
								</Grid.Col>
							)}
						</Grid>
					</Flex>

					<Button w={200} variant={"light"} onClick={() => props.onTestConnection("SSH")}>
						Test Connection
					</Button>
				</Flex>
			}
		/>
	);
}
