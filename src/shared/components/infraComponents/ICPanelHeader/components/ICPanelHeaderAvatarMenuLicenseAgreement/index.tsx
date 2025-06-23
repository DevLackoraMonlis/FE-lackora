import BCModal from "@/shared/components/baseComponents/BCModal";
import {
	Button,
	type Direction,
	Flex,
	Text,
	useMantineTheme,
} from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import { useState } from "react";
import ICLicenseAgreementEnContent from "../../../ICLicenseAgreement/components/ICLicenseAgreementEnContent";
import ICLicenseAgreementFaContent from "../../../ICLicenseAgreement/components/ICLicenseAgreementFaContent";

type Props = {
	opened: boolean;
	onClose: () => void;
};

export default function ICPanelHeaderAvatarMenuLicenseAgreement(props: Props) {
	const theme = useMantineTheme();
	const [direction, setDirection] = useState<Direction>("ltr");

	return (
		<BCModal
			opened={props.opened}
			onClose={props.onClose}
			centered
			withCloseButton={false}
			size="70%"
			styles={{
				title: { width: "100%" },
			}}
			title={
				<Flex align="center" justify="space-between" dir={direction}>
					<Text size="xl" fw="bolder">
						{direction === "rtl"
							? "توافق نامه استفاده از سامانه CoreLog"
							: "CoreLog License Agreement"}
					</Text>
					<Button
						onClick={() =>
							setDirection((prevState) => (prevState === "rtl" ? "ltr" : "rtl"))
						}
						variant="outline"
						leftSection={
							<IconWorld
								width={20}
								height={20}
								color={theme.colors.primary[6]}
							/>
						}
					>
						{direction === "rtl" ? "English" : "فارسی"}
					</Button>
				</Flex>
			}
		>
			<Flex dir={direction}>
				{direction === "rtl" ? (
					<ICLicenseAgreementFaContent />
				) : (
					<ICLicenseAgreementEnContent />
				)}
			</Flex>
		</BCModal>
	);
}
