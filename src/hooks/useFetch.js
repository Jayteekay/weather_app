/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";

/**
 * @param {string} endpoint Endpoint
 * @param {object{}} [options = {}] Fetch options (optional)
 * @param {string} [baseURL = ''] Base url (optional)
 */
const useFetch = (
  endpoint,
  options = {},
  baseURL = "https://cors-anywhere.herokuapp.com/https://api.weatherstack.com/"
) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //Set default fetch options
  let predefinedOptions = {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "X-Requested-With": "XMLHttpRequest",
    },
  };

  //Override options
  options = { ...predefinedOptions, ...options };

  const dispatchFetch = (query) => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(
          baseURL + endpoint + (query ? `&query=${query}` : ""),
          options
        );
        const json = await res.json();
        if (res.ok) {
          setError(null);
          setResponse(json);
          setIsLoading(false);
        } else {
          setError(json);
          setResponse(null);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error);
        setResponse(null);
        setIsLoading(false);
      }
    };

    fetchData();
  };
  let success = response;

  return { success, error, isLoading, dispatchFetch };
};
export default useFetch;
