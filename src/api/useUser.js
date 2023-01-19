import RequestHandler from "./entities/ApiRequestHandler";
import {useApiGetRequest, useApiPostRequest} from "./hooks/useApiRequest";

/**
 * @param params
 * @return {[User ,error]}
 */
export function useGetUser(params, mockedResponse) {
  const request = RequestHandler.User.Get;
  if (params) request.params = params;
  return useApiGetRequest(request, mockedResponse)
}

export function useListUsers() {
  const request = RequestHandler.User.List
  return useApiPostRequest(request)
}

export function useRegisterUser() {
  const request = RequestHandler.User.Register;
  return useApiPostRequest(request)
}

export function useLoginUser() {
  const request = RequestHandler.User.Login;
  return useApiPostRequest(request)
}

export function useUpdateUser() {
  const request = RequestHandler.User.Update;
  return useApiPostRequest(request)
}

export function useDeleteUser() {
  const request = RequestHandler.User.Delete;
  return useApiPostRequest(request)
}