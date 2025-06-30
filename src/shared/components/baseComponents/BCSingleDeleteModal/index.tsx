import { useI18n } from "@/locales/client";
import BCModal from "@/shared/components/baseComponents/BCModal";
import { Box, Highlight, useMantineColorScheme } from "@mantine/core";
import classes from "./index.module.css";

type Props = {
	opened: boolean;
	onClose: () => void;
	onOk: () => void;
	name: string;
	isLoading: boolean;
	title: string;
	description: string;
};

export default function BCSingleDeleteModal(props: Props) {
	const t = useI18n();
	const { colorScheme } = useMantineColorScheme();
	return (
		<BCModal
			headerClassName={classes.header}
			closeClassName={classes.close}
			opened={props.opened}
			onClose={props.onClose}
			title={props.title}
			centered
		>
			<Box p={"xl"} h={150}>
				<Highlight
					highlightStyles={{
						backgroundColor: "transparent",
						fontWeight: 600,
						color: colorScheme === "light" ? "black" : "white",
					}}
					highlight={[`${props.name}`]}
				>
					{props.description}
				</Highlight>
			</Box>

			<BCModal.FooterTwoButton
				loading={props.isLoading}
				okButtonProps={{
					color: "red",
				}}
				okLabel={t("delete")}
				onCancel={props.onClose}
				onOk={props.onOk}
			/>
		</BCModal>
	);
}
