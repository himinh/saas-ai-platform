import type { AuthUser, Login, Register, SocialLogin } from "~/types/auth.type";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions } from "~/utils/fetch/types";

const authUrl = "/auth";

export const authApi = {
	login: (data: Login, options?: FetchOptions): Promise<AuthUser> => {
		return guestFetch.post(`${authUrl}/login`, data, options);
	},

	socialLogin: (
		data: SocialLogin,
		options?: FetchOptions,
	): Promise<AuthUser> => {
		return guestFetch.post(`${authUrl}/social_login`, data, options);
	},

	register: (data: Register, options?: FetchOptions): Promise<AuthUser> => {
		return guestFetch.post(`${authUrl}/register`, data, options);
	},

	sendRegisterToken: (
		data: Register,
		options?: FetchOptions,
	): Promise<Register> => {
		return guestFetch.post(`${authUrl}/send_register_token`, data, options);
	},

	activateRegisterToken: (
		data: Register,
		options?: FetchOptions,
	): Promise<AuthUser> => {
		return guestFetch.post(`${authUrl}/activate_register_token`, data, options);
	},

	logout: () => {
		return authFetch.post(`${authUrl}/logout`, {});
	},

	refreshToken: (token: string, options?: FetchOptions): Promise<AuthUser> => {
		return guestFetch.post(`${authUrl}/refresh_token`, { token }, options);
	},

	forgotPassword: (
		email: string,
		options?: FetchOptions,
	): Promise<{ email: string }> => {
		return guestFetch.post(`${authUrl}/forgot_password`, { email }, options);
	},

	resetPassword: (
		body: { token: string; password: string },
		options?: FetchOptions,
	): Promise<AuthUser> => {
		return guestFetch.post(`${authUrl}/reset_password`, body, options);
	},
};
