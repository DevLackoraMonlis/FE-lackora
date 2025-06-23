import type { ButtonProps, ModalProps } from "@mantine/core";
import { Modal } from "@mantine/core";
import { Button, Flex } from "@mantine/core";
import type { PropsWithChildren } from "react";
import classes from "./index.module.css";

type Props = ModalProps & {
	headerClassName?: string;
	closeClassName?: string;
};

function BCModal({
	classNames,
	closeClassName,
	headerClassName,
	...props
}: Props) {
	return (
		<Modal
			{...props}
			classNames={{
				body: classes.body,
				title: classes.title,
				root: classes.root,
				header: headerClassName,
				close: closeClassName,
			}}
		/>
	);
}

BCModal.EmptyFooter = function Footer(
	props: PropsWithChildren<{ wrapperClass?: string }>,
) {
	return (
		<div className={`${classes.footer} ${props.wrapperClass}`}>
			{props.children}
		</div>
	);
};

BCModal.Footer = function Footer(props: {
	onCancel: () => void;
	onApply: () => void;
	applyLabel?: string;
}) {
	return (
		<Flex p={16} gap="sm" justify="flex-end" className={classes.footer}>
			<Button id="data-test-modal-apply" onClick={props.onApply}>
				{props.applyLabel || "Apply"}
			</Button>
			<Button
				id="data-test-modal-cancel"
				onClick={props.onCancel}
				variant="default"
			>
				Cancel
			</Button>
		</Flex>
	);
};

BCModal.FooterSingleButton = function Footer(props: {
	onOk: () => void;
	okLabel?: string;
}) {
	return (
		<Flex p={16} gap="sm" justify="flex-end" className={classes.footer}>
			<Button id="data-test-modal-ok" onClick={props.onOk}>
				{props.okLabel || "Ok"}
			</Button>
		</Flex>
	);
};

BCModal.FooterTwoButton = function Footer(props: {
	onOk: () => void;
	okLabel?: string;
	onCancel: () => void;
	okButtonProps?: ButtonProps;
	loading?: boolean;
}) {
	return (
		<Flex p={16} gap="sm" justify="flex-end" className={classes.footer}>
			<Button
				id="data-test-modal-ok"
				loading={props.loading}
				{...props.okButtonProps}
				onClick={props.onOk}
			>
				{props.okLabel || "Ok"}
			</Button>
			<Button
				id="data-test-modal-cencel"
				loading={props.loading}
				onClick={props.onCancel}
				variant="default"
			>
				Cancel
			</Button>
		</Flex>
	);
};

BCModal.FooterThreeButtons = function Footer(props: {
	onCancel: () => void;
	onSet: () => void;
	onSetAndApply: () => void;
	setLabel?: string;
	setAndApplyLabel?: string;
	setDisabled?: boolean;
	setAndApplyDisabled?: boolean;
	loading?: boolean;
}) {
	return (
		<Flex p={16} gap="sm" justify="flex-end" className={classes.footer}>
			<Button
				id="data-test-set-and-apply"
				loading={props.loading}
				disabled={props.setAndApplyDisabled}
				size="xs"
				onClick={props.onSetAndApply}
			>
				{props.setAndApplyLabel || "Set and Apply"}
			</Button>
			<Button
				id="data-test-modal-set"
				loading={props.loading}
				disabled={props.setDisabled}
				variant="outline"
				size="xs"
				onClick={props.onSet}
			>
				{props.setLabel || "Set"}
			</Button>
			<Button
				id="data-test-modal-cencel"
				loading={props.loading}
				size="xs"
				onClick={props.onCancel}
				variant="default"
			>
				Cancel
			</Button>
		</Flex>
	);
};

export default BCModal;
