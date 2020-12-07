import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Humidity from "../../components/displayCards/Humidity";
import Pressure from "../../components/displayCards/Pressure";
import Temperature from "../../components/displayCards/Temperature";
import Weather from "../../components/displayCards/Weather";
import Wind from "../../components/displayCards/Wind";
import Note from "../../components/Note";
import useCities from "../../hooks/useCities";
import useFetch from "../../hooks/useFetch";
import { GET_CITY_SUCCESSFUL } from "../../redux/actions/types";
import { SECTION_TITLE_FAVORITES } from "../../utils/constants";
import styles from "./details.module.scss";

const Details = ({ match }) => {
  const { city, country } = match.params;
  const savedData = useSelector((state) =>
    state.cities.data.find((c) => c.name === city && c.country === country)
  );
  const dispatch = useDispatch();
  const { update, currentCity } = useCities();
  const { success, isLoading, dispatchFetch } = useFetch(
    `current?access_key=0b30ec9e56f6561561c2d469cdf3286f&query=${city},${country}`
  );
  const data =
    savedData || (success ? { ...success.location, ...success.current } : {});

  const saveNote = (note, index) => {
    update({
      ...data,
      notes:
        !data.notes || index === data.notes.length
          ? [...(data.notes || []), { value: note }]
          : data.notes.map((n, i) => (i === index ? { value: note } : n)),
    });
  };
  const deleteNote = (index) => {
    update({
      ...data,
      notes: data?.notes?.filter((note, i) => i !== index),
    });
  };

  const addAsFavourite = () => {
    update({ ...data, category: SECTION_TITLE_FAVORITES });
  };

  useEffect(() => {
    const isCurrentCity = currentCity?.city === success?.location.name && currentCity?.country === success?.location.country;
    if (success && (savedData || isCurrentCity)) {
      dispatch({
        type: GET_CITY_SUCCESSFUL,
        payload: { ...success.location, ...success.current },
      });
      update({
        ...success.location,
        ...success.current,
      });
    }
  }, [success]);

  useEffect(() => {
    dispatchFetch();
  }, []);

  return (
    <div data-testid="details" className={styles._}>
      <div data-testid="details-header" className={styles.__header}>
        <h1>
          {city} , {country}
        </h1>
        {!savedData && isLoading && <p>Loading...</p>}
        {data && <p>Last Updated: {data.observation_time}</p>}
      </div>
      <div data-testid="details-actions" className={styles.__actions}>
        {savedData?.category !== SECTION_TITLE_FAVORITES && (
          <button type="button" onClick={addAsFavourite}> + Add to Favourites</button>
        )}
      </div>
      <div data-testid="details-body" className={styles.__details}>
        <Weather
          weather_code={data?.weather_code}
          descriptions={data?.weather_descriptions}
          cloudcover={data?.cloudcover}
          feelslike={data?.feelslike}
        />
        <div className={styles["__details--small"]}>
          <Temperature value={data?.temperature} />
          <Wind
            speed={data?.wind_speed}
            degree={data?.wind_degree}
            dir={data?.wind_dir}
          />
          <Pressure value={data?.pressure} />
          <Humidity value={data?.humidity} />
        </div>
      </div>
      <div data-testid="details-notes" className={styles.__notes}>
        <h5>Notes</h5>
        <div className={styles.__notes__container}>
          {[...(data?.notes || []), { value: "", isNew: true }].map(
            (note, index) => (
              <Note
                key={index + note.value}
                onDelete={() => deleteNote(index)}
                onSave={(n) => saveNote(n, index)}
                isNew={note?.isNew}
                value={note?.value}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
