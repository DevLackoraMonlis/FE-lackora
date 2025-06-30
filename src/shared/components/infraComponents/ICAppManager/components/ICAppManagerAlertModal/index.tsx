import { Button, Flex, Modal, Text } from "@mantine/core";
import type { ICAppManagerAlertProps } from "../../index.types";
import classes from "./index.module.css";

export default function ICAppManagerAlertModal(props: ICAppManagerAlertProps) {
	return (
		<Modal
			centered
			size="37.5rem"
			title="Alert"
			classNames={{
				content: classes.PluginLicenseSupportAlertContent,
				body: classes.PluginLicenseSupportAlertBody,
				header: classes.alertHeader,
			}}
			opened={props.opened}
			onClose={props.onClose}
		>
			<Flex direction="column" gap="1.375rem">
				<Text c="#E02D3C" fw="800" fz="24">
					Your support license has expired
				</Text>
				<Text c="#121721" fw="400" size="sm">
					Which means you cannot activate or use free plugins. However, you can still activate and use
					commercial plugins. To restore access to all plugin activations, please renew your support license.
					For help with renewal or any questions, contact our support team.
				</Text>
				<Flex justify="center" align="center">
					<Button
						onClick={props?.onGotoLicenseManagement}
						className={classes.PluginManagerLicenseButton}
						px={12}
						py={8}
						c="#41454D"
					>
						Go To License Managment
					</Button>
				</Flex>
			</Flex>
		</Modal>
	);
}
