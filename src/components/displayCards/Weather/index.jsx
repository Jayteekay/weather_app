import React from "react";
import Card from "../../../elements/Card";
import { WEATHER_VECTOR_MAP } from "../../../utils/constants";
import styles from "./weather.module.scss";

const Weather = ({
  weather_code,
  descriptions = [],
  cloudcover,
  feelslike,
}) => {
  const image = weather_code && WEATHER_VECTOR_MAP[weather_code];
  return (
    <>
      <h5>Weather</h5>
      <Card className={styles._}>
        {image && <img src={image} alt="Weather" />}
        <div>
          <h2>{descriptions.map((description) => description)}</h2>
          <p>Cloud Cover: {cloudcover}</p>
          <p>Feels Like: {feelslike}</p>
        </div>
      </Card>
    </>
  );
};

export default Weather;
