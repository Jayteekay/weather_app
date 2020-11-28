import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../elements/Card";
import useCities from "../../hooks/useCities";
import useFetch from "../../hooks/useFetch";
import { GET_CITY_SUCCESSFUL } from "../../redux/actions/types";
import {
  SECTION_TITLE_FAVORITES,
  SECTION_TITLE_SUGGESTIONS,
  TEMPERATURE_UNIT_CELCIUS,
  TEMPERATURE_UNIT_FAHRENHEIT,
} from "../../utils/constants";
import { GET_CITY_DATA, GET_CITY_DATA_WITH_QUERY } from "../../utils/endpoints";
import {
  classifyTemperature,
  convertTemperature,
  utcMinutesAgo,
} from "../../utils/functions";
import styles from "./city.module.scss";

const City = ({
  temperature,
  name,
  country,
  category,
  last_updated,
  utc_offset,
}) => {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.temperatureUnit);
  const { update, trash } = useCities();
  const { success, dispatchFetch } = useFetch(
    `${GET_CITY_DATA_WITH_QUERY}${name}`
  );

  const temperatureClassification = classifyTemperature(temperature);

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

  const difference = utcMinutesAgo(last_updated, utc_offset);

  const trashCity = (e) => {
    e.preventDefault();
    trash({ name, country });
  };
  const addToFavourites = (e) => {
    e.preventDefault();
    category === SECTION_TITLE_SUGGESTIONS &&
      update({ name, country, category: SECTION_TITLE_FAVORITES });
  };

  useEffect(() => {
    (!last_updated || difference > 15) && dispatchFetch();
  }, []);

  useEffect(() => {
    if (success) {
      dispatch({
        type: GET_CITY_SUCCESSFUL,
        payload: { ...success.location, ...success.current, category },
      });
      update({
        ...success.location,
        ...success.current,
        category,
      });
    }
  }, [success]);

  return (
    <Link data-testid="city_card" to={`/details/${country}/${name}`}>
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
        <div className={styles.__actions}>
          <button onClick={trashCity}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.40994 7L12.7099 2.71C12.8982 2.5217 13.004 2.2663 13.004 2C13.004 1.7337 12.8982 1.47831 12.7099 1.29C12.5216 1.1017 12.2662 0.995911 11.9999 0.995911C11.7336 0.995911 11.4782 1.1017 11.2899 1.29L6.99994 5.59L2.70994 1.29C2.52164 1.1017 2.26624 0.995911 1.99994 0.995911C1.73364 0.995911 1.47824 1.1017 1.28994 1.29C1.10164 1.47831 0.995847 1.7337 0.995847 2C0.995847 2.2663 1.10164 2.5217 1.28994 2.71L5.58994 7L1.28994 11.29C1.19621 11.383 1.12182 11.4936 1.07105 11.6154C1.02028 11.7373 0.994141 11.868 0.994141 12C0.994141 12.132 1.02028 12.2627 1.07105 12.3846C1.12182 12.5064 1.19621 12.617 1.28994 12.71C1.3829 12.8037 1.4935 12.8781 1.61536 12.9289C1.73722 12.9797 1.86793 13.0058 1.99994 13.0058C2.13195 13.0058 2.26266 12.9797 2.38452 12.9289C2.50638 12.8781 2.61698 12.8037 2.70994 12.71L6.99994 8.41L11.2899 12.71C11.3829 12.8037 11.4935 12.8781 11.6154 12.9289C11.7372 12.9797 11.8679 13.0058 11.9999 13.0058C12.132 13.0058 12.2627 12.9797 12.3845 12.9289C12.5064 12.8781 12.617 12.8037 12.7099 12.71C12.8037 12.617 12.8781 12.5064 12.9288 12.3846C12.9796 12.2627 13.0057 12.132 13.0057 12C13.0057 11.868 12.9796 11.7373 12.9288 11.6154C12.8781 11.4936 12.8037 11.383 12.7099 11.29L8.40994 7Z"
                fill="#222831"
              />
            </svg>
          </button>
          {category == SECTION_TITLE_SUGGESTIONS && (
            <button onClick={addToFavourites}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0.5C10.1858 0.499914 10.368 0.55161 10.5261 0.649289C10.6842 0.746969 10.8119 0.886767 10.895 1.053L13.473 6.211L19.144 7.035C19.3287 7.06182 19.5022 7.1398 19.6449 7.2601C19.7876 7.38041 19.8938 7.53825 19.9514 7.71576C20.009 7.89327 20.0159 8.08337 19.9711 8.26456C19.9263 8.44574 19.8317 8.61078 19.698 8.741L15.571 12.765L16.499 18.439C16.5288 18.6227 16.5068 18.811 16.4354 18.9829C16.364 19.1547 16.2461 19.3032 16.0949 19.4117C15.9437 19.5202 15.7653 19.5843 15.5796 19.5969C15.3939 19.6095 15.2085 19.5701 15.044 19.483L10 16.807L4.956 19.483C4.79155 19.5701 4.60606 19.6095 4.4204 19.5969C4.23475 19.5843 4.05629 19.5202 3.9051 19.4117C3.75391 19.3032 3.63599 19.1547 3.5646 18.9829C3.49321 18.811 3.47118 18.6227 3.501 18.439L4.429 12.765L0.302 8.741C0.168297 8.61078 0.0737039 8.44574 0.0289223 8.26456C-0.0158593 8.08337 -0.00904225 7.89327 0.0486023 7.71576C0.106247 7.53825 0.212418 7.38041 0.355105 7.2601C0.497792 7.1398 0.6713 7.06182 0.856 7.035L6.526 6.211L9.106 1.053C9.18899 0.886919 9.31658 0.747222 9.47447 0.649552C9.63237 0.551883 9.81434 0.500099 10 0.5ZM10 3.736L8.082 7.572C8.01002 7.71626 7.90422 7.84099 7.77363 7.93553C7.64304 8.03008 7.49153 8.09165 7.332 8.115L3.148 8.723L6.198 11.696C6.31326 11.8083 6.39972 11.9468 6.45003 12.0996C6.50035 12.2525 6.51303 12.4152 6.487 12.574L5.8 16.771L9.531 14.791C9.67543 14.7143 9.83647 14.6742 10 14.6742C10.1635 14.6742 10.3246 14.7143 10.469 14.791L14.2 16.771L13.513 12.574C13.4871 12.4154 13.4999 12.2528 13.5502 12.1001C13.6005 11.9475 13.6869 11.8092 13.802 11.697L16.852 8.723L12.669 8.115C12.5095 8.09165 12.358 8.03008 12.2274 7.93553C12.0968 7.84099 11.991 7.71626 11.919 7.572L10 3.736Z"
                  fillRule="nonzero"
                  fill="#9E9E9E"
                />
              </svg>
            </button>
          )}
        </div>

        <span className={styles.__value}>
          {temperature === 0 || temperature ? (
            <>
              {convertTemperature(temperature, unit)}
              {currentUnit?.title}
            </>
          ) : (
            "N/A"
          )}
        </span>
        <h4 className={styles.__name}>
          {name}, {country}
        </h4>
      </Card>
    </Link>
  );
};

export default City;
