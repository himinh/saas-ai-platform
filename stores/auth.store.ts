import { authApi } from "~/apis/auth.api";
import type {
	AuthUser,
	Login,
	Register,
	ResetPassword,
	SocialLogin,
} from "~/types/auth.type";
import { handleError } from "~/utils/handleError";
import { storageUtil } from "~/utils/storage.util";

export const useAuthStore = defineStore("auth", () => {
	const forgotPassSent = reactive({ isSent: false, email: "" });
	const authUser = ref<AuthUser | null>(storageUtil.getAuth());
	const loading = ref<boolean>(false);

	const login = async (inputs: Login) => {
		const data = await _asyncHandler(() => authApi.login(inputs));

		if (data) _setAuth(data);
	};

	const socialLogin = async (inputs: SocialLogin) => {
		const data = await _asyncHandler(() => authApi.socialLogin(inputs));

		if (data) _setAuth(data);
	};

	const register = async (inputs: Register) => {
		const data = await _asyncHandler(() => authApi.register(inputs));

		if (data) _setAuth(data.value!);
	};

	const logout = async () => {
		await useAsyncData(() => authApi.logout());

		navigateTo("/auth/login");
		_clearAuth();
	};

	const forgotPassword = async (email: string) => {
		const data = await _asyncHandler(() => authApi.forgotPassword(email));

		if (data) setForgotPassSent(true, data.email);
	};

	const resetPassword = async (inputs: ResetPassword) => {
		const data = await _asyncHandler(() => authApi.resetPassword(inputs));

		if (data) {
			_setAuth(data);

			return data;
		}
	};

	const getAccessToken = async () => {
		if (!authUser.value) return null;

		const currentMS = new Date().getTime();
		const { accessToken, refreshToken } = authUser.value;

		if (accessToken.expiresAt > currentMS) return accessToken.token;

		if (refreshToken.expiresAt < currentMS) {
			_clearAuth();
			return null;
		}

		const data = await refreshAuthByRfToken(refreshToken.token);

		if (data) return data.accessToken.token;

		_clearAuth();
		return null;
	};

	const refreshAuthByRfToken = async (rfToken: string) => {
		try {
			const data = await authApi.refreshToken(rfToken);

			_setAuth(data);

			return data;
		} catch (error) {
			handleError(error);
			_clearAuth();

			return null;
		}
	};

	/**
	 * Set auth
	 *
	 * @param data
	 */
	const _setAuth = (data: AuthUser) => {
		authUser.value = { ...authUser.value, ...data };
		storageUtil.setAuth(authUser.value);
	};

	/**
	 * Clear auth
	 */
	const _clearAuth = () => {
		storageUtil.clearAuth();
		authUser.value = null;
	};

	const setForgotPassSent = (isSent: boolean, email?: string) => {
		forgotPassSent.isSent = isSent;

		if (email) forgotPassSent.email = email;
	};

	/**
	 * async handler
	 *
	 * @param handler
	 * @returns
	 */
	const _asyncHandler = async (handler: () => Promise<any>) => {
		loading.value = true;

		const { data, error } = await useAsyncData(handler);

		loading.value = false;

		if (error.value) {
			handleError(error.value);
			return null;
		}

		return data.value;
	};

	return {
		authUser,
		loading,
		login,
		register,
		logout,
		getAccessToken,
		setForgotPassSent,
		forgotPassword,
		forgotPassSent,
		resetPassword,
		socialLogin,
	};
});
