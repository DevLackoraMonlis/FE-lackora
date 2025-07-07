import { Alert, Badge, Card, CloseButton, Flex, Loader, RingProgress, Text } from "@mantine/core";

import { useAdapterAndVendorIcons } from "@/shared/icons/hooks/useAdapterIcons";

import { ADAPTER_UPLOADED_STATUS } from "../../../../index.constants";
import type { AdapterUploadedStatus } from "../../../../index.enum";

export const UploadStatusUploading = ({ title, subTitle }: { title: string; subTitle: string }) => {
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
					<CloseButton bg="transparent" />
				</Flex>
			</Flex>
		</Card>
	);
};

export const UploadStatusValidating = ({ title, subTitle }: { title: string; subTitle: string }) => {
	return (
		<Card p="xs">
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
							{subTitle || "-"}
						</Text>
					</Flex>
				</Flex>
				<Flex gap="xs" align="center">
					<Text fz="sm" c="dimmed">
						Validating ...
					</Text>
					<CloseButton bg="transparent" />
				</Flex>
			</Flex>
		</Card>
	);
};

export const UploadStatusReadyToImport = ({
	status,
	title,
	subTitle,
	iconType,
}: {
	status: AdapterUploadedStatus;
	title: string;
	subTitle: string;
	iconType: string;
}) => {
	const { getAdapterAndVendorIcon } = useAdapterAndVendorIcons();
	const uploadStatus = ADAPTER_UPLOADED_STATUS[status] || {};
	const Icon = uploadStatus.icon;
	return (
		<>
			<Card bg="gray.1" p="xs">
				<Flex justify="space-between" align="center">
					<Flex gap="xs" align="center">
						<Card variant="light" m={0} p={5}>
							{getAdapterAndVendorIcon(iconType, { size: 30 })}
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
						<CloseButton bg="transparent" />
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
