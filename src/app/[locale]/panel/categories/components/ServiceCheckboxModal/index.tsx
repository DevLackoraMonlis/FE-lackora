import { Button, Card, Checkbox, DEFAULT_THEME, Flex, Grid, Indicator, Text } from "@mantine/core";

import BCModal from "@/shared/components/baseComponents/BCModal";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";

const { colors } = DEFAULT_THEME;

type Props = {
	onClose: VoidFunction;
	opened: boolean;
};

const serviceList = [
	"Pedicure",
	"Eyebrows",
	"Eyelashes",
	"Cosmetology",
	"Waxing",
	"Sugaring",
	"Massage",
	"Daytime Makeup",
	"Permanent Makeup",
	"Laser",
	"Manicure",
	"Hair Cut",
];

function ServiceCheckbox(props: Props) {
	return (
		<Flex direction={"column"} px={"xs"}>
			<Card bd={"1px dashed primary"} py="lg">
				<Checkbox.Group
					defaultValue={["react"]}
					label="Select services"
					description="This is description of services"
				>
					<Grid mt="sm">
						{serviceList.map((service, idx) => (
							<Grid.Col key={service} span={{ md: 4 }}>
								<Checkbox
									value={service}
									label={
										<Flex gap="xs" align={"center"} pt="2px">
											<Indicator
												position="middle-start"
												processing
												color={Object.values(colors)[idx][4]}
												title="Service is Activate"
											/>
											<Text fz="xs" fw="bold">
												{service}
											</Text>
										</Flex>
									}
									color={Object.values(colors)[idx][4]}
								/>
							</Grid.Col>
						))}
					</Grid>
				</Checkbox.Group>
			</Card>
			<Flex gap="sm" justify="flex-end" py="xs">
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
	);
}

export default function ServiceCheckboxModal(props: Props) {
	const { isMd } = useBreakpoint();
	return (
		<BCModal
			size={isMd ? "50%" : "100%"}
			centered
			onClose={props.onClose}
			opened={props.opened}
			title="Edit services of Category"
		>
			<ServiceCheckbox {...props} />
		</BCModal>
	);
}
