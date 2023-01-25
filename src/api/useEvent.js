import RequestHandler from "./entities/ApiRequestHandler";
import {useApiGetRequest, useApiPostRequest} from "./hooks/useApiRequest";
/**
 * @param params
 * @return {[Event ,error]}
 */
export function useGetEvent(params, mockedResponse) {
  const request = RequestHandler.Event.Get;
  if (params) request.params = params;
  return useApiGetRequest(request, mockedResponse)
}

export function useGetEventAsSeller(params) {
  const request = RequestHandler.Event.GetAsSeller;
  if (params) request.params = params;
  return useApiGetRequest(request)
}

export function useGetEventsOfSeller(params) {
  const request = RequestHandler.Event.GetEventsOfSeller;
  if (params) request.params = params;
  return useApiGetRequest(request)
}

export function useListEvents(params) {
  const request = RequestHandler.Event.ListEvents;
  if (params) request.params = params;
  return useApiGetRequest(request)
}

export function useCreateEvent(data) {
  const request = RequestHandler.Event.Create;
  return useApiPostRequest(request)
}

export function useUpdateEvent() {
  const request = RequestHandler.Event.Update;
  return useApiPostRequest(request)
}

export function useCancelEvent(data) {
  const request = RequestHandler.Event.Cancel;
  return useApiPostRequest(request)
}