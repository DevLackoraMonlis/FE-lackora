import type { PaginationRq } from "@/http/end-points/GeneralService.types";

export type UserManagementProfileRs = {
	id: string;
	username: string;
	created_time: string;
	email: string;
	last_login: string;
	valid_until: string;
	login_count: number;
	organization: string;
	name: string;
	familyname: string;
	department: string;
	last_login_ip: string;
};

export type ActivityRq = {
	user_id: string;
} & PaginationRq;

export type UserActivityRs = {
	id: string;
	ipv4: string;
	message: string;
	action: string;
	module: string;
	browser: string;
	created_time: string;
	username: string;
};

export type UsersListRs = {
	id: string;
	username: string;
	created_time?: string;
	email?: string;
	last_login?: string;
	valid_until?: string;
	login_count?: number;
	organization?: string;
	name?: string;
	familyname?: string;
	department?: string;
	last_ip?: null;
	job_position?: string;
	phone?: string;
	description?: string;
	password_change?: boolean;
	disabled?: boolean;
	creator?: string;
	updated_time?: string;
	viewer?: string;
	last_view?: string;
	display_name?: string;
	status?: string;
	login_enabled?: boolean;
	failed_login?: number;
	type?: string;
	updater?: string;
};

export type GroupRs = {
	id: string;
	name: string;
	description: string;
	status: "active" | "inactive";
	creator: string;
	last_view: string;
	viewer: string;
	created_time: string;
	updated_time: string;
	members: number;
	placement: string;
};

export type UpdateUserRq = UpdateAndCreateUserRs;
export type UpdateUserRs = UpdateAndCreateUserRs;

export type CreateNewUserRq = {
	username: string;
	display_name: string;
	password: string;
	email: string;
	password_change: boolean;
	email_notification: boolean;
	disabled?: boolean;
	name: string;
	familyname: string;
	phone: string;
	job_position: string;
	organization?: string;
	description?: string | null;
	roles?: string[];
	groups?: GroupRs[];
	status?: UserStatus;
	gender?: "male" | "female" | "other";
};

export type UserDetailsRq = { id?: string };

export type UserDetailsRs = {
	id?: string;
	username: string;
	password?: string;
	created_time: string;
	email?: string;
	last_login: string;
	valid_until?: string;
	login_count: number;
	organization?: string;
	name: string;
	familyname: string;
	department?: string;
	last_ip?: null;
	job_position: string;
	phone: string;
	description?: null;
	password_change?: boolean;
	disabled?: boolean;
	creator: string;
	updated_time: string;
	viewer?: string;
	last_view?: string;
	display_name?: string;
	status: string;
	login_enabled?: boolean;
	failed_login?: number;
	updater?: string;
};

export type ValidatePasswordRs = {
	length_check: boolean;
	uppercase_check: boolean;
	lowercase_check: boolean;
	numeric_check: boolean;
	special_char_check: boolean;
};

export type GeneratePasswordRs = {
	password: string;
};

export type LoginStatusRq = {
	status: "enabled" | "disabled";
};

export type GroupPanelRs = {
	id: string;
	name: string;
	description: string | null;
	status: boolean;
	role?: RoleRs;
};

export type RoleRs = {
	id: string;
	name: string;
	description: string;
	created_time: string;
	updated_time: string;
	creator: string;
	viewer: string;
	last_view: string;
	rbac: [];
	abac: [];
};

export type UpdateAndCreateUserRs = Omit<CreateNewUserRq & { id: string }, "roles" | "groups">;

export type UpdatePasswordRq = {
	password: string;
	password_change: boolean;
	email_notification: boolean;
	user_id: string;
};

export type ChangeUserStatusRq = {
	user_ids: string[];
	status: UserStatus;
};

export type UserStatus = "all" | "active" | "inactive" | "locked";

export type ChangeUserLoginAccessRq = {
	user_ids: string[];
	status: "enabled" | "disabled";
};

export type GetTokenRq = {
	username: string;
	password: string;
};

type TokenProfileRs = {
	id: string;
	username: string;
	roles: string[];
	created_time: string;
	email: string;
	last_login: string;
	valid_until: string;
	login_count: number;
	organization: string;
	name: string;
	familyname: string;
	department: string;
	last_login_ip: string;
	password_change: boolean;
	platform: string;
	version: string;
	updatedOn: string;
};

export type GetTokenRs = {
	access_token: string;
	refresh_token: string;
	token_type: "bearer";
	profile: TokenProfileRs;
};

export type ChangePasswordRq = {
	old_password: string;
	new_password: string;
};

export type ValidatePasswordRq = {
	password: string;
};

export type GetAllUsersRq = {
	page: number;
	limit: number;
	name: string;
};

export type ResetPasswordRs = {
	status: number;
	message: string;
};

export type GetAllUsersRs = {
	id: string;
	username: string;
	created_time: string;
	email: string;
	last_login: string;
	valid_until: string;
	login_count: number;
	organization: string;
	name: string;
	familyname: string;
	department: string;
	last_ip: string;
	job_position: string;
	phone: string;
	description: string;
	password_change: boolean;
	disabled: boolean;
	creator: string;
	updated_time: string;
	viewer: string;
	last_view: string;
	display_name: string;
	status: string;
	type: string;
};
