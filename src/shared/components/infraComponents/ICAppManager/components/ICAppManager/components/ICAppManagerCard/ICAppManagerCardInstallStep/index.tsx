import ICAppManagerCardInstalledBadge from "@/shared/components/infraComponents/ICAppManager/components/ICAppManager/components/ICAppManagerCard/ICAppManagerCardInstalledBadge";
import { Flex, Overlay, Progress, Text } from "@mantine/core";
import type { ICAppManagerInstallingStep } from "../../../../../index.types";
import classes from "./index.module.css";

type Props = {
	installingSteps: ICAppManagerInstallingStep[];
	name: string;
};

export default function ICAppManagerCardInstallStep(props: Props) {
	const calculateProgressPercent = (value: number, steps: number) => {
		return (value / steps) * 100;
	};
	const activeSteps = props.installingSteps?.findIndex((item) => item.active) || 0;

	return (
		<Overlay
			w="100%"
			style={{ inset: 0 }}
			p={25}
			h={159}
			color="#E1E2F0"
			backgroundOpacity={0.6}
			blur={8}
			className={classes.InstallStepRoot}
		>
			<Flex justify="center" align="center" gap={15} direction="column">
				<ICAppManagerCardInstalledBadge large={true} />
				<Text fw={600} size="sm" c="#41454D" className={classes.installStepText}>
					{calculateProgressPercent(activeSteps + 1, props.installingSteps.length) === 100
						? `${props?.name || "..."} - Installed `
						: `${props?.name || "..."} - Install `}
					{activeSteps > -1 &&
					calculateProgressPercent(activeSteps + 1, props?.installingSteps.length) !== 100
						? `${props.installingSteps[activeSteps].name}`
						: ""}
				</Text>
				<Progress
					w="30%"
					color={
						calculateProgressPercent(activeSteps + 1, props.installingSteps.length) === 100
							? "green"
							: "#424466"
					}
					value={calculateProgressPercent(activeSteps + 1, props.installingSteps.length)}
					size="md"
					radius="md"
					classNames={{ root: classes.progress }}
				/>
			</Flex>
		</Overlay>
	);
}
