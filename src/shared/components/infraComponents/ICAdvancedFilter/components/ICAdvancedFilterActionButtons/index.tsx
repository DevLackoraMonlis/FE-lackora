import type {
	ICAdvancedFilterDataRs,
	ICAdvancedFilterProps,
} from "@/shared/components/infraComponents/ICAdvancedFilter/index.types";
import useExportCSV from "@/shared/hooks/useExportCSV";
import { Button, Flex, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconFileExport, IconRefresh, IconSettings, IconWindowMaximize } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "zustand/index";
import { useShallow } from "zustand/react/shallow";

type Props<T> = {
	getDataApi: ICAdvancedFilterProps<T>["getDataApi"];
	store: ICAdvancedFilterProps<T>["store"];
	run: ICAdvancedFilterProps<T>["run"];
	hideManageColumnButton: ICAdvancedFilterProps<T>["hideManageColumnButton"];
};

export default function ICAdvancedFilterActionButtons<T>(props: Props<T>) {
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
		mutationFn: props.getDataApi,
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
			<Button px={"xs"} variant={"default"} onClick={() => props.run()} size={"sm"}>
				<IconRefresh size={20} />
			</Button>
			<Button
				px={"xs"}
				variant={"default"}
				onClick={() => getDataForExportMutation.mutate({ ...store.variables, limit: 10000 })}
				size={"sm"}
			>
				<IconFileExport size={20} />
			</Button>
			<Button px={"xs"} variant={"default"} onClick={() => store.setOpenFullScreenModal(true)} size={"sm"}>
				<IconWindowMaximize size={20} />
			</Button>
			{!props.hideManageColumnButton && (
				<Tooltip label={"Manage Columns"}>
					<Button px={"xs"} variant={"default"} size={"sm"}>
						<IconSettings size={20} />
					</Button>
				</Tooltip>
			)}
		</Flex>
	);
}
