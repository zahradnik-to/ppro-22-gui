import RequestHandler from "./entities/ApiRequestHandler";
import {useApiGetRequest, useApiPostRequest} from "./hooks/useApiRequest";
import {getMockEvent} from "../mock/mock-helper";

/**
 * @param params
 * @return {[Event ,error]}
 */
export function useGetVariant(params) {
  const request = RequestHandler.Variant.Get;
  if (params) request.params = params;
  return useApiGetRequest(request)
}

/**
 * @param data
 * @return {[ [{Variant}] ,error]}
 */
export function useListVariants(data) {
  const request = RequestHandler.Variant.List;
  if (data) request.data = data
  return useApiGetRequest(request, getMockEvent().offeredPackages)
}

export function useCreateVariant(data) {
  const request = RequestHandler.Variant.Create;
  return useApiPostRequest(request)
}

// Accepts array of objects
export function useUpdateManyVariants() {
  const request = RequestHandler.Variant.Update;
  return useApiPostRequest(request)
}

export function useDeleteVariant(data) {
  const request = RequestHandler.Variant.Delete;
  return useApiPostRequest(request);
}