import { ApiRoutes } from "../Constants";
import { IRequest, RequestMethod } from "../interface/IRequest";
import sendRequest from "./request";

export const createUser = async (userDetails: any, role: string) => {
  const userDetailsWithRole = { ...userDetails, roles: role };

  const request: IRequest = {
    method: RequestMethod.POST,
    message: userDetailsWithRole,
    url: ApiRoutes.ADD_USER_ROUTE,
    isAuthRequired: true,
  };
  const response = await sendRequest(request);

  if (response.status == 200) {
    return { success: true, data: "User addition successful" };
  }
  console.log(
    `User addition failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response.data.data.metadata.errors[0])}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};

export const signinUser = async (username: String, password: String) => {
  const request: IRequest = {
    method: RequestMethod.POST,
    message: { username: username, password: password },
    url: ApiRoutes.LOGIN_USER_ROUTE,
  };
  const response = await sendRequest(request);

  if (response.status == 200) {
    return { success: true, data: response.data.data };
  }
  console.log(
    `User login failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response.data.data.metadata.errors[0])}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};

export const sendCode = async (username: String) => {
  const request: IRequest = {
    method: RequestMethod.POST,
    message: { userName: username },
    url: ApiRoutes.FORGOT_PASSWORD_ROUTE,
  };
  const response = await sendRequest(request);

  if (response.status == 200) {
    return { success: true, data: response.data.data };
  }

  console.log(
    `Code sending failed failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response.data.data.metadata.errors[0])}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};

export const resetPassword = async (
  verificationCode: String,
  password: String,
  username: String
) => {
  const request: IRequest = {
    method: RequestMethod.POST,
    message: {
      token: verificationCode,
      newPassword: password,
      userName: username,
    },
    url: ApiRoutes.RESET_PASSWORD_ROUTE,
  };
  const response = await sendRequest(request);

  if (response.status == 200) {
    return { success: true, data: response.data.data };
  }

  console.log(
    `Password reset failed failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response.data.data.metadata.errors[0])}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};

export const updateUser = async (userDetails: any) => {
  const request: IRequest = {
    method: RequestMethod.PATCH,
    message: userDetails,
    url: ApiRoutes.USER_BASE_ROUTE,
    isAuthRequired: true,
  };
  const response = await sendRequest(request);

  if (response.status == 200) {
    return {
      success: true,
      data: {
        message: "User update successful",
        userDetails: response.data.data.userDetail,
      },
    };
  }
  console.log(
    `User registration failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response.data.data.metadata.errors[0])}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};
