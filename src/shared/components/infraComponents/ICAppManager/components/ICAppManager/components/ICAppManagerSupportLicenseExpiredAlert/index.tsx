import { Alert, Button } from "@mantine/core";
import { IconInfoCircleFilled } from "@tabler/icons-react";
import type { ICAppManagerProps } from "../../../../index.types";
import classes from "./index.module.css";

type Props = {
	onGotoLicenseManagement: ICAppManagerProps["onGotoLicenseManagement"];
};

export default function ICAppManagerSupportLicenseExpiredAlert(props: Props) {
	return (
		<Alert
			variant="light"
			p={16}
			classNames={{
				root: classes.alertRoot,
				icon: classes.iconRoot,
				wrapper: classes.wrapperRoot,
			}}
			icon={<IconInfoCircleFilled color="#BA2532" size={20} />}
		>
			<div className={classes.textRoot}>
				<p className={classes.alertText}>
					Your support license has expired!
					<span className={classes.alertDescriptionText}>
						which means you cannot activate or use free plugins. However, you
						can still activate and use commercial plugins. To restore access to
						all plugin activations, please renew your support license. For help
						with renewal or any questions, contact our support team.
					</span>
				</p>
				<Button
					onClick={props.onGotoLicenseManagement}
					className={classes.goLicense}
				>
					Go to license management
				</Button>
			</div>
		</Alert>
	);
}
