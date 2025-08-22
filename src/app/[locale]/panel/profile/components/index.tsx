"use client";

import { Avatar, PasswordInput, ScrollArea, TextInput, Textarea } from "@mantine/core";
import { Button, Card, Divider, Flex, Grid, Group, Select, Text } from "@mantine/core";
import { IconAt, IconHomeStar, IconId, IconPasswordUser, IconPhoneCall } from "@tabler/icons-react";

import { useForm } from "@mantine/form";
import { useViewportSize } from "@mantine/hooks";

const avatarStyles = {
	image: {
		color: "var(--mantine-color-primary)",
	},
	placeholder: {
		color: "var(--mantine-color-primary-2)",
	},
};

export default function Profile() {
	const { height } = useViewportSize();

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			username: "",
			password: "",
			name: "",
			email: "",
			website: "",
			github: "",
		},

		// validate: (values) => {
		//   if (active === 0) {
		//     return {
		//       username: values.username.trim().length < 6 ? "Username must include at least 6 characters" : null,
		//       password: values.password.length < 6 ? "Password must include at least 6 characters" : null,
		//     };
		//   }

		//   if (active === 1) {
		//     return {
		//       name: values.name.trim().length < 2 ? "Name must include at least 2 characters" : null,
		//       email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
		//     };
		//   }

		//   return {};
		// },
	});
	return (
		<>
			<Grid p={"lg"}>
				<Grid.Col span={{ md: 4 }}>
					<Card
						styles={({ colors, spacing, radius, shadows }) => ({
							root: {
								boxShadow: shadows.md,
								borderRadius: radius.md,
								padding: spacing.sm,
								border: `1px dashed ${colors.primary[1]}`,
							},
						})}
					>
						<Group wrap="nowrap">
							<Avatar src="" size={94} radius="md" styles={avatarStyles} />
							<div>
								<Text fz="xs" tt="uppercase" fw={700} c="dimmed">
									Admin
								</Text>

								<Text fz="lg" fw={500}>
									Robert Glassbreaker
								</Text>

								<Group wrap="nowrap" gap={10} mt={3}>
									<IconAt stroke={1.5} size={16} />
									<Text fz="xs" c="dimmed">
										robert@glassbreaker.io
									</Text>
								</Group>

								<Group wrap="nowrap" gap={10} mt={5}>
									<IconPhoneCall stroke={1.5} size={16} />
									<Text fz="xs" c="dimmed">
										+11 (876) 890 56 23
									</Text>
								</Group>
							</div>
						</Group>
					</Card>
				</Grid.Col>
				<Grid.Col span={{ md: 8 }}>
					<Card
						styles={({ colors, spacing, radius, shadows }) => ({
							root: {
								boxShadow: shadows.md,
								borderRadius: radius.md,
								padding: spacing.sm,
								border: `1px dashed ${colors.primary[1]}`,
							},
						})}
					>
						<ScrollArea h={height - 150} offsetScrollbars type="never">
							<Flex direction={"column"} gap={"sm"}>
								<Divider
									labelPosition="left"
									label={
										<Flex align={"center"} gap={"xs"}>
											<IconPasswordUser size={20} />
											<Text>Account information</Text>
										</Flex>
									}
								/>
								<Grid>
									<Grid.Col span={{ md: 6 }}>
										<TextInput
											withAsterisk
											label="Username"
											placeholder="Username"
											key={form.key("username")}
											{...form.getInputProps("username")}
										/>
									</Grid.Col>
									<Grid.Col span={{ md: 6 }}>
										<PasswordInput
											withAsterisk
											label="Password"
											placeholder="Password"
											key={form.key("password")}
											{...form.getInputProps("password")}
										/>
									</Grid.Col>
									<Grid.Col span={{ md: 6 }}>
										<Select
											withAsterisk
											label="Branch name"
											placeholder="Select branch name"
											data={["Branch name"]}
										/>
									</Grid.Col>
									<Grid.Col span={{ md: 6 }}>
										<Select
											withAsterisk
											label="Job title"
											placeholder="Select job title"
											data={["Job title"]}
										/>
									</Grid.Col>
								</Grid>
								<Divider
									mt={"xs"}
									labelPosition="left"
									label={
										<Flex align={"center"} gap={"xs"}>
											<IconId size={20} />
											<Text>Personal information</Text>
										</Flex>
									}
								/>
								<Grid>
									<Grid.Col span={{ md: 6 }}>
										<TextInput
											withAsterisk
											label="First name"
											placeholder="First name"
											key={form.key("firstName")}
											{...form.getInputProps("firstName")}
										/>
									</Grid.Col>
									<Grid.Col span={{ md: 6 }}>
										<TextInput
											withAsterisk
											label="Last name"
											placeholder="Last name"
											key={form.key("lastName")}
											{...form.getInputProps("lastName")}
										/>
									</Grid.Col>
									<Grid.Col span={{ md: 4 }}>
										<TextInput
											withAsterisk
											label="National ID"
											placeholder="National ID"
											key={form.key("nationalId")}
											{...form.getInputProps("nationalId")}
										/>
									</Grid.Col>
									<Grid.Col span={{ md: 4 }}>
										<TextInput
											withAsterisk
											label="Phone number"
											placeholder="Phone number"
											key={form.key("phoneNumber")}
											{...form.getInputProps("phoneNumber")}
										/>
									</Grid.Col>
									<Grid.Col span={{ md: 4 }}>
										<TextInput
											withAsterisk
											label="Email"
											placeholder="Email"
											key={form.key("email")}
											{...form.getInputProps("email")}
										/>
									</Grid.Col>
								</Grid>
								<Divider
									mt={"xs"}
									labelPosition="left"
									label={
										<Flex align={"center"} gap={"xs"}>
											<IconHomeStar size={20} />
											<Text>Address information</Text>
										</Flex>
									}
								/>
								<Grid>
									<Grid.Col span={{ md: 4 }}>
										<Select
											withAsterisk
											label="Country"
											placeholder="Select Country"
											data={["Country"]}
											searchable
										/>
									</Grid.Col>
									<Grid.Col span={{ md: 4 }}>
										<Select
											withAsterisk
											label="State"
											placeholder="Select State"
											data={["State"]}
											searchable
										/>
									</Grid.Col>
									<Grid.Col span={{ md: 4 }}>
										<Select withAsterisk label="City" placeholder="Select City" data={["City"]} searchable />
									</Grid.Col>
									<Grid.Col span={{ md: 4 }}>
										<TextInput
											withAsterisk
											label="Zip code"
											placeholder="Zip code"
											key={form.key("zipCode")}
											{...form.getInputProps("zipCode")}
										/>
									</Grid.Col>
									<Grid.Col span={{ md: 8 }}>
										<Textarea
											label="Address"
											placeholder="Address"
											key={form.key("address")}
											{...form.getInputProps("address")}
										/>
									</Grid.Col>
								</Grid>
							</Flex>
						</ScrollArea>
						<Group
							justify="flex-end"
							gap={"xs"}
							pt={"xs"}
							styles={({ colors }) => ({
								root: {
									borderTop: `1px dotted ${colors.primary[1]}`,
								},
							})}
						>
							<Button variant="default">Cancel</Button>
							<Button>Save</Button>
						</Group>
					</Card>
				</Grid.Col>
			</Grid>
		</>
	);
}
