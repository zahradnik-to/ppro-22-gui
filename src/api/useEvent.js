import RequestHandler from "./entities/ApiRequestHandler";
import useApiRequest from "./hooks/useApiRequest";

/**
 * @param params
 * @return {[Event ,error]}
 */
export function useGetEvent(params) {
  const request = RequestHandler.Event.Get;
  if (params) request.params = params;
  return useApiRequest(request)
}

/**
 * @param data
 * @return {[ [{Event}] ,error]}
 */
export function useListEvents(data) {
  const request = RequestHandler.Event.List;
  if (data) request.data = data
  return useApiRequest(request)
}

export function useCreateEvent(data) {
  const request = RequestHandler.Event.List;
  if (data) request.data = data
  return useApiRequest(request)
}

export function useUpdateEvent(data) {
  const request = RequestHandler.Event.List;
  if (data) {
    // Delete null values from data
    Object.keys(data).forEach((k) => data[k] == null && delete data[k]);
    if (data) request.data = data
  }
  return useApiRequest(request)
}

export function useDeleteEvent(data) {
  const request = RequestHandler.Event.List;
  if (data) request.data = data
  return useApiRequest(request)
}