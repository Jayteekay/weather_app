/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * @param {string} endpoint Endpoint
 * @param {object{}} [options = {}] Fetch options (optional)
 * @param {string} [baseURL = ''] Base url (optional)
 */
const useFetch = (
  endpoint,
  options = {},
  baseURL = "https://lendbak-api.workcube.com.ng/api/v1"
) => {
  const token = useSelector(state=>  state.auth?.token);

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //Set default fetch options
  let predefinedOptions = {
    method: "GET",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "X-Requested-With": "XMLHttpRequest"
    }
  };

  //Override options
  options = { ...predefinedOptions, ...options };

  const dispatchFetch = (body = new FormData()) => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(baseURL + endpoint, options);
        const json = await res.json();
        if(res.ok){
          setError(null);
          setResponse(json);
          setIsLoading(false);
        }else{
          setError(json);
          setResponse(null);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error)
        setError(error);
        setResponse(null);
        setIsLoading(false);
      }
    };

    fetchData();
  };
  let success = response;

  return {success, error, isLoading, dispatchFetch};
};
export default useFetch;