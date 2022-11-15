import useApiResult from "./useApiResult";
import RequestHandler from "../entities/EntityRequestHandler";

function useFacts() {
  const request = RequestHandler.CatFact.Get;
  return useApiResult(request)
}

export default useFacts;