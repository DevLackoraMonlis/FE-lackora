import { Button, Flex, Modal, Text } from "@mantine/core";
import type { ICAppManagerProps } from "../../../../index.types";
import classes from "./index.module.css";

type Props = {
	close: () => void;
	opened: boolean;
	onGotoLicenseManagement: ICAppManagerProps["onGotoLicenseManagement"];
};
export default function ICAppManagerLicenseSupportAlertModal(props: Props) {
	return (
		<Modal
			centered
			size="37.5rem"
			title="Alert"
			classNames={{
				content: classes.modalContent,
				header: classes.modalHeader,
				body: classes.modalBody,
			}}
			opened={props.opened}
			onClose={props.close}
		>
			<Flex direction="column" gap="1.375rem">
				<Text c="#E02D3C" fw="800" fz="24">
					Support License Expired
				</Text>
				<Text c="#121721" fw="400" fz={14}>
					Your support license has expired, which means you are unable to request new plugin activations at
					this time. To proceed with plugin activation, please renew your support license. If you need
					assistance with renewing your license or have any questions, feel free to contact our support team.
				</Text>
				<Flex justify="center" align="center">
					<Button
						onClick={props.onGotoLicenseManagement}
						className={classes.modalButton}
						w="300"
						h="40"
						c="#41454D"
					>
						Go to License management
					</Button>
				</Flex>
			</Flex>
		</Modal>
	);
}
