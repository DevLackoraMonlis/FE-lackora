import { Box } from "@mantine/core";
import classes from "./index.module.css";

type Props = {
	index: number;
	startHour: number;
	rowHeight: number;
};

export default function BCCalendarTimeCell(props: Props) {
	return (
		<Box h={props.rowHeight} className={classes.timeCell}>
			{String(props.startHour + props.index).padStart(2, "0")}:00
		</Box>
	);
}
