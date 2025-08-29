import { Button, Code, Flex, Grid, Group, Stepper } from "@mantine/core";
import { PasswordInput, Select, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

import BCModal from "@/shared/components/baseComponents/BCModal";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";

type Props = {
	refetchList: VoidFunction;
	onClose: VoidFunction;
	opened: boolean;
};

function AddPersonnel(_props: Props) {
	const [active, setActive] = useState(0);

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

	const nextStep = () =>
		setActive((current) => {
			if (form.validate().hasErrors) {
				return current;
			}
			return current < 3 ? current + 1 : current;
		});

	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
	return (
		<form onSubmit={form.onSubmit(console.log)}>
			<Flex p={"md"} direction={"column"} gap={"sm"}>
				<Stepper
					active={active}
					styles={({ colors, spacing, radius }) => ({
						content: {
							borderRadius: radius.md,
							marginTop: spacing.md,
							padding: spacing.sm,
							border: `1px dashed ${colors.primary[1]}`,
						},
					})}
				>
					<Stepper.Step label="Account" description="Account information">
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
								<Select withAsterisk label="Job title" placeholder="Select job title" data={["Job title"]} />
							</Grid.Col>
						</Grid>
					</Stepper.Step>

					<Stepper.Step label="Profile" description="Personal information">
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
							<Grid.Col span={{ md: 6 }}>
								<TextInput
									withAsterisk
									label="National ID"
									placeholder="National ID"
									key={form.key("nationalId")}
									{...form.getInputProps("nationalId")}
								/>
							</Grid.Col>
							<Grid.Col span={{ md: 6 }}>
								<TextInput
									withAsterisk
									label="Phone number"
									placeholder="Phone number"
									key={form.key("phoneNumber")}
									{...form.getInputProps("phoneNumber")}
								/>
							</Grid.Col>
							<Grid.Col>
								<TextInput
									withAsterisk
									label="Email"
									placeholder="Email"
									key={form.key("email")}
									{...form.getInputProps("email")}
								/>
							</Grid.Col>
						</Grid>
					</Stepper.Step>

					<Stepper.Step label="Address" description="Address information">
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
								<Select withAsterisk label="State" placeholder="Select State" data={["State"]} searchable />
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
					</Stepper.Step>

					<Stepper.Completed>
						Completed! Form values:
						<Code block mt="xl">
							{JSON.stringify(form.getValues(), null, 2)}
						</Code>
					</Stepper.Completed>
				</Stepper>

				<Group justify="flex-end" gap={"xs"}>
					{active !== 0 && (
						<Button variant="default" onClick={prevStep}>
							Back
						</Button>
					)}
					{active !== 3 && <Button onClick={nextStep}>Next step</Button>}
					{active === 3 && (
						<Button onClick={nextStep} type="submit">
							Save
						</Button>
					)}
				</Group>
			</Flex>
		</form>
	);
}

export default function AddPersonnelModal(props: Props) {
	const { isMd } = useBreakpoint();
	return (
		<BCModal
			size={isMd ? "60%" : "100%"}
			centered
			closeOnClickOutside={false}
			onClose={props.onClose}
			opened={props.opened}
			title="Add new personnel"
		>
			<AddPersonnel {...props} />
		</BCModal>
	);
}
