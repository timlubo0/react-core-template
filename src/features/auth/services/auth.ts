import { api } from "../../../api/api";
import { endPoints } from "../../../api/endPoints";
import { ILogin, IPasswordReset, IUser } from "../types";

export type LoginResponse = {
  status?: boolean;
  user: string;
  access_token?: string;
  message?: string;
};

export const authService = {
  login: (credentials: ILogin): Promise<LoginResponse> =>
    api.post({ endPoint: endPoints.login, data: credentials }),
  resetPassword: (payload: IPasswordReset): Promise<{ status: boolean }> =>
    api.post({ endPoint: endPoints.passwordReset, data: payload }),
  otp: (payload: { email: string }): Promise<{ status: boolean }> =>
    api.post({ endPoint: endPoints.otpPasswordReset, data: payload }),
};
