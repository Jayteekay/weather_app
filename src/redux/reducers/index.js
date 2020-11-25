import {combineReducers} from 'redux';
import temperatureUnitReducer from './temperatureUnitReducer';

export default combineReducers({
  temperatureUnit: temperatureUnitReducer,
});