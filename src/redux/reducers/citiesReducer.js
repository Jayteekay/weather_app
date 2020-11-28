import {
  DELETE_CITY_SUCCESSFUL,
  GET_ALL_CITIES_SUCCESSFUL,
  GET_CITY_SUCCESSFUL,
} from "../actions/types";

const initialState = {
  data: [],
  isLatestData: false,
  // isFetchingFromWeb: false,
  // error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CITIES_SUCCESSFUL:
      return { ...state, data: action.payload, isLatestData: false };
    case GET_CITY_SUCCESSFUL: {
      const update = action.payload;
      const exists = state.data.find(
        (city) => city.name === update.name && city.country === update.country
      );
      let newData = [];
      if (exists) {
        newData = Array.from(state.data);
        newData = newData.map((data) =>
          data.name === update.name && data.city === update.city
            ? { ...data, ...update }
            : data
        );
      } else {
        newData = [...state.data, update];
      }
      return {
        ...state,
        data: newData,
        isLatestData: false,
      };
    }
    case DELETE_CITY_SUCCESSFUL: {
      const key = action.payload;
      return {
        ...state,
        data: state.data.filter(
          (data) => !(data.name === key.name && data.country === key.country)
        ),
        isLatestData: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
