import { Box } from "@mantine/core";

type Props = {
	index: number;
	rowHeight: number;
};

export default function BCCalendarTimeCellLine(props: Props) {
	return (
		<Box
			key={`hour-line-${props.index}`}
			pos={"absolute"}
			left={0}
			right={0}
			top={props.index * props.rowHeight - 1}
			h={0}
			p={0}
			m={0}
			style={{
				top: props.index * props.rowHeight - 1,
				borderTop: "2px dashed var(--mantine-color-gray-3)",
				opacity: 0.6,
			}}
		/>
	);
}
