import { ActionIcon, Button, Card, Flex, Grid, Select, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconPlus, IconTrash } from "@tabler/icons-react";

import BCModal from "@/shared/components/baseComponents/BCModal";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";

type Props = {
	refetchList: VoidFunction;
	onClose: VoidFunction;
	opened: boolean;
};

function AssignService(props: Props) {
	const { isMd } = useBreakpoint();
	const form = useForm({
		initialValues: {
			employees: [{ name: "", active: false, key: randomId() }],
		},
	});

	const fields = form.getValues().employees.map((item, index, array) => (
		<Grid key={item.key}>
			<Grid.Col span={{ md: 4 }}>
				<Select
					withAsterisk
					label={isMd ? (index ? "" : "Service name") : "Service name"}
					placeholder="Select Service name"
					data={["Service name"]}
				/>
			</Grid.Col>
			<Grid.Col span={{ md: 5 }}>
				<Select
					withAsterisk
					label={isMd ? (index ? "" : "Gride") : "Gride"}
					placeholder="Select Gride"
					data={["Gride name"]}
				/>
			</Grid.Col>
			<Grid.Col span={{ md: 3 }}>
				<Flex
					gap={"xs"}
					align={"center"}
					pt={isMd ? (index ? "5px" : "28px") : "2xs"}
					justify={isMd ? "" : "end"}
				>
					<Switch
						label="Active"
						key={form.key(`employees.${index}.active`)}
						{...form.getInputProps(`employees.${index}.active`, { type: "checkbox" })}
					/>
					<ActionIcon
						color="red"
						onClick={() => form.removeListItem("employees", index)}
						disabled={array?.length === 1}
					>
						<IconTrash size={15} />
					</ActionIcon>
				</Flex>
			</Grid.Col>
		</Grid>
	));

	return (
		<Flex direction={"column"}>
			<Flex
				direction={"column"}
				gap={"md"}
				styles={({ colors, spacing, radius }) => ({
					root: {
						borderRadius: radius.md,
						margin: spacing.sm,
						padding: spacing.sm,
						border: `1px dashed ${colors.primary[1]}`,
					},
				})}
			>
				{/* fields */}
				{fields}
				{/* fields */}
				<Flex>
					<Button
						leftSection={<IconPlus size={15} />}
						variant="transparent"
						onClick={() => form.insertListItem("employees", { name: "", active: false, key: randomId() })}
					>
						Add new service
					</Button>
				</Flex>
			</Flex>
			<Card m={0} p={0}>
				<Flex px="sm" py="xs" gap="sm" justify="flex-end">
					<Button
						// loading={loading}
						type="submit"
					>
						Save
					</Button>
					<Button
						data-testid="create-profiling-cancel"
						onClick={props.onClose}
						variant="default"
						// disabled={loading}
						type="reset"
					>
						Cancel
					</Button>
				</Flex>
			</Card>
		</Flex>
	);
}

export default function AssignServiceModal(props: Props) {
	const { isMd } = useBreakpoint();
	return (
		<BCModal
			size={isMd ? "50%" : "100%"}
			centered
			closeOnClickOutside={false}
			onClose={props.onClose}
			opened={props.opened}
			title="Assign Service"
			withinPortal
		>
			<AssignService {...props} />
		</BCModal>
	);
}
