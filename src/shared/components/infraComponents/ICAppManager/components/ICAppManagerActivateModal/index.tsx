import {
	Alert,
	Button,
	Flex,
	Modal,
	Text,
	TextInput,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useAppManagerActivateModal } from "../../hooks/useAppManagerActivateModal";
import useAppManagerIcon from "../../hooks/useAppManagerIcon";
import type {
	ICAppManagerActivateProps,
	ICAppManagerIconType,
} from "../../index.types";
import classes from "./index.module.css";

type Props = ICAppManagerActivateProps;

type ActivationFormValueType = {
	activationCode: string;
};

export function ICAppManagerActivateModal(props: Props) {
	const [modalCondition, setModalCondition] = useState<boolean | null>(null);
	const { PLUGIN_ICON } = useAppManagerIcon({
		size: 32,
		wrapperSize: 48,
	});

	const { submitActivationCode } = useAppManagerActivateModal({
		submitActivationCodeHandler: props.submitApi,
	});
	const theme = useMantineTheme();
	const activationForm = useForm<ActivationFormValueType>({
		mode: "uncontrolled",
		initialValues: {
			activationCode: "",
		},
		validate: {
			activationCode: (value) => (value ? null : "Invalid activation code"),
		},
	});

	const submitHandler = () => {
		submitActivationCode
			.mutateAsync({
				activationCode: activationForm.getValues().activationCode,
				name: props.name as string,
			})
			.then(() => {
				setModalCondition(true);
				props.onSuccess();
				activationForm.reset();
			})
			.catch(() => {
				setModalCondition(false);
				activationForm.setErrors({ activationCode: "Invalid activation code" });
			});
	};

	const closeHandler = () => {
		setModalCondition(null);
		activationForm.reset();
		props.onClose();
	};

	const requestPurchaseHandler = () => {
		props.onRequestPurchase?.(props.name);
	};

	return (
		<Modal
			classNames={classes}
			size={600}
			title={<Title order={5}>Install Plugin</Title>}
			opened={props.opened}
			onClose={closeHandler}
		>
			<Flex direction="column" p={16} gap="sm">
				<Flex gap={16} align="center">
					{PLUGIN_ICON[props?.name as ICAppManagerIconType]}
					<Text fz="md" fw={700}>
						{props.name}
					</Text>
				</Flex>
				<Flex>
					{!modalCondition && (
						<Text mt={10} style={{ textAlign: "justify" }} fz={12}>
							To install this plugin, please enter your activation code or
							submit a purchase request. If you have already purchased the
							plugin, enter the code in the field below. If you haven&apos;t
							purchased it yet, you can request to buy the plugin
						</Text>
					)}
				</Flex>
				<Flex justify="center" p={16} align="center" direction="column" gap={8}>
					<Flex
						style={{
							border: `1px solid ${theme.colors.gray[2]}`,
							borderRadius: "8px",
							background: "white",
						}}
						p="lg"
						direction="column"
						gap={16}
						w="100%"
					>
						{modalCondition === null ? (
							<>
								<Text fz={14} fw={700}>
									Enter Activation Code
								</Text>
								<form onSubmit={activationForm.onSubmit(submitHandler)}>
									<Flex direction="column" gap={8}>
										<Flex gap={16} align="center">
											<TextInput
												key={activationForm.key("activationCode")}
												{...activationForm.getInputProps("activationCode")}
												placeholder="Activation code"
												flex={1}
											/>
											<Button
												type="submit"
												disabled={!activationForm.isValid()}
											>
												Submit
											</Button>
										</Flex>
									</Flex>
								</form>
							</>
						) : !modalCondition ? (
							<>
								<Text fz={14} fw={700}>
									Enter the activation code
								</Text>
								<form onSubmit={activationForm.onSubmit(submitHandler)}>
									<Flex direction="column" gap={8}>
										<Flex direction="column" gap={12}>
											<Flex gap={16} align="center">
												<TextInput
													key={activationForm.key("activationCode")}
													{...activationForm.getInputProps("activationCode")}
													placeholder="Plugin key"
													flex={1}
												/>
												<Button
													type="submit"
													disabled={!activationForm.isValid()}
												>
													Submit
												</Button>
											</Flex>
											<Alert color={theme.colors.red[4]}>
												<p style={{ color: theme.colors.red[8] }}>
													The activation code you entered is invalid. Please
													check the code and try again, or contact support if
													the issue persists.{" "}
												</p>
											</Alert>
										</Flex>
									</Flex>
								</form>
							</>
						) : (
							<Alert color={theme.colors.green[4]}>
								<p style={{ color: theme.colors.green[8] }}>
									Your activation code has been verified. You can now continue
									with the plugin installation.
								</p>
							</Alert>
						)}
					</Flex>
					{!modalCondition && (
						<Flex
							style={{
								border: `1px solid ${theme.colors.gray[2]}`,
								borderRadius: "8px",
								background: "white",
							}}
							p="lg"
							direction="column"
							gap={16}
							w="100%"
						>
							<Text fz={14} fw={700}>
								If you don&#39;t have an activation code, click &#39;Request
								Purchase&#39; to start the purchase process.
							</Text>
							<Text fz={12}>
								Clicking the &#39;Request Purchase&#39; button will redirect you
								to the customer portal, where our sales team will reach out to
								guide you through the purchase process. Once the purchase is
								complete, you’ll receive an activation code to enter on the
								plugin installation page.
							</Text>
							<Flex justify="start">
								<Button onClick={requestPurchaseHandler}>
									Request Purchase
								</Button>
							</Flex>
						</Flex>
					)}
				</Flex>
			</Flex>
		</Modal>
	);
}

export default ICAppManagerActivateModal;
