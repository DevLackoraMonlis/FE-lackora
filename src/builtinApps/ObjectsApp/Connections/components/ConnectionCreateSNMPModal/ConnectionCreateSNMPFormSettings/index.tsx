import ConnectionCreateFormSections from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateFormSections";
import { useCreateConnectionSNMPFormContext } from "@/builtinApps/ObjectsApp/Connections/components/ConnectionCreateSNMPModal/index.form";
import {
	CreateConnectionSNMPAuthenticationProtocolType,
	CreateConnectionSNMPPrivacyProtocolType,
	CreateConnectionSNMPSecurityLdLevelType,
	CreateConnectionSNMPVersionType,
} from "@/builtinApps/ObjectsApp/Connections/index.enum";
import {
	Flex,
	Grid,
	Group,
	NumberInput,
	PasswordInput,
	Radio,
	RadioGroup,
	Select,
	TextInput,
	Textarea,
} from "@mantine/core";
import { Fragment } from "react";

export default function ConnectionCreateSNMPFormSettings() {
	const form = useCreateConnectionSNMPFormContext();

	const userInput = (
		<TextInput
			w={"100%"}
			key={"user"}
			required={form.values.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3}
			label={"User"}
			{...form.getInputProps("user")}
		/>
	);
	const passwordInput = (
		<PasswordInput
			w={"100%"}
			key={"password"}
			required={
				form.values.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 &&
				(form.values.securityLevel === CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_ONLY ||
					form.values.securityLevel === CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_PRIVACY)
			}
			label={"Password"}
			{...form.getInputProps("password")}
		/>
	);
	const authenticationProtocolInput = (
		<Select
			key={"authenticationProtocol"}
			data={Object.values(CreateConnectionSNMPAuthenticationProtocolType).map((value) => ({
				label: value,
				value,
			}))}
			allowDeselect={false}
			defaultValue={CreateConnectionSNMPAuthenticationProtocolType.MD5}
			w={"100%"}
			required={
				form.values.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 &&
				(form.values.securityLevel === CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_ONLY ||
					form.values.securityLevel === CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_PRIVACY)
			}
			label={"Authentication Protocol"}
			{...form.getInputProps("authenticationProtocol")}
		/>
	);

	return (
		<ConnectionCreateFormSections
			generalInfoSection={
				<Flex gap={"xs"} direction={"column"} p={"lg"}>
					<TextInput
						autoComplete={"new-password"}
						key={"name"}
						required
						label={"Connection Name"}
						{...form.getInputProps("name")}
					/>
					<Textarea
						rows={3}
						key={"description"}
						placeholder={"Summary about connection"}
						label={"Description"}
						{...form.getInputProps("description")}
					/>
				</Flex>
			}
			connectionSettingSection={
				<Flex direction={"column"} gap={"xs"}>
					<Grid align={"center"}>
						<Grid.Col span={6}>
							<NumberInput
								key={"snmpPort"}
								w={"100%"}
								hideControls
								allowDecimal={false}
								allowNegative={false}
								allowLeadingZeros={false}
								required
								min={1}
								max={65535}
								label={"SNMP Port"}
								{...form.getInputProps("snmpPort")}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<RadioGroup
								key={"snmpVersion"}
								w={"100%"}
								{...form.getInputProps("snmpVersion")}
								label={"SNMP Version"}
							>
								<Group mt="xs">
									<Radio
										label={CreateConnectionSNMPVersionType.SNMP_V_2_C}
										value={CreateConnectionSNMPVersionType.SNMP_V_2_C}
									/>
									<Radio
										label={CreateConnectionSNMPVersionType.SNMP_V_3}
										value={CreateConnectionSNMPVersionType.SNMP_V_3}
									/>
								</Group>
							</RadioGroup>
						</Grid.Col>
					</Grid>

					<TextInput
						lightHidden={form.values.snmpVersion !== CreateConnectionSNMPVersionType.SNMP_V_2_C}
						darkHidden={form.values.snmpVersion !== CreateConnectionSNMPVersionType.SNMP_V_2_C}
						key={"Community"}
						required={form.values.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_2_C}
						w={"100%"}
						placeholder={"Enter Community"}
						label={"Community"}
						{...form.getInputProps("community")}
					/>

					<Flex
						direction={"column"}
						gap={"sm"}
						lightHidden={form.values.snmpVersion !== CreateConnectionSNMPVersionType.SNMP_V_3}
						darkHidden={form.values.snmpVersion !== CreateConnectionSNMPVersionType.SNMP_V_3}
					>
						<Grid>
							<Grid.Col span={12}>
								<RadioGroup {...form.getInputProps("securityLevel")} label={"Security Level"}>
									<Group mt="xs">
										<Radio
											label={CreateConnectionSNMPSecurityLdLevelType.NO_SECURITY}
											value={CreateConnectionSNMPSecurityLdLevelType.NO_SECURITY}
										/>
										<Radio
											label={CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_ONLY}
											value={CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_ONLY}
										/>
										<Radio
											label={CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_PRIVACY}
											value={CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_PRIVACY}
										/>
									</Group>
								</RadioGroup>
							</Grid.Col>

							{form.values.securityLevel === CreateConnectionSNMPSecurityLdLevelType.NO_SECURITY && (
								<Grid.Col span={6}>{userInput}</Grid.Col>
							)}
							{form.values.securityLevel === CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_ONLY && (
								<Fragment>
									<Grid.Col span={4}>{userInput}</Grid.Col>
									<Grid.Col span={4}>{passwordInput}</Grid.Col>
									<Grid.Col span={4}>{authenticationProtocolInput}</Grid.Col>
								</Fragment>
							)}
							{form.values.securityLevel ===
								CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_PRIVACY && (
								<Fragment>
									<Grid.Col span={4}>{userInput}</Grid.Col>
									<Grid.Col span={4}>{passwordInput}</Grid.Col>
									<Grid.Col span={4}>{authenticationProtocolInput}</Grid.Col>
									<Grid.Col span={6}>
										<Select
											data={Object.values(CreateConnectionSNMPPrivacyProtocolType).map((value) => ({
												label: value,
												value,
											}))}
											allowDeselect={false}
											defaultValue={CreateConnectionSNMPPrivacyProtocolType.AES}
											w={"100%"}
											required={
												form.values.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 &&
												form.values.securityLevel ===
													CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_PRIVACY
											}
											key={"privacyProtocol"}
											label={"Privacy Protocol"}
											{...form.getInputProps("privacyProtocol")}
										/>
									</Grid.Col>
									<Grid.Col span={6}>
										<PasswordInput
											w={"100%"}
											required={
												form.values.snmpVersion === CreateConnectionSNMPVersionType.SNMP_V_3 &&
												form.values.securityLevel ===
													CreateConnectionSNMPSecurityLdLevelType.AUTHENTICATION_PRIVACY
											}
											key={"privacyPassphrase"}
											label={"Privacy Passphrase"}
											autoComplete={"new-password"}
											{...form.getInputProps("privacyPassphrase")}
										/>
									</Grid.Col>
								</Fragment>
							)}
						</Grid>
					</Flex>
				</Flex>
			}
		/>
	);
}
