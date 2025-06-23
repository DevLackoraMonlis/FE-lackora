import type { CustomError } from "@/http/end-points/GeneralService.types";
import { UserManagementService } from "@/http/end-points/UserManagementService";
import type { ICAuthValidatePasswordRs } from "@/shared/components/infraComponents/index.types";
import { getErrorMessage } from "@/shared/lib/utils";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { startTransition, useState } from "react";

type DefaultParams = {
	onSuccess?: VoidFunction;
};

export function useCheckingPassword(params?: DefaultParams) {
	const [checkingPasswordData, setCheckingPasswordData] =
		useState<ICAuthValidatePasswordRs>();

	const { mutate: validatePasswordMutate } = useMutation({
		mutationKey: ["validate-password"],
		mutationFn: UserManagementService.validatePassword,
		onSuccess: (response) => {
			startTransition(() =>
				setCheckingPasswordData({
					lengthCheck: response.data.length_check,
					lowercaseCheck: response.data.lowercase_check,
					numericCheck: response.data.numeric_check,
					specialCharCheck: response.data.special_char_check,
					uppercaseCheck: response.data.uppercase_check,
				}),
			);
			params?.onSuccess?.();
		},
	});

	const handleValidatePassword = (password: string) => {
		const debounceCallback = debounce(
			() => validatePasswordMutate({ password }),
			200,
		);
		debounceCallback();
	};

	const isValidPassword = checkingPasswordData
		? Object.entries(checkingPasswordData).every((item) => item[1])
		: false;

	return {
		isValidPassword,
		checkingPasswordData,
		handleValidatePassword,
	};
}

export function useChangePassword(params?: DefaultParams) {
	const changePassword = useMutation({
		mutationKey: ["reset-password"],
		mutationFn: UserManagementService.changePassword,
		onSuccess: () => {
			notifications.show({
				title: "Success",
				message: "Reset Password Successfully",
				color: "green",
				withBorder: true,
			});
			params?.onSuccess?.();
		},
		onError: (err: CustomError) => {
			notifications.show({
				title: "Failed",
				message: getErrorMessage(err),
				color: "red",
				withBorder: true,
			});
		},
	});
	return {
		changePassword,
	};
}

export const useGetGeneratePasswordQuery = (params?: DefaultParams) => {
	const { mutateAsync: getGeneratePassword } = useMutation({
		mutationKey: ["generate-password"],
		mutationFn: UserManagementService.generatePassword,
		onSuccess: () => params?.onSuccess?.(),
		onError: (error: CustomError) => {
			notifications.show({
				title: "Failed to generate password",
				message: getErrorMessage(error),
				color: "red",
				withBorder: true,
			});
		},
	});
	return { getGeneratePassword };
};
