import RequestHandler from "./entities/ApiRequestHandler";
import {useApiGetRequest, useApiPostRequest} from "./hooks/useApiRequest";

/**
 * @param params
 * @return {[Event ,error]}
 */
export function useGetEvent(params) {
  const request = RequestHandler.Event.Get;
  if (params) request.params = params;
  return useApiGetRequest(request)
}

/**
 * @param data
 * @return {[ [{Event}] ,error]}
 */
export function useListEvents(data) {
  const request = RequestHandler.Event.List;
  if (data) request.data = data
  return useApiPostRequest(request)
}

export function useCreateEvent(data) {
  const request = RequestHandler.Event.Create;
  if (data) request.data = data
  return useApiPostRequest(request)
}

export function useUpdateEvent() {
  const request = RequestHandler.Event.Update;
  return useApiPostRequest(request)
}

export function useDeleteEvent(data) {
  const request = RequestHandler.Event.Delete;
  if (data) request.data = data
  return useApiPostRequest(request)
}