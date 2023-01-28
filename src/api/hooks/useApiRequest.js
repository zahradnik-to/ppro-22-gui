import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from '../apiConstants';

/**
 * Hook for calling get requests on api. Fetches data on page load.
 * @param request Axios request config.
 * @return [result, loaded, error, setResult]
 */
export function useApiGetRequest(request){
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    callApi(request, setResult, setError, setLoaded)
      .catch((e) => setError(e))
  }, [request]);

  return [result, loaded, error, setResult];
}

/**
 * Hook for calling post, put, delete requests on api. Hook provides reference to call api.
 * @param request Axios request config.
 * @return {[result, loaded, error, executeCall]}
 */
export function useApiPostRequest(request) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const executeCall = useCallback(async (data, params) => {
    if (data) {
      // Delete null values from data
      Object.keys(data).forEach((k) => data[k] == null && delete data[k]);
      request.data = data
    }
    if (params) request.params = params;
    return callApi(request, setResult, setError, setLoaded)
  }, [])

  return [result, loaded, error, executeCall];
}

async function callApi(request, setResult, setError, setLoaded) {
  request.baseURL = BASE_URL;
  let result = null;
  let error = null;
  try {
    result = await axios(request);
  } catch (err) {
    error = err;
  } finally {
    setResult(result)
    setError(error)
    setLoaded(true)
  }
  if (error) return Promise.reject(error);
  return Promise.resolve(result);
}
