import { Badge } from "@mantine/core";
import { IconMedicalCrossCircle } from "@tabler/icons-react";
import classes from "./index.module.css";

export default function ICAppManagerCardNewAppBadge() {
	return (
		<Badge
			circle
			color="#EC407A"
			classNames={{
				label: classes.newPluginBadgeLabel,
				root: classes.newPluginBadgeRoot,
			}}
		>
			<IconMedicalCrossCircle color="white" size={11} />
		</Badge>
	);
}
