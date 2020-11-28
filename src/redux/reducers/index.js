import { combineReducers } from "redux";
import temperatureUnitReducer from "./temperatureUnitReducer";
import citiesReducer from "./citiesReducer";

export default combineReducers({
  temperatureUnit: temperatureUnitReducer,
  cities: citiesReducer,
});
