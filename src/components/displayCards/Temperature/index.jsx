import React from "react";
import { useSelector } from "react-redux";
import Card from "../../../elements/Card";
import {
  TEMPERATURE_UNIT_CELCIUS,
  TEMPERATURE_UNIT_FAHRENHEIT,
  WEATHER_VECTOR_MAP,
} from "../../../utils/constants";
import {
  classifyTemperature,
  convertTemperature,
} from "../../../utils/functions";
import styles from "./temperature.module.scss";

const Temperature = ({ value }) => {
  const temperatureClassification = classifyTemperature(value);
  const unit = useSelector((state) => state.temperatureUnit);
  const switches = [
    {
      title: <>&#8451;</>,
      identifier: TEMPERATURE_UNIT_CELCIUS,
    },
    {
      title: <>&#8457;</>,
      identifier: TEMPERATURE_UNIT_FAHRENHEIT,
    },
  ];
  const currentUnit = switches.find((swtch) => swtch.identifier === unit);
  return (
    <div data-testid="temperature">
      <h5>Temperature</h5>
      <Card
        style={
          temperatureClassification
            ? {
                background: temperatureClassification.gradient,
              }
            : {}
        }
        className={styles._}
      >
        <svg
          width="14"
          height="22"
          viewBox="0 0 14 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 4C3 2.93913 3.42143 1.92172 4.17157 1.17157C4.92172 0.421427 5.93913 0 7 0C8.06087 0 9.07828 0.421427 9.82843 1.17157C10.5786 1.92172 11 2.93913 11 4V9.255C12.223 10.1066 13.1423 11.3262 13.6241 12.7365C14.1059 14.1467 14.125 15.6739 13.6788 17.0958C13.2325 18.5176 12.3441 19.76 11.1429 20.642C9.94163 21.524 8.49026 21.9996 7 21.9996C5.50974 21.9996 4.05837 21.524 2.85714 20.642C1.6559 19.76 0.767498 18.5176 0.32123 17.0958C-0.125038 15.6739 -0.105877 14.1467 0.375923 12.7365C0.857723 11.3262 1.77702 10.1066 3 9.255V4ZM4.144 10.895C3.27017 11.5031 2.61325 12.3742 2.26885 13.3816C1.92446 14.3889 1.91058 15.4799 2.22924 16.4957C2.5479 17.5115 3.18245 18.399 4.04053 19.0291C4.89861 19.6593 5.93541 19.9991 7 19.9991C8.06459 19.9991 9.10139 19.6593 9.95947 19.0291C10.8175 18.399 11.4521 17.5115 11.7708 16.4957C12.0894 15.4799 12.0755 14.3889 11.7311 13.3816C11.3868 12.3742 10.7298 11.5031 9.856 10.895L9 10.298V4C9 3.46957 8.78929 2.96086 8.41421 2.58579C8.03914 2.21071 7.53043 2 7 2C6.46957 2 5.96086 2.21071 5.58579 2.58579C5.21071 2.96086 5 3.46957 5 4V10.298L4.144 10.895ZM6 11.126V4H8V11.126C8.94049 11.3717 9.75939 11.9514 10.3038 12.7567C10.8482 13.562 11.0809 14.5379 10.9584 15.5022C10.836 16.4665 10.3667 17.3533 9.63828 17.997C8.90985 18.6406 7.97206 18.9972 7 19C6.02573 19.001 5.08461 18.6463 4.35327 18.0026C3.62194 17.3589 3.15067 16.4705 3.02792 15.504C2.90517 14.5375 3.13939 13.5594 3.68661 12.7533C4.23383 11.9472 5.05642 11.3686 6 11.126ZM7 17C7.53043 17 8.03914 16.7893 8.41421 16.4142C8.78929 16.0391 9 15.5304 9 15C9 14.4696 8.78929 13.9609 8.41421 13.5858C8.03914 13.2107 7.53043 13 7 13C6.46957 13 5.96086 13.2107 5.58579 13.5858C5.21071 13.9609 5 14.4696 5 15C5 15.5304 5.21071 16.0391 5.58579 16.4142C5.96086 16.7893 6.46957 17 7 17Z"
            fill={
              temperatureClassification
                ? temperatureClassification.color
                : "#C4C4C4"
            }
          />
        </svg>
        <span
          className={styles.__description}
          style={
            temperatureClassification
              ? {
                  color: temperatureClassification.color,
                }
              : {}
          }
        >
          {temperatureClassification?.description}
        </span>

        <span className={styles.__value}>
          {value === 0 || value ? (
            <>
              {convertTemperature(value, unit)}
              {currentUnit?.title}
            </>
          ) : (
            "N/A"
          )}
        </span>
      </Card>
    </div>
  );
};

export default Temperature;
