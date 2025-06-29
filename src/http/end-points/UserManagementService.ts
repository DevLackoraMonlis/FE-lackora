import type { PaginationRq, PaginationRs } from "@/http/end-points/GeneralService.types";
import type {
	ActivityRq,
	ChangePasswordRq,
	ChangeUserLoginAccessRq,
	ChangeUserStatusRq,
	CreateNewUserRq,
	GeneratePasswordRs,
	GetAllUsersRq,
	GetAllUsersRs,
	GroupPanelRs,
	ResetPasswordRs,
	UpdateAndCreateUserRs,
	UpdatePasswordRq,
	UpdateUserRq,
	UpdateUserRs,
	UserActivityRs,
	UserDetailsRq,
	UserDetailsRs,
	UserManagementProfileRs,
	UsersListRs,
	ValidatePasswordRq,
	ValidatePasswordRs,
} from "@/http/end-points/UserManagementService.types";

import { httpService } from "@/http/httpService";
import type { AxiosRequestConfig } from "axios";

export const ControllerPath = "/api/v1/user";

async function getProfile(signal?: AbortSignal) {
	return httpService.get<UserManagementProfileRs>(`${ControllerPath}/profile`, {
		signal,
	});
}

async function getAllUserActivity({ user_id, ...params }: ActivityRq, signal?: AbortSignal) {
	return httpService.get<PaginationRs<UserActivityRs>>(`${ControllerPath}/${user_id}/activity`, {
		signal,
		params,
	});
}

async function getUsersList(params: PaginationRq, signal?: AbortSignal) {
	return httpService.get<PaginationRs<UsersListRs>>(`${ControllerPath}/`, {
		signal,
		params,
	});
}

async function getUserGroupList(
	{ user_id, ...params }: PaginationRq & { user_id?: string },
	signal?: AbortSignal,
) {
	return httpService.get<PaginationRs<GroupPanelRs>>(`${ControllerPath}/${user_id}/groups`, {
		signal,
		params,
	});
}

async function createNewUser(params: CreateNewUserRq) {
	return httpService.post<UpdateAndCreateUserRs>(`${ControllerPath}/`, params);
}

async function updateUser({ id, ...payload }: UpdateUserRq) {
	return httpService.put<UpdateUserRs>(`${ControllerPath}/${id}`, payload);
}

async function getUserDataById(payload: UserDetailsRq, signal?: AbortSignal) {
	return httpService.get<UserDetailsRs>(`${ControllerPath}/${payload?.id}`, {
		signal,
	});
}

async function validatePassword(payload: ValidatePasswordRq) {
	return httpService.get<ValidatePasswordRs>(`${ControllerPath}/validate/password`, {
		params: { password: payload.password },
	});
}

async function updatePassword(payload: UpdatePasswordRq) {
	return httpService.post<void>(`${ControllerPath}/resetpassword`, payload);
}

async function generatePassword(config?: AxiosRequestConfig) {
	return httpService.get<GeneratePasswordRs>(`${ControllerPath}/generatepassword`, config);
}

async function changeUserStatus(payload: ChangeUserStatusRq) {
	return httpService.put<void>(`${ControllerPath}/change-user-status`, payload);
}

async function changeLoginAccess(payload: ChangeUserLoginAccessRq) {
	return httpService.put<void>(`${ControllerPath}/change-login-status`, payload);
}

async function deleteUser(params: string[]) {
	return httpService.delete<void>(`${ControllerPath}`, {
		data: params,
	});
}

function changePassword(params: ChangePasswordRq) {
	return httpService.post<ResetPasswordRs>(`${ControllerPath}/changepassword`, params);
}

async function getAllUsers(params: GetAllUsersRq, signal?: AbortSignal) {
	return httpService.get<PaginationRs<GetAllUsersRs>>(`${ControllerPath}/`, {
		params,
		signal,
	});
}

export const UserManagementService = {
	getProfile,
	getAllUserActivity,
	getUserGroupList,
	getUsersList,
	updateUser,
	createNewUser,
	changeUserStatus,
	updatePassword,
	getUserDataById,
	validatePassword,
	generatePassword,
	changeLoginAccess,
	deleteUser,
	getAllUsers,
	changePassword,
};
