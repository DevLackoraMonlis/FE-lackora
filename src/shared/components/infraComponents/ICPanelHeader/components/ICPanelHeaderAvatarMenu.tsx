import { Avatar, Box, Flex, Highlight, Menu, Text } from "@mantine/core";
import { IconChevronDown, IconUserSquareRounded } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import type { ICPanelHeaderProps } from "@/shared/components/infraComponents/ICPanelHeader/index.types";
import { AppRoutes } from "@/shared/constants/routes";

import ICPanelHeaderAvatarMenuInformation from "./ICPanelHeaderAvatarMenuInformation";

const avatarStyles = {
	root: {
		backgroundColor: "var(--mantine-color-main-4)",
	},
	image: {
		color: "var(--mantine-color-primary)",
	},
	placeholder: {
		color: "var(--mantine-color-primary-1)",
	},
};

const { profile } = AppRoutes;

export default function ICPanelHeaderAvatarMenu(props: ICPanelHeaderProps) {
	const userSession = props.sessionUser;
	const router = useRouter();
	return (
		<>
			<Menu
				width={"300px"}
				radius="md"
				shadow="md"
				position="bottom-end"
				keepMounted
				closeOnClickOutside
				closeOnItemClick={true}
			>
				<Menu.Target>
					<Flex className="cursor-pointer" align="center">
						<Box p="8px">
							<Avatar styles={avatarStyles} c="white" size={30} alt="user-avatar" radius="xl" />
						</Box>
						<Text data-testid="logged-username" mx="2xs" c="white">
							{userSession?.data?.profile?.username}
						</Text>
						<IconChevronDown size={16} strokeWidth={2} color="white" />
					</Flex>
				</Menu.Target>
				<Menu.Dropdown p="2xs">
					<>
						<Menu.Label>
							<Flex justify={"space-between"}>
								<Highlight highlight={["Lackora"]}>{"Lackora (v.0.0.1)"}</Highlight>
								<Text c="red.5" size="sm" onClick={props.onLogout} component="div" className="cursor-pointer">
									Logout
								</Text>
							</Flex>
							<ICPanelHeaderAvatarMenuInformation
								profileEmail={userSession?.data?.profile?.email}
								profileName={userSession?.data?.profile?.name}
								profileRole={userSession?.data?.profile?.familyname}
							/>
						</Menu.Label>
						<Menu.Item disabled fz="xs" className="cursor-auto">
							Settings
						</Menu.Item>
						<Menu.Item leftSection={<IconUserSquareRounded size={15} />} onClick={() => router.push(profile)}>
							Profile
						</Menu.Item>
					</>
				</Menu.Dropdown>
			</Menu>
		</>
	);
}
