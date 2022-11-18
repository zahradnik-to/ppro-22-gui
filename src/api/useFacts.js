import RequestHandler from "./entities/ApiRequestHandler";
import useApiResult from "./hooks/useApiResult";

function useFacts() {
  const request = RequestHandler.CatFact.Get;
  return useApiResult(request)
}

export default useFacts;