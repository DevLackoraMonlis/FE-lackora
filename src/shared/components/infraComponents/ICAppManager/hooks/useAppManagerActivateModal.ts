import type { CustomError } from "@/http/end-points/GeneralService.types";
import { getErrorMessage } from "@/shared/lib/utils";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import type { ICAppManagerProps } from "../index.types";

export type Params = {
	code?: string;
	submitActivationCodeHandler: ICAppManagerProps["submitActivateAppApi"];
};

export const useAppManagerActivateModal = (params: Params) => {
	const submitActivationCode = useMutation({
		mutationKey: ["send-activation-code"],
		mutationFn: params.submitActivationCodeHandler,
		onSuccess: () => {
			notifications.show({
				title: "Success",
				message: "Code is Valid",
				color: "green",
			});
		},
		onError: (error: CustomError) => {
			notifications.show({
				title: "Failed",
				message: getErrorMessage(error),
				color: "red",
				withBorder: true,
			});
		},
	});

	return { submitActivationCode };
};
