import { toFormattedDate } from "@/shared/lib/dayJs";
import { Button, Flex, Text } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import classes from "./index.module.css";

type Props = {
	type: string;
	expireDate: string;
	hasConfig: boolean;
};
export default function ICAppManagerCardActivatedApp(props: Props) {
	return (
		<Flex gap={8} align="center">
			<Flex gap={4}>
				<Flex w={50} h={32} bg="#08875D" justify="center" align="center" className={classes.activeRoot}>
					<Text fw={400} fz={12} c="#FAFAFA">
						Active
					</Text>
				</Flex>
				<Flex w={142} h={32} bg="#E1E2F0" justify="center" align="center" className={classes.validRoot}>
					<Text fw={400} fz={12} c="#41454D">
						Expires on: {toFormattedDate(props.expireDate)}
					</Text>
				</Flex>
			</Flex>
			<Text fw={400} fz={14} c="#41454D">
				{props.type}
			</Text>
			{props.hasConfig && (
				<Button w={32} h={32} variant="outline" p={0} classNames={{ root: classes.activeButtonRoot }}>
					<IconSettings color="#121721" size={32} />
				</Button>
			)}
		</Flex>
	);
}
