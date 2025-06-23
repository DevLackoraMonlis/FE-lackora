import { Card, Skeleton, Text } from "@mantine/core";
import classes from "./index.module.css";

type Props = {
	summary: string | null;
	loading: boolean;
};

export default function ICAppManagerDetailsSummaryTab(props: Props) {
	return (
		<Card px={12} py={13} withBorder className={classes.cardBox}>
			<Skeleton visible={props.loading} height="100%" width="100%">
				<Text fw={400} size="sm" className={classes.text}>
					{props.summary}
				</Text>
			</Skeleton>
		</Card>
	);
}
