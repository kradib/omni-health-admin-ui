import { ApiRoutes } from "../Constants";
import { IGetUserParams } from "../interface/IGetUserParams";
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
    return { success: true, data: { message: "User addition successful" } };
  }
  console.log(
    `User addition failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response.data.data.metadata.errors[0])}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};

export const updateUser = async (userDetails: any, role: string, userId: string) => {
  const userDetailsWithRole = { ...userDetails, roles: role };

  const request: IRequest = {
    method: RequestMethod.PUT,
    message: userDetailsWithRole,
    url: `${ApiRoutes.UPDATE_USER_ROUTE}/${userId}`,
    isAuthRequired: true,
  };
  const response = await sendRequest(request);

  if (response.status == 200) {
    return { success: true, data: { message: "User updation successful" } };
  }
  console.log(
    `User updation failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response.data.data.metadata.errors[0])}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};

export const signinUser = async (
  username: String,
  password: String,
  masterKey: String
) => {
  const request: IRequest = {
    method: RequestMethod.POST,
    message: { username: username, password: password, masterKey: masterKey },
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
export const getUsers = async (params: IGetUserParams) => {
  const request: IRequest = {
    method: RequestMethod.GET,
    url: ApiRoutes.GET_USER_ROUTE,
    isAuthRequired: true,
    queryParams: params,
  };

  const response = await sendRequest(request);
  if (response.status == 200) {
    return { success: true, data: response.data };
  }
  console.log(
    `Doctor fetching failed due to status: ${
      response.status
    } with error: ${JSON.stringify(response)}`
  );
  return { success: false, data: response.data.data?.metadata?.errors[0] };
};
