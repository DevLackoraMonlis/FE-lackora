import { Badge } from "@mantine/core";
import { IconDownload, IconDownloadOff } from "@tabler/icons-react";
import classes from "./index.module.css";

type Props = {
	large?: boolean;
};

export default function ICAppManagerCardInstalledBadge(props: Props) {
	return (
		<Badge
			circle
			w={props.large ? 52 : 16}
			h={props.large ? 52 : 16}
			color={props.large ? "#424466" : "#FFFFF"}
			classNames={{
				label: props.large ? classes.LargeInstallBadgeLabel : classes.installBadgeLabel,
				root: props.large ? classes.LargeInstallBadgeRoot : classes.installBadgeRoot,
			}}
		>
			{props.large ? <IconDownload width={32} height={32} /> : <IconDownloadOff color="#424466" />}
		</Badge>
	);
}
