import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from '../apiConstants';

// Docs for Request config can be found here: https://axios-http.com/docs/req_config

/**
 * Hook for calling get requests on api. Fetches data on page load.
 * @param request Axios request config.
 * @return [result, loaded, error, setResult]
 */
export function useApiGetRequest(request){
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null); // Todo get rid of error? Check for errors only in response?
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("useApiGetRequest", request)
    callApi(request, setResult, setError, setLoaded)
      .catch((e) => console.log("Error during get call",e))
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
    console.log("useApiPostRequest", request)
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
    console.log(`${request.url} RESULT: `, result)
  } catch (err) {
    error = err;
    console.log(`${request.url} ERROR: `, err)
  } finally {
    setResult(result)
    setError(error)
    setLoaded(true)
  }
  if (error) return Promise.reject(error);
  return Promise.resolve(result);
}
