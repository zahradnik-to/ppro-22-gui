import RequestHandler from "./entities/ApiRequestHandler";
import useApiResult from "./hooks/useApiResult";

/**
 * @param params
 * @return {[Event ,error]}
 */
export function useGetEvent(params) {
  const request = RequestHandler.Event.Get;
  if (params) request.params = params;
  return useApiResult(request)
}

/**
 * @param data
 * @return {[ [{Event}] ,error]}
 */
export function useListEvents(data) {
  const request = RequestHandler.Event.List;
  if (data) request.data = data
  return useApiResult(request)
}

export function useCreateEvents(data) {
  const request = RequestHandler.Event.List;
  if (data) request.data = data
  return useApiResult(request)
}

export function useUpdateEvents(data) {
  const request = RequestHandler.Event.List;
  if (data) request.data = data
  return useApiResult(request)
}

export function useDeleteEvents(data) {
  const request = RequestHandler.Event.List;
  if (data) request.data = data
  return useApiResult(request)
}