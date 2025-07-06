import { useAdapterAndVendorIcons } from "@/shared/icons/hooks/useAdapterIcons";
import { Alert, Badge, Card, CloseButton, Flex, Loader, RingProgress, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export const UploadStatusUploading = () => {
	return (
		<Card bd="1px solid gray.5" p="2xs">
			<Flex justify="space-between" align="center">
				<Flex gap="xs" align="center">
					<Card variant="light" bg="gray.1" p={0} m={0}>
						<RingProgress thickness={4} size={35} roundCaps sections={[{ value: 40, color: "cyan" }]} />
					</Card>
					<Flex direction="column">
						<Text fz="sm" c="dimmed">
							File name.adp
						</Text>
						<Text fz="xs" c="dimmed">
							description file ...
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

export const UploadStatusValidating = () => {
	return (
		<Card bd="1px solid gray.5" p="2xs">
			<Flex justify="space-between" align="center">
				<Flex gap="xs" align="center">
					<Card variant="light" bg="gray.1" p={10} m={0}>
						<Loader size={25} type="bars" color="lime" />
					</Card>
					<Flex direction="column">
						<Text fz="sm" c="dimmed">
							File name.adp
						</Text>
						<Text fz="xs" c="dimmed">
							description file ...
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

export const UploadStatusReadyToImport = () => {
	const { getAdapterAndVendorIcon } = useAdapterAndVendorIcons();
	return (
		<>
			<Card bd="1px solid gray.5" bg="gray.1" p="2xs">
				<Flex justify="space-between" align="center">
					<Flex gap="xs" align="center">
						<Card variant="light" m={0} p={5}>
							{getAdapterAndVendorIcon("cisco", { size: 30 })}
						</Card>
						<Flex direction="column">
							<Text fz="sm">Cisco NXOS SSH Adapter</Text>
							<Text fz="xs">Version 1.2.3</Text>
						</Flex>
					</Flex>
					<Flex gap="xs" align="center">
						<Badge
							component="span"
							h="30px"
							radius="xs"
							variant="light"
							// color="green"
							// leftSection={<IconCheck size={15} />}
							color="blue"
							leftSection={<IconInfoCircle size={15} />}
						>
							{/* Ready to Import */}
							Already exists - Upgrade Version
						</Badge>
						<CloseButton bg="transparent" />
					</Flex>
				</Flex>
			</Card>
			<Alert
				mt="-xs"
				variant="light"
				color="blue"
				title="Adapter already exists. No changes made!"
				icon={<IconInfoCircle />}
			>
				The uploaded adapter is identical to the current version and does not require import. If you still
				want to re-import, please remove the existing adapter first.
			</Alert>
		</>
	);
};
