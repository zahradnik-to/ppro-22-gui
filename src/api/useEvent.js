import RequestHandler from "./entities/ApiRequestHandler";
import {useApiGetRequest, useApiPostRequest} from "./hooks/useApiRequest";
import {getMockEvent} from "../mock/mock-helper";

/**
 * @param params
 * @return {[Event ,error]}
 */
export function useGetEvent(params) {
  const request = RequestHandler.Event.Get;
  if (params) request.params = params;
  return useApiGetRequest(request, getMockEvent())
}

/**
 * @param data
 * @return {[ [{Event}] ,error]}
 */
export function useListEvents(params) {
  const request = RequestHandler.Event.List;
  if (params) request.params = params;
  return useApiPostRequest(request)
}

export function useCreateEvent(data) {
  const request = RequestHandler.Event.Create;
  return useApiPostRequest(request)
}

export function useUpdateEvent() {
  const request = RequestHandler.Event.Update;
  return useApiPostRequest(request)
}

export function useDeleteEvent(data) {
  const request = RequestHandler.Event.Delete;
  return useApiPostRequest(request)
}