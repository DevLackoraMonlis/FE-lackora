import type { LabelValueType } from "@/shared/lib/general-types";
import { Grid, Text } from "@mantine/core";

type Props = LabelValueType;

export default function ConnectionLabelValue(props: Props) {
	return (
		<Grid>
			<Grid.Col span={6}>
				<Text fz={"sm"} fw={"bold"}>
					{`${props.label}:`}
				</Text>
			</Grid.Col>
			<Grid.Col span={6}>
				<Text fz={"sm"}>{props.value}</Text>
			</Grid.Col>
		</Grid>
	);
}
