import { Flex, Tooltip, useMantineColorScheme } from "@mantine/core";
import { IconInbox, IconNewSection } from "@tabler/icons-react";
import type { ReactNode } from "react";
import classes from "./index.module.css";

type Props = {
	color?: string;
	icon: ReactNode;
	isNew?: boolean;
	isInstalled?: boolean;
	badgeIconSize?: number;
	wrapperSize?: number;
};

export default function ICAppManagerIconWrapper(props: Props) {
	const { icon, color } = props;
	const { colorScheme } = useMantineColorScheme();

	return (
		<Flex
			w={props.wrapperSize || "fit-content"}
			h={props.wrapperSize || "fit-content"}
			justify="center"
			align="center"
			gap={6}
			className={classes.iconCard}
			style={(theme) => ({
				backgroundColor: props.color
					? colorScheme === "dark"
						? theme.colors[color as string][6]
						: theme.colors[color as string][0]
					: colorScheme === "dark"
						? "#FFF"
						: "##11121F",
				borderRadius: "4px",
				border: !color
					? `1px solid ${colorScheme === "dark" ? theme.colors.gray[7] : theme.colors.gray[2]}`
					: undefined,
			})}
		>
			{props?.isNew && (
				<Flex w={props.badgeIconSize || 16} h={props.badgeIconSize || 16} className={classes.newBadge}>
					<Tooltip
						withinPortal
						arrowOffset={15}
						arrowSize={7}
						label="New Plugin"
						px={8}
						h={31}
						withArrow
						events={{ hover: true, focus: true, touch: true }}
						position="right"
					>
						<IconNewSection width="fit-content" height="fit-content" />
					</Tooltip>
				</Flex>
			)}
			{props?.isInstalled && (
				<Flex w={props.badgeIconSize || 16} h={props.badgeIconSize || 16} className={classes.installBadge}>
					<Tooltip
						arrowOffset={15}
						arrowSize={7}
						label="Installed Plugin"
						px={8}
						h={31}
						withArrow
						events={{ hover: true, focus: true, touch: true }}
						position="right"
					>
						<IconInbox width="fit-content" height="fit-content" />
					</Tooltip>
				</Flex>
			)}
			{icon}
		</Flex>
	);
}
