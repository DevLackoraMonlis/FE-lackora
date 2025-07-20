import { Button, Flex, Text } from "@mantine/core";

type Props = {
	handleClose: VoidFunction;
	edit?: boolean;
	pending?: boolean;
	disabled?: boolean;
};
export default function DrawerFormFooter(props: Props) {
	return (
		<Flex
			pos="absolute"
			gap={8}
			bottom={0}
			right={0}
			left={0}
			px={16}
			py={8}
			align="center"
			justify="end"
			w="100%"
		>
			<Button
				disabled={props.disabled}
				type="submit"
				name="create"
				variant={props.disabled ? "outline" : "filled"}
				loading={props.pending}
			>
				<Text fw="bold" size="sm">
					{props.edit ? "Save Changes" : "Create"}
				</Text>
			</Button>
			{!props.edit && (
				<Button disabled={props.disabled} variant="outline" type="submit" loading={props.pending}>
					<Text fw="bold" size="sm">
						Create And Add Another
					</Text>
				</Button>
			)}
			<Button onClick={props.handleClose} variant="default" disabled={props.pending} type="reset">
				<Text fw="bold" size="xs">
					Cancel
				</Text>
			</Button>
		</Flex>
	);
}
