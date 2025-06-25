import { Button, Flex, Text } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import type React from "react";
import type {
	ICAppManagerBusinessTypeEnum,
	ModulePermissionRs,
} from "../../../../../index.types";
import classes from "./index.module.css";

type Props = {
	openLicenseModal: () => void;
	isExpiredCommercial: boolean;
	isExpiredLicenseSupport: boolean;
	type: ICAppManagerBusinessTypeEnum;
	openActivateModalModal: () => void;
	permissions?: ModulePermissionRs;
};
export default function ICAppManagerCardExpiredApp(props: Props) {
	const handelArrowButton = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.stopPropagation();

		if (props.type === "Commercial") {
			props.openActivateModalModal();
		} else {
			props.openLicenseModal();
		}
	};
	return (
		<Flex gap={8} align="center">
			<Flex
				px={8}
				h={32}
				bg="#E02D3C"
				justify="center"
				align="center"
				className={classes.expiredRoot}
			>
				<Text fw={400} fz={12} c="#FAFAFA">
					{props.isExpiredCommercial ? "Expired" : "Support License Expired"}
				</Text>
			</Flex>
			<Text fw={400} fz={14} c="#41454D">
				{props.isExpiredCommercial ? "Commercial" : "Free"}
			</Text>
			{props.permissions?.create && (
				<Button
					w={32}
					h={32}
					variant="outline"
					color="primary"
					onClick={(e) => handelArrowButton(e)}
					p={0}
					classNames={{ root: classes.freeButtonRoot }}
				>
					<IconArrowNarrowRight size={18} />
				</Button>
			)}
		</Flex>
	);
}
