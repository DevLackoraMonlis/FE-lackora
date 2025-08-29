import { Box, Button, Card, Flex, Grid, Input, NumberInput, Select, Switch } from "@mantine/core";
import { ActionIcon, ColorInput, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { v4 } from "uuid";

import BCModal from "@/shared/components/baseComponents/BCModal";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";

import { SERVICE_ICONS } from "../../lib/index.constants";
import ServiceSingleCard from "../ServiceCard";
import ServiceIcons from "../ServiceIcons";

const { Label } = Input;
type Props = {
	refetchList: VoidFunction;
	onClose: VoidFunction;
	opened: boolean;
};

const defaultNameFields = { name: "", description: "", lang: "de", key: v4() };

function ServiceForm(props: Props) {
	const form = useForm({
		initialValues: {
			activation: true,
			color: "",
			iconType: "",
			translations: [defaultNameFields],
		},
	});

	const fields = form.getValues().translations.map(({ key }, index, array) => (
		<Card key={key} bd="1px dashed primary" mt={index ? "xs" : ""}>
			<Grid>
				<Grid.Col span={{ md: 4 }}>
					<Select
						withAsterisk
						label="Language"
						placeholder="Select Language"
						data={[
							{ label: "Deutsch", value: "de" },
							{ label: "English", value: "en" },
						]}
						key={form.key(`translations.${index}.lang`)}
						{...form.getInputProps(`translations.${index}.lang`)}
					/>
				</Grid.Col>
				<Grid.Col span={{ md: 8 }}>
					<Flex align={"center"} gap={"xs"}>
						<TextInput
							w={"100%"}
							withAsterisk
							label="Name"
							placeholder="Service name"
							key={form.key(`translations.${index}.name`)}
							{...form.getInputProps(`translations.${index}.name`)}
						/>
						<ActionIcon
							color="red"
							onClick={() => form.removeListItem("translations", index)}
							variant="transparent"
							mt={"lg"}
							disabled={array?.length === 1}
						>
							<IconTrash size={25} />
						</ActionIcon>
					</Flex>
				</Grid.Col>
				<Grid.Col span={{ md: 12 }}>
					<Textarea
						placeholder="Description"
						key={form.key(`translations.${index}.description`)}
						{...form.getInputProps(`translations.${index}.description`)}
					/>
				</Grid.Col>
			</Grid>
		</Card>
	));

	return (
		<form onSubmit={form.onSubmit(console.log)}>
			<Flex p={"lg"} direction={"column"} gap={"xs"} align={"start"}>
				<Grid>
					<Grid.Col span={{ md: 6 }} pos={"relative"}>
						<Box pos={"absolute"} top={0} right={10}>
							<Switch
								defaultChecked
								label={"Service activation"}
								labelPosition="left"
								key={form.key("activation")}
								{...form.getInputProps("activation", { type: "checkbox" })}
							/>
						</Box>
						<ServiceSingleCard
							activation={form.values.activation}
							editable={false}
							color={form.values.color}
							description={form.values.translations?.[0].description}
							title={form.values.translations?.[0].name}
							icon={SERVICE_ICONS[form.values.iconType]}
						/>
					</Grid.Col>
					<Grid.Col span={{ md: 6 }} pos={"relative"}>
						<Label
							pos={"absolute"}
							top={-2}
							left={22}
							px={"xs"}
							styles={({ other, colors }) => ({
								label: {
									background: other.bg,
									zIndex: 2,
									borderRight: `1px dashed ${colors.primary[5]}`,
									borderLeft: `1px dashed ${colors.primary[5]}`,
								},
							})}
						>
							Service Price
						</Label>
						<Card bd="1px dashed primary" pt="lg">
							<Flex gap={"xs"} direction={"column"}>
								<Flex gap={"xs"} align={"center"}>
									<Label required style={{ flex: 1 }}>
										Top Master
									</Label>
									<NumberInput
										style={{ flex: 2 }}
										placeholder="Top master price"
										suffix="   $"
										thousandSeparator=","
										key={form.key("topMasterPrice")}
										{...form.getInputProps("topMasterPrice")}
									/>
								</Flex>
								<Flex gap={"xs"} align={"center"}>
									<Label required style={{ flex: 1 }}>
										Master
									</Label>
									<NumberInput
										style={{ flex: 2 }}
										placeholder="Master price"
										suffix="   $"
										thousandSeparator=","
										key={form.key("masterPrice")}
										{...form.getInputProps("masterPrice")}
									/>
								</Flex>
								<Flex gap={"xs"} align={"center"}>
									<Label required style={{ flex: 1 }}>
										Junior Master
									</Label>
									<NumberInput
										style={{ flex: 2 }}
										placeholder="Junior master price"
										suffix="   $"
										thousandSeparator=","
										key={form.key("juniorPrice")}
										{...form.getInputProps("juniorPrice")}
									/>
								</Flex>
							</Flex>
						</Card>
					</Grid.Col>
					<Grid.Col span={{ md: 6 }}>
						<ColorInput
							w={"100%"}
							label="Service color"
							withAsterisk
							description="Color of service to show in pages"
							placeholder="ex. #7950f2"
							key={form.key("color")}
							{...form.getInputProps("color")}
							format="hex"
							swatches={[
								"#2e2e2e",
								"#868e96",
								"#fa5252",
								"#e64980",
								"#be4bdb",
								"#7950f2",
								"#4c6ef5",
								"#228be6",
								"#15aabf",
								"#12b886",
								"#40c057",
								"#82c91e",
								"#fab005",
								"#fd7e14",
							]}
						/>
					</Grid.Col>
					<Grid.Col span={{ md: 6 }}>
						<ServiceIcons key={form.key("iconType")} {...form.getInputProps("iconType")} />
					</Grid.Col>
					<Grid.Col span={{ md: 12 }}>
						{fields}
						<Button
							mt={"sm"}
							variant="transparent"
							leftSection={<IconPlus size={15} />}
							onClick={() => form.insertListItem("translations", { ...defaultNameFields, lang: "" })}
							disabled={fields?.length === 2}
						>
							Add translations
						</Button>
						<Flex align={"center"} justify={"end"}>
							<Flex gap="xs" align={"center"}>
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
						</Flex>
					</Grid.Col>
				</Grid>
			</Flex>
		</form>
	);
}

export default function ServiceFormModal(props: Props) {
	const { isMd } = useBreakpoint();
	return (
		<BCModal
			size={isMd ? "60%" : "100%"}
			centered
			closeOnClickOutside={false}
			onClose={props.onClose}
			opened={props.opened}
			title="Add new service"
		>
			<ServiceForm {...props} />
		</BCModal>
	);
}
