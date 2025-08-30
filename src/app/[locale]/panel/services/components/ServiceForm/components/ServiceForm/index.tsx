import { Box, Button, Card, FileInput, Flex, Grid, Input, Select } from "@mantine/core";
import { NumberInput, Switch, Tooltip } from "@mantine/core";
import { ActionIcon, ColorInput, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconFileAi, IconPhotoScan, IconPlus, IconTrash } from "@tabler/icons-react";
import { v4 } from "uuid";

import ServiceSingleCard from "../../../ServiceCard";

// const data = [
//   { value: "eur", label: "🇪🇺 EUR" },
//   { value: "usd", label: "🇺🇸 USD" },
//   { value: "cad", label: "🇨🇦 CAD" },
//   { value: "gbp", label: "🇬🇧 GBP" },
//   { value: "aud", label: "🇦🇺 AUD" },
// ];
// const select = (
//   <NativeSelect
//     data={data}
//     rightSectionWidth={28}
//     styles={{
//       input: {
//         fontWeight: 500,
//         borderTopLeftRadius: 0,
//         borderBottomLeftRadius: 0,
//         width: 92,
//         marginRight: -2,
//       },
//     }}
//   />
// );

export function CurrencyInput() {
	return <TextInput type="number" placeholder="1000" label="Transfer amount" />;
}

const { Label } = Input;
type Props = {
	refetchList: VoidFunction;
	onClose: VoidFunction;
	opened: boolean;
};

const defaultNameFields = { name: "", description: "", lang: "de", key: v4() };

export default function ServiceForm(props: Props) {
	const form = useForm({
		initialValues: {
			activation: true,
			color: "",
			imgFile: File,
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
			<Box p={"lg"}>
				<Grid pt={"lg"}>
					<Grid.Col span={{ md: 6 }} pos={"relative"}>
						<Box pos={"absolute"} top={0} right={10}>
							<Switch
								style={{ zIndex: 9 }}
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
							imgSrc=""
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
										suffix="  $"
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
										suffix="  $"
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
										suffix="  $"
										thousandSeparator=","
										key={form.key("juniorPrice")}
										{...form.getInputProps("juniorPrice")}
										// rightSection={select}
										// rightSectionWidth={90}
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
						<FileInput
							withAsterisk
							label="Service Image"
							description="Upload accepted image ( jpeg,png )"
							placeholder="Upload service image"
							rightSection={<IconPhotoScan size={18} stroke={1.5} />}
							rightSectionPointerEvents="none"
							accept="image/png,image/jpeg"
							key={form.key("imgFile")}
							{...form.getInputProps("imgFile")}
						/>
					</Grid.Col>
					<Grid.Col span={{ md: 12 }}>
						{fields}
						<Flex align={"center"} mt={"sm"}>
							<Button
								variant="transparent"
								leftSection={<IconPlus size={15} />}
								onClick={() => form.insertListItem("translations", { ...defaultNameFields, lang: "" })}
								disabled={fields?.length === 2}
							>
								Add translations
							</Button>
							<Tooltip label="Complete first language section with English">
								<Button variant="transparent" leftSection={<IconFileAi size={15} />}>
									Complete translations with AI
								</Button>
							</Tooltip>
						</Flex>
					</Grid.Col>
				</Grid>
				<Flex gap="xs" align={"center"} justify={"flex-end"} w={"100%"}>
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
			</Box>
		</form>
	);
}
