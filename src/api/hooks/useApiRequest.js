import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from '../apiConstants';

// Todo in case of problems when sending cookie credentials https://github.com/axios/axios/issues/876
// Docs for Request config can be found here: https://axios-http.com/docs/req_config

/**
 * Hook for calling get requests on api. Fetches data on page load.
 * @param request Axios request config.
 * @return {[result, loaded, error]}
 */
export function useApiGetRequest(request){
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    callApi(request, setResult, setError, setLoaded)
  }, [request]);

  return [result, loaded, error];
};


/**
 * Hook for calling post, put, delete requests on api. Hook provides reference to call api.
 * @param request Axios request config.
 * @return {[result, loaded, error]}
 */
export function useApiPostRequest(request) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const executeCall = useCallback((data) => {
    if (data) {
      // Delete null values from data
      Object.keys(data).forEach((k) => data[k] == null && delete data[k]);
      request.data = data
    }
    console.log("useApiPostRequest", request)
    callApi(request, setResult, setError, setLoaded)
  }, [])

  return [result, loaded, error, executeCall];
}

function callApi(request, setResult, setError, setLoaded) {
  request.baseURL = BASE_URL;
  axios(request)
    .then((response) => handleResponse(response, setResult, setError))
    .catch((err) => setError(err.message))
    .finally(() => setLoaded(true));
}

function handleResponse(response, setResult, setError) {
  if (response.status === 200) {
    setResult(response.data);
    setError(null);
  } else {
    setError({status: response.status});
  }
}