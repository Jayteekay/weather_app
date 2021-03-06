import React, { useCallback, useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import styles from "./body.module.scss";
import Main from "../Main";
import Details from "../Details";
import useFetch from "../../hooks/useFetch";
import DialogBox from "../../components/DialogBox";
import { GET_CITY_DATA } from "../../utils/endpoints";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useSelector } from "react-redux";
import Prompt from "../../elements/Prompt";
import { PROMPT_TYPE_POSITIVE } from "../../utils/constants";

const Body = () => {
  const history = useHistory();
  const currentCity = useSelector((state) => state.cities.currentCity);
  const [showCityPrompt, setShowCityPrompt] = useState(true);
  const { storeValue: storeCurrentLocation } = useLocalStorage(
    "current_location"
  );
  const [isDialogOpen, setIsDialogOpen] = useState(!currentCity);
  const [requestingPermission, setRequestingPermission] = useState(false);
  const handleNegative = () => {
    setIsDialogOpen(false);
  };
  const removeCityPrompt = () => {
    setShowCityPrompt(false);
  };
  const { success: city, error, isLoading, dispatchFetch: getCity } = useFetch(
    GET_CITY_DATA
  );
  const handlePositive = () => {
    const showPosition = (value) => {
      setRequestingPermission(false);
      getCity("" + `${value.coords.latitude},${value.coords.longitude}`);
    };
    const handleError = (error) => {
      setRequestingPermission(false);
      setIsDialogOpen(false);
    };
    if (navigator.geolocation) {
      setRequestingPermission(true);
      navigator.geolocation.getCurrentPosition(showPosition, handleError);
    }
  };

  const openCurrentCity = useCallback(() => {
    setShowCityPrompt(false);
    history.push(`/details/${currentCity.country}/${currentCity.city}`)
  }, [currentCity])

  useEffect(() => {
    if (city) {
      setIsDialogOpen(false);
      storeCurrentLocation({
        city: city.location.name,
        country: city.location.country,
      });
      history.push(`/details/${city.location.country}/${city.location.name}`);
    } else if (error) {
      setIsDialogOpen(false);
    }
  }, [city, error]);

  return (
    <div data-testid="body">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/details/:country/:city" component={Details} />
        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
      {currentCity && showCityPrompt && (
        <Prompt
          type={PROMPT_TYPE_POSITIVE}
          onClose={removeCityPrompt}
          message={`Your current city is set to ${currentCity.city}, ${currentCity.country}`}
          onAccept={openCurrentCity}
          acceptMessage = "Open Details"
          duration={10000}
        />
      )}
      {isDialogOpen && (
        <div className={styles.__dialog}>
          {!isLoading ? (
            !requestingPermission ? (
              <DialogBox
                prompt="Would you like me you to get your current location?"
                onPositive={handlePositive}
                onNegative={handleNegative}
              />
            ) : (
              <b style={{ color: "var(--white" }}>
                Processing Location access...
              </b>
            )
          ) : (
            <b style={{ color: "var(--white" }}>
              Loading weather details of your location ...
            </b>
          )}
        </div>
      )}
    </div>
  );
};

export default Body;
