import {useEffect, useState} from "react";
import axios from "axios";

const useApiResult = (request) => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios(request)
      .then((response) => handleResponse(response))
      .catch((err) => handleException(err));
  }, [request]);

  function handleResponse(response) {
    setResults(response)
    if (response.status === 200) {
      setResults(response.data);
      setError(null);
    } else {
      setError({status: response.status});
    }

  }
  function handleException(err) {
    setError(err.message);
  }

  return [results, error];
};

export default useApiResult;