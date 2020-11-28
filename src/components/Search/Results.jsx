import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./search.module.scss";

const Results = ({ results, isLoading, resetQuery }) => {
  return (
    <div className={styles.__results__container}>
      {isLoading && <p>...Fetching results</p>}
      {results?.map((result) => (
        <Link
          onClick={resetQuery}
          to={`/details/${result.country}/${result.name}`}
        >
          {result.name}, {result.country}
        </Link>
      ))}
    </div>
  );
};

export default Results;
