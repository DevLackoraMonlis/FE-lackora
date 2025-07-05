import BCModal from "@/shared/components/baseComponents/BCModal";
import { Button, Flex } from "@mantine/core";

type Props = {
	loading: boolean;
	onCancel: VoidFunction;
};

export default function ConnectionCreateFormFooter(props: Props) {
	return (
		<BCModal.EmptyFooter>
			<Flex gap={"sm"} className={"h-full w-full"} px={"sm"} align={"center"} justify={"flex-end"}>
				<Button loading={props.loading} type={"submit"}>
					Save
				</Button>
				<Button loading={props.loading} variant={"default"} onClick={props.onCancel}>
					Cancel
				</Button>
			</Flex>
		</BCModal.EmptyFooter>
	);
}
