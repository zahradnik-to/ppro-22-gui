import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from '../apiConstants';

// Todo in case of problems when sending cookie credentials https://github.com/axios/axios/issues/876

/**
 * Docs for Request config can be found here: https://axios-http.com/docs/req_config
 * @param request Axios request config.
 * @return {[result,error]}
 */
const useApiRequest = (request) => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    request.baseURL = BASE_URL;
    axios(request)
      .then((response) => handleResponse(response))
      .catch((err) => handleException(err));
  }, [request]);

  function handleResponse(response) {
    setResults(response)
    if (response.status === 200) {
      setResults(response.data);
      setLoaded(true)
      setError(null);
    } else {
      setLoaded(true)
      setError({status: response.status});
    }

  }
  function handleException(err) {
    setLoaded(true)
    setError(err.message);
  }

  return [results, loaded, error];
};

export default useApiRequest;