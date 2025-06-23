import type { ICPanelHeaderProps } from "@/shared/components/infraComponents/ICPanelHeader/index.types";
import {
	ActionIcon,
	Avatar,
	Badge,
	Box,
	Flex,
	Menu,
	Text,
	useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import classes from "../index.module.css";
import ICPanelHeaderAvatarMenuInformation from "./ICPanelHeaderAvatarMenuInformation";

export default function ICPanelHeaderAvatarMenu(props: ICPanelHeaderProps) {
	const userSession = props.sessionUser;
	const { colors } = useMantineTheme();
	const [aboutMenuOpened, aboutMenuHandler] = useDisclosure(false);
	const [mainMenuOpened, mainMenuHandler] = useDisclosure(false);

	return (
		<>
			<Menu
				id="data-test-profile-menu"
				width={240}
				radius="md"
				shadow="md"
				position="bottom-end"
				onChange={mainMenuHandler.toggle}
				opened={mainMenuOpened}
				keepMounted
				closeOnClickOutside
				closeOnItemClick={false}
				onClose={aboutMenuHandler.close}
			>
				<Menu.Target>
					<Flex
						id="data-test-profile-menu-button"
						style={{ cursor: "pointer" }}
						align="center"
					>
						<Box p="8px">
							<Avatar
								styles={{
									root: {
										backgroundColor: "var(--mantine-color-primary-0)",
									},
									image: {
										color: "var(--mantine-color-white)",
									},
									placeholder: {
										color: "var(--mantine-color-white)",
									},
								}}
								c="white"
								size={38}
								alt="user-avatar"
								radius="xl"
							/>
						</Box>
						<Text ml="md" mr="md" c="white">
							{userSession?.data?.profile?.username}
						</Text>
						<IconChevronDown size={16} strokeWidth={2} color="white" />
					</Flex>
				</Menu.Target>
				<Menu.Dropdown p={0}>
					<Box lightHidden={aboutMenuOpened} darkHidden={!aboutMenuOpened}>
						<Menu.Label>
							<ICPanelHeaderAvatarMenuInformation
								profileSrc=""
								profileEmail={userSession?.data?.profile?.email}
								profileName={`${userSession?.data?.profile?.name} ${userSession?.data?.profile?.familyname}`}
							/>
						</Menu.Label>
						<Menu.Item
							id="data-test-profile-menu-logout"
							onClick={props.onLogout}
						>
							<Text c="red.4" size="sm">
								Logout
							</Text>
						</Menu.Item>
						<Menu.Divider />
						{userSession?.data?.profile.platform &&
							userSession?.data?.profile.version && (
								<>
									<Menu.Item
										id="data-test-profile-menu-about"
										onClick={aboutMenuHandler.open}
									>
										<Text size="sm">About</Text>
									</Menu.Item>
									<Flex columnGap="5px" p="xs">
										<Text size="sm" c={colors.gray[5]}>
											{userSession?.data?.profile.platform} Platform
										</Text>
										<Badge size="sm" radius="sm" color={colors.gray[6]}>
											v.{userSession?.data?.profile.version}
										</Badge>
									</Flex>
								</>
							)}
					</Box>
					<Box lightHidden={!aboutMenuOpened} darkHidden={aboutMenuOpened}>
						<Flex justify="space-between" className={classes.aboutHeader}>
							<Text size="lg" fw="bold">
								About
							</Text>
							<ActionIcon
								size="md"
								variant="subtle"
								color="white"
								onClick={aboutMenuHandler.close}
							>
								<IconX />
							</ActionIcon>
						</Flex>
						<Menu.Label>
							<Flex direction="column" rowGap="lg">
								<Text fw="bold" mt="xs">
									{userSession?.data?.profile.platform} Platform
								</Text>
								<Flex direction="column" rowGap="xs">
									<Flex columnGap="2px">
										<Text c={colors.gray[4]}>Version:</Text>
										<Text>{userSession?.data?.profile.version}</Text>
									</Flex>
									<Flex columnGap="2px">
										<Text c={colors.gray[4]}>Updated on:</Text>
										<Text>{userSession?.data?.profile.updatedOn || "-"}</Text>
									</Flex>
								</Flex>
							</Flex>
						</Menu.Label>
						<Menu.Divider />
						<Menu.Item
							id="data-test-profile-menu-about-privacy-policy"
							onClick={() => {
								aboutMenuHandler.close();
								mainMenuHandler.close();
							}}
						>
							<Text c={colors.primary[6]} size="sm" fw="500">
								Privacy Policy
							</Text>
						</Menu.Item>
						<Menu.Divider />
						<Text
							p="sm"
							size="xs"
							c={colors.gray[4]}
						>{`©${dayjs().format("YYYY")} MonoLight. All rights reserved`}</Text>
					</Box>
				</Menu.Dropdown>
			</Menu>
		</>
	);
}
