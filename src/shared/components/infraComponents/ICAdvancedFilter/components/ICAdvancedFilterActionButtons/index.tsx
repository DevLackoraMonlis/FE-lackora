import type {
	ICAdvancedFilterDataRs,
	ICAdvancedFilterProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import useExportCSV from "@/shared/hooks/useExportCSV";
import { Button, Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconFileExport, IconRefresh, IconWindowMaximize } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

type Props<T> = {
	data: ICAdvancedFilterProps<T>["data"];
	exportDataApi: ICAdvancedFilterProps<T>["exportDataApi"];
	store: ICAdvancedFilterProps<T>["store"];
	run: ICAdvancedFilterProps<T>["run"];
};

export default function ICAdvancedFilterActionButtons<T extends ICAdvancedFilterDataRs>(props: Props<T>) {
	const { downloadCSV } = useExportCSV<ICAdvancedFilterDataRs>();

	const store = useStore(
		props.store,
		useShallow((state) => ({
			variables: state.variables,
			setOpenFullScreenModal: state.setOpenFullScreenModal,
		})),
	);

	const getDataForExportMutation = useMutation({
		mutationKey: ["get-csv-data", store.variables],
		mutationFn: props.exportDataApi,
		onSuccess: (response) => {
			void downloadCSV({
				data: response.data.results,
			});
			notifications.show({
				title: "Succeed",
				message: "Export CSV was Successful",
				color: "green",
				withBorder: true,
			});
		},
	});

	return (
		<Flex gap={"2xs"}>
			<Button variant={"default"} onClick={props.run} size={"sm"}>
				<IconRefresh size={16} />
			</Button>
			<Button
				variant={"default"}
				onClick={() => getDataForExportMutation.mutate(store.variables)}
				size={"sm"}
			>
				<IconFileExport size={16} />
			</Button>
			<Button variant={"default"} onClick={() => store.setOpenFullScreenModal(true)} size={"sm"}>
				<IconWindowMaximize size={16} />
			</Button>
		</Flex>
	);
}
