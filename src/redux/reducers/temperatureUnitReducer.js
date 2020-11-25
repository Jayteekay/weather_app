import { KEY_TEMPERATURE_UNIT, LOCAL_STORAGE_PREFIX, TEMPERATURE_UNIT_CELCIUS, TEMPERATURE_UNIT_FAHRENHEIT } from '../../utils/constants';
import {SWITCH_TEMPERATURE_UNITS} from '../actions/types';

const initialState = localStorage.getItem(LOCAL_STORAGE_PREFIX + KEY_TEMPERATURE_UNIT) || TEMPERATURE_UNIT_CELCIUS;

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SWITCH_TEMPERATURE_UNITS:
      switch(state){
        case TEMPERATURE_UNIT_FAHRENHEIT:
          return TEMPERATURE_UNIT_CELCIUS;
        case TEMPERATURE_UNIT_CELCIUS:
          return TEMPERATURE_UNIT_FAHRENHEIT;
        default:
          return state
      }
    default:
      return state;
  }
}

export default reducer;