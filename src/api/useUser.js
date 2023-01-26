import RequestHandler from "./entities/ApiRequestHandler";
import {useApiGetRequest, useApiPostRequest} from "./hooks/useApiRequest";

/**
 * @param params
 * @return {[User ,error]}
 */
export function useGetUser(params) {
  const request = RequestHandler.User.Get;
  if (params) request.params = params;
  return useApiGetRequest(request)
}

export function useGetMyOrders(params) {
  const request = RequestHandler.User.MyOrders;
  if (params) request.params = params;
  return useApiGetRequest(request)
}

export function useListUsers() {
  const request = RequestHandler.User.List
  return useApiGetRequest(request)
}

export function useRegisterUser() {
  const request = RequestHandler.User.Register;
  return useApiPostRequest(request)
}

export function useLoginUser() {
  const request = RequestHandler.User.Login;
  return useApiPostRequest(request)
}

export function useLogoutUser() {
  const request = RequestHandler.User.Logout;
  return useApiPostRequest(request)
}

export function useUpdateUserInfo() {
  const request = RequestHandler.User.UpdateInfo;
  return useApiPostRequest(request)
}

export function useUpdateUserPassword() {
  const request = RequestHandler.User.UpdatePassword;
  return useApiPostRequest(request)
}

export function useDeleteUser() {
  const request = RequestHandler.User.Delete;
  return useApiPostRequest(request)
}

export function useUpdateRole() {
  const request = RequestHandler.User.UpdateRole;
  return useApiPostRequest(request)
}