import { Button, Flex, Text } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import type React from "react";
import type {
	ICAppManagerBusinessTypeEnum,
	ModulePermissionRs,
} from "../../../../../index.types";
import classes from "./index.module.css";

type Props = {
	type: ICAppManagerBusinessTypeEnum;
	openActivateModalModal: () => void;
	isExpiredLicenseSupport: boolean;
	openLicenseModal: () => void;
	permissions: ModulePermissionRs;
};

export default function ICAppManagerCardNotInstalledApp(props: Props) {
	const handelActive = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();

		if (props.type === "Commercial") {
			props.openActivateModalModal();
			return;
		}
		if (props.isExpiredLicenseSupport) {
			props.openLicenseModal();
		} else {
			props.openActivateModalModal();
		}
	};
	return (
		<Flex gap={8} align="center">
			<Text fz={14} fw={400} c="#41454D">
				{props.type}
			</Text>
			{props.permissions.create && (
				<Button
					w={32}
					h={32}
					color="primary"
					onClick={(e) => handelActive(e)}
					variant="outline"
					p={0}
					classNames={{ root: classes.freeButtonRoot }}
				>
					<IconArrowNarrowRight size={18} />
				</Button>
			)}
		</Flex>
	);
}
