import React, { useEffect, useRef, useState } from "react";
import Results from "./Results";
import styles from "./search.module.scss";
import useFetch from "../../hooks/useFetch";
import { GET_AUTOCOMPLETE } from "../../utils/endpoints";

const Search = () => {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef();

  const { success, error, isLoading, dispatchFetch } = useFetch(
    GET_AUTOCOMPLETE
  );
  const handleInput = (e) => {
    setValue(e.target.value);
  };
  const resetQuery = () => {
    setValue("");
  };
  useEffect(() => {
    success && setIsError(false);
  }, [success]);
  useEffect(() => {
    error && setIsError(true);
  }, [error]);
  useEffect(() => {
    if (value && value.length >= 4) {
      const performSearch = setTimeout(() => dispatchFetch(value), 250);
      return () => clearTimeout(performSearch);
    }
  }, [value]);

  useEffect(() => {
    if (searchRef.current) {
      function handleClickOutside(event) {
        if (!searchRef.current.contains(event.target)) {
          setIsFocused(false);
        }else{
          setIsFocused(true);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [searchRef]);

  return (
    <div
      data-testid="search"
      ref={searchRef}
      className={`${styles._} ${value ? "typing" : ""}`}
    >
      <div className={styles.__container}>
        <input
          placeholder="Search for places"
          onChange={handleInput}
          value={value}
        />
        {value && isFocused ? (
          <div data-testid="results" className={styles.__results}>
            {!isError ? (
              <Results
                resetQuery={resetQuery}
                results={isLoading ? [] : success?.results || []}
                isLoading={isLoading}
              />
            ) : (
              <p>Unable to fetch result</p>
            )}
          </div>
        ) : (
          <div data-testid="icon" className={styles.__icon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z"
                fill="white"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
