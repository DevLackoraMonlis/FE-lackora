import { Flex, Overlay, Progress, Text } from "@mantine/core";
import { IconAddressBook } from "@tabler/icons-react";
import type { ICAppManagerInstallingStep } from "../../../../index.types";
import classes from "./index.module.css";

type Props = {
	installingSteps: ICAppManagerInstallingStep[];
	name: string;
};

export default function ICAppManagerDetailsInstallSteps(props: Props) {
	const calculateProgressPercent = (value: number, steps: number) => {
		return (value / steps) * 100;
	};
	const activeSteps =
		(props.installingSteps.length > 0 && props.installingSteps?.filter((item) => item.active)) || [];

	return (
		<Overlay color="#000" backgroundOpacity={0.1} blur={13}>
			<Flex w="100%" h="100%" justify="center" align="center" gap={15} direction="column">
				<IconAddressBook width={52} height={52} />
				<Text fw={600} size="sm">
					{calculateProgressPercent(activeSteps?.length, props?.installingSteps.length) === 100
						? `${props?.name || "..."} - Installed `
						: `${props?.name || "..."} - Install `}
					{activeSteps.length > 0 &&
					calculateProgressPercent(activeSteps.length, props?.installingSteps.length) !== 100
						? `${activeSteps.map((item) => item.name).join(", ")}`
						: ""}
				</Text>
				<Progress
					w="30%"
					color={
						calculateProgressPercent(activeSteps.length, props?.installingSteps.length) === 100
							? "green"
							: "#424466"
					}
					value={calculateProgressPercent(activeSteps.length, props?.installingSteps.length)}
					size="md"
					radius="md"
					classNames={{ root: classes.progress }}
				/>
			</Flex>
		</Overlay>
	);
}
