import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from '../apiConstants';

// Todo in case of problems when sending cookie credentials https://github.com/axios/axios/issues/876
// Docs for Request config can be found here: https://axios-http.com/docs/req_config

/**
 * Hook for calling get requests on api. Fetches data on page load.
 * @param request Axios request config.
 * @param mockedResult If supplied, will return this result first
 * @return [result, loaded, error, setResult]
 */
export function useApiGetRequest(request, mockedResult){
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null); // Todo get rid of error? Check for errors only in response?
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("useApiGetRequest", request)
    callApi(request, setResult, setError, setLoaded, mockedResult)
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
  const [result, setResult] = useState({});
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const executeCall = useCallback(async (data, mockedResult) => {
    if (data) {
      // Delete null values from data
      Object.keys(data).forEach((k) => data[k] == null && delete data[k]);
      request.data = data
    }
    console.log("useApiPostRequest", request)
    return callApi(request, setResult, setError, setLoaded, mockedResult)
  }, [])

  return [result, loaded, error, executeCall];
}

async function callApi(request, setResult, setError, setLoaded, mockedResult) {
  request.baseURL = BASE_URL;
  try {
    const res = await axios(request);
    if (mockedResult) setResult(mockedResult) // Todo delete mock
    else setResult(res);
    console.log("callApi: Axios result", res)
    return Promise.resolve(res);
  } catch (err) {
    if (mockedResult) setResult(mockedResult) // Todo delete mock
    setError(err.message);
    console.log("callApi: Axios error", err)
    return Promise.reject(err);
  } finally {
    setLoaded(true);
  }
}
