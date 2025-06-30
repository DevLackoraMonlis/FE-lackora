import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import { Flex, Highlight, List, Text } from "@mantine/core";

type Props = {
	onCompleteRemainingTime: VoidFunction;
	remainTimeMinutes: number;
};

export default function ICLoginLocked(props: Props) {
	return (
		<Flex gap={"xl"} direction={"column"} h={"fit-content"} align={"flex-start"}>
			<Highlight
				styles={{
					root: {
						fontSize: "var(--mantine-font-size-2xxl)",
						fontWeight: "bold",
						textAlign: "start",
						width: "80%",
					},
				}}
				highlightStyles={{
					backgroundColor: "transparent",
					color: "var(--mantine-color-red-5)",
				}}
				highlight={[`${props.remainTimeMinutes} minutes`]}
			>
				{`Your account has been temporarily locked for ${props.remainTimeMinutes} minutes due to multiple invalid login attempts!`}
			</Highlight>

			<Flex gap={"xs"} direction={"column"}>
				<Text fz={"md"}>you can:</Text>
				<List>
					<List.Item>
						<Text fw={"bold"}>Wait 60 minutes</Text> until your account is automatically unlocked.
					</List.Item>
					<List.Item>
						Or <Text fw={"bold"}>contact your local security administrator</Text> to unlock it manually.
					</List.Item>
				</List>
			</Flex>
			<Flex mt={100} w={"100%"} justify={"center"}>
				<FlipClockCountdown to={new Date().getTime() + props.remainTimeMinutes * 60 * 1000} />
			</Flex>
		</Flex>
	);
}
