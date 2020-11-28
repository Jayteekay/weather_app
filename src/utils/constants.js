export const KEY_TEMPERATURE_UNIT = "temperature_unit";

export const TEMPERATURE_UNIT_CELCIUS = "CELCIUS";
export const TEMPERATURE_UNIT_FAHRENHEIT = "FAHRENHEIT";

export const TEMPERATURE_COLD = "TEMPERATURE_COLD";
export const TEMPERATURE_COLD_VALUE = 17;
export const TEMPERATURE_WARM = "TEMPERATURE_WARM";
export const TEMPERATURE_HOT = "TEMPERATURE_HOT";
export const TEMPERATURE_HOT_VALUE = 26;

export const LOCAL_STORAGE_PREFIX = "weather_app_v1__";
export const INDEXED_DB_NAME = "weather_app_v1_db";

export const SECTION_TITLE_FAVORITES = "Favorites";
export const SECTION_TITLE_SUGGESTIONS = "Suggestions";

export const TOP_CITIES = [
  { city: "Tokyo", country: "Japan" },
  { city: "Delhi", country: "India" },
  { city: "Shanghai", country: "China" },
  { city: "Sao Paulo", country: "Brazil" },
  { city: "Mexico City", country: "Mexico" },
  { city: "Dhaka", country: "Bangladesh" },
  { city: "Cairo", country: "Egypt" },
  { city: "Beijing", country: "China" },
  { city: "Mumbai", country: "India" },
  { city: "Osaka-Shi", country: "Japan" },
  { city: "New York", country: "United States of America" },
  { city: "Karachi", country: "Pakistan" },
  { city: "Chongqing", country: "China" },
  { city: "Istanbul", country: "Turkey" },
  { city: "Buenos Aires", country: "Argentina" },
];

const vectors = require("./asset-vectors-loader");
export const WEATHER_VECTOR_MAP = {
  113: vectors["sunny.svg"]?.default,
  116: vectors["partly_cloudy.svg"]?.default,
  119: vectors["cloudy.svg"]?.default,
  122: vectors["overcast.svg"]?.default,
  143: vectors["mist.svg"]?.default,
  176: vectors["patchy_rain.svg"]?.default,
  179: vectors["snow.svg"]?.default,
  182: vectors["sleet.svg"]?.default,
  185: vectors["drizzle.svg"]?.default,
  200: vectors["thunder.svg"]?.default,
  227: vectors["blowing_snow.svg"]?.default,
  230: vectors["blizzard.svg"]?.default,
  248: vectors["foggy.svg"]?.default,
  260: vectors["foggy.svg"]?.default,
  263: vectors["drizzle.svg"]?.default,
  266: vectors["drizzle.svg"]?.default,
  281: vectors["drizzle.svg"]?.default,
  284: vectors["drizzle.svg"]?.default,
  293: vectors["patchy_rain.svg"]?.default,
  296: vectors["rain.svg"]?.default,
  299: vectors["rain.svg"]?.default,
  302: vectors["rain.svg"]?.default,
  305: vectors["rain.svg"]?.default,
  308: vectors["rain.svg"]?.default,
  311: vectors["rain.svg"]?.default,
};
