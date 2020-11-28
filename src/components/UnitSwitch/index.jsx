import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "../../hooks/useLocalStorage";
import { SWITCH_TEMPERATURE_UNITS } from "../../redux/actions/types";
import {
  KEY_TEMPERATURE_UNIT,
  TEMPERATURE_UNIT_CELCIUS,
  TEMPERATURE_UNIT_FAHRENHEIT,
} from "../../utils/constants";
import styles from "./unit-switch.module.scss";

const UnitSwitch = () => {
  const value = useSelector((state) => state.temperatureUnit);
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

  const { storeValue: saveToLocalStorage } = useLocalStorage(
    KEY_TEMPERATURE_UNIT
  );
  const dispatch = useDispatch();
  const handleSwitch = (identifier) => {
    if (identifier !== value) {
      dispatch({ type: SWITCH_TEMPERATURE_UNITS });
      saveToLocalStorage(identifier);
    }
  };

  return (
    <div data-testid="unit-switch" className={styles._}>
      {switches.map((swtch) => (
        <button
          key={swtch.identifier}
          disabled={value === swtch.identifier}
          className={value === swtch.identifier ? styles.__current : ""}
          onClick={() => handleSwitch(swtch.identifier)}
        >
          {swtch.title}
        </button>
      ))}
    </div>
  );
};

export default UnitSwitch;
