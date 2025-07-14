import BCModal from "@/shared/components/baseComponents/BCModal";
import { Badge, Box, Button, Flex, Text } from "@mantine/core";
import { IconDiscountCheck } from "@tabler/icons-react";

type Props = {
	opened: boolean;
	onClose: VoidFunction;
	appName: string;
	loading: boolean;
	onActivate: VoidFunction;
};

export default function MonoMarketActivationNonConfigAppModal(props: Props) {
	return (
		<BCModal size={500} title={"Confirm Activation"} opened={props.opened} onClose={props.onClose}>
			<Box px={"sm"} h={160}>
				<Flex gap={"sm"} justify={"center"} align={"center"}>
					<Badge color={"#12B886"} circle size={"30px"}>
						<Flex justify={"center"} align={"center"}>
							<IconDiscountCheck color={"white"} />
						</Flex>
					</Badge>
					<Text fz={"lg"} fw={"bold"}>{`Activation ${props.appName}`}</Text>
				</Flex>

				<Box mt={"sm"} bg={"gray.1"} p={"md"}>
					Are you sure you want to activate this app?
				</Box>
			</Box>

			<BCModal.EmptyFooter>
				<Flex
					gap={"sm"}
					bg={"white"}
					className={"h-full w-full"}
					px={"sm"}
					align={"center"}
					justify={"flex-end"}
				>
					<Button loading={props.loading} onClick={props.onActivate}>
						Activate
					</Button>
					<Button variant={"default"} loading={props.loading} onClick={props.onClose}>
						Cancel
					</Button>
				</Flex>
			</BCModal.EmptyFooter>
		</BCModal>
	);
}
