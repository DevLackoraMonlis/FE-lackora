import { Alert, Badge, Card, CloseButton, Flex, Image, Loader, RingProgress, Text } from "@mantine/core";

import { useVendorIcons } from "@/shared/hooks/icons/useVendorIcons";

import { ADAPTER_UPLOADED_STATUS } from "../../../../index.constants";
import type { AdapterUploadedStatus } from "../../../../index.enum";

type CommonType = { title: string; subTitle: string; onCancelFile: VoidFunction };

export const UploadStatusUploading = ({ title, subTitle, onCancelFile }: CommonType) => {
	return (
		<Card p="xs">
			<Flex justify="space-between" align="center">
				<Flex gap="xs" align="center">
					<Card variant="light" bg="gray.1" p={0} m={0}>
						<RingProgress thickness={4} size={35} roundCaps sections={[{ value: 40, color: "cyan" }]} />
					</Card>
					<Flex direction="column">
						<Text fz="sm" c="dimmed">
							{title || "-"}
						</Text>
						<Text fz="xs" c="dimmed">
							{subTitle || "-"}
						</Text>
					</Flex>
				</Flex>
				<Flex gap="xs" align="center">
					<Text fz="sm" c="dimmed">
						Uploading ...
					</Text>
					<CloseButton bg="transparent" onClick={onCancelFile} />
				</Flex>
			</Flex>
		</Card>
	);
};

export const UploadStatusValidating = ({ title, subTitle, onCancelFile }: CommonType) => {
	return (
		<Card bg="gray.1" p="xs">
			<Flex justify="space-between" align="center">
				<Flex gap="xs" align="center">
					<Card variant="light" bg="gray.1" p={10} m={0}>
						<Loader size={25} type="bars" color="lime" />
					</Card>
					<Flex direction="column">
						<Text fz="sm" c="dimmed">
							{title || "-"}
						</Text>
						<Text fz="xs" c="dimmed">
							{subTitle || "Validating File ..."}
						</Text>
					</Flex>
				</Flex>
				<Flex gap="xs" align="center">
					<Text fz="sm" c="dimmed">
						Validating ...
					</Text>
					<CloseButton bg="transparent" onClick={onCancelFile} />
				</Flex>
			</Flex>
		</Card>
	);
};

export const UploadStatusReadyToImport = ({
	status,
	title,
	subTitle,
	iconPath,
	onCancelFile,
}: CommonType & {
	status: AdapterUploadedStatus;
	iconPath: string;
}) => {
	const { getVendorIcon } = useVendorIcons();
	const uploadStatus = ADAPTER_UPLOADED_STATUS[status] || {};
	const Icon = uploadStatus.icon;
	return (
		<>
			<Card bg="gray.1" p="xs">
				<Flex justify="space-between" align="center">
					<Flex gap="xs" align="center">
						<Card variant="light" m={0} p={0} w="40px" h="40px">
							<Flex justify="center" align="center" w="40px" h="40px">
								{iconPath ? (
									<Image fit="cover" radius="md" src={iconPath} alt="adapter-icon" />
								) : (
									getVendorIcon("generic", { size: 30 })
								)}
							</Flex>
						</Card>
						<Flex direction="column">
							<Text fz="sm" fw="bold">
								{title || "-"}
							</Text>
							<Text fz="xs">{subTitle || "-"}</Text>
						</Flex>
					</Flex>
					<Flex gap="xs" align="center">
						<Badge
							component="span"
							h="30px"
							radius="xs"
							variant="light"
							tt="capitalize"
							color={uploadStatus.color}
							leftSection={Icon ? <Icon size={15} /> : null}
						>
							{uploadStatus.badgeText}
						</Badge>
						<CloseButton bg="transparent" onClick={onCancelFile} />
					</Flex>
				</Flex>
			</Card>
			<Alert
				mt="-xs"
				variant="light"
				hidden={!uploadStatus.alertTitle}
				title={uploadStatus.alertTitle}
				color={uploadStatus.color}
				icon={Icon ? <Icon size={30} /> : null}
			>
				{uploadStatus.alertDescription}
			</Alert>
		</>
	);
};
