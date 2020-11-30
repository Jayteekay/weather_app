import {
  TEMPERATURE_COLD_VALUE,
  TEMPERATURE_HOT_VALUE,
  TEMPERATURE_UNIT_CELCIUS,
  TEMPERATURE_UNIT_FAHRENHEIT,
} from "./constants";
import moment from "moment";

export const sortCities = (cities) => {
  const sortFunction = (a, b) => a.city.localeCompare(b.city);
  return cities?.sort(sortFunction);
};
export const classifyTemperature = (value) => {
  if (value <= TEMPERATURE_COLD_VALUE) {
    return {
      description: "Cold",
      gradient: "var(--gradient-cold)",
      color: "var(--cold)",
    };
  }
  if (value <= TEMPERATURE_HOT_VALUE && value > TEMPERATURE_COLD_VALUE) {
    return {
      description: "Warm",
      gradient: "var(--gradient-warm)",
      color: "var(--warm)",
    };
  }
  if (value > TEMPERATURE_HOT_VALUE) {
    return {
      description: "Hot",
      gradient: "var(--gradient-hot)",
      color: "var(--hot)",
    };
  }
  return null;
};
export const convertTemperature = (value, unit=TEMPERATURE_UNIT_CELCIUS) => {
  if (unit === TEMPERATURE_UNIT_FAHRENHEIT) {
    return (value * 9) / 5 + 32;
  } else {
    return value;
  }
};
export const utcMinutesAgo = (time, utc_offset) => {
  const time_moment = moment.utc(time).utcOffset(parseFloat(utc_offset), true);
  const current_moment = moment();
  return current_moment.diff(time_moment, "minutes");
};
