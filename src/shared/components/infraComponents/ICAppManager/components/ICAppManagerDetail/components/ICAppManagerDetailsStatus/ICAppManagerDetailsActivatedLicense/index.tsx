import { Flex, Highlight, Text } from "@mantine/core";
import { IconCalendarStats, IconCircleCheck } from "@tabler/icons-react";
import { ICAppManagerBusinessTypeEnum } from "../../../../../index.types";
import classes from "./index.module.css";

type Props = {
	expireDate: string;
	activationCode: string;
	pluginType: ICAppManagerBusinessTypeEnum;
};

export default function ICAppManagerDetailsActivatedLicense(props: Props) {
	return (
		<Flex gap={15}>
			<Flex
				h={42}
				bg="#08875D"
				justify="center"
				align="center"
				className={classes.activeBtn}
				px={16}
				py={8}
			>
				<Text fw={400} size="md" c="#FAFAFA">
					Active
				</Text>
			</Flex>
			<Flex
				p={8}
				w="fit-content"
				h="fit-content"
				justify="center"
				align="center"
				gap={6}
				className={classes.cardBox}
			>
				<IconCalendarStats size={24} className={classes.icon} />
				<Highlight
					highlightStyles={{
						fontWeight: "bold",
						background: "transparent",
						margin: "0 4px",
						color: "#41454D",
					}}
					highlight={[props?.expireDate as string]}
				>
					{props?.pluginType === ICAppManagerBusinessTypeEnum.COMMERCIAL
						? `Expires on: ${props?.expireDate}`
						: `Valid until: ${props?.expireDate}`}
				</Highlight>
			</Flex>
			<Flex
				p={8}
				w="fit-content"
				h="fit-content"
				justify="center"
				align="center"
				gap={6}
				className={classes.cardBox}
			>
				<IconCircleCheck size={24} className={classes.icon} />
				<Highlight
					highlightStyles={{
						fontWeight: "bold",
						background: "transparent",
						margin: "0 4px",
						color: "#41454D",
					}}
					highlight={[props?.activationCode as string]}
				>
					{`Activation Code: ${props?.activationCode}`}
				</Highlight>
			</Flex>
		</Flex>
	);
}
