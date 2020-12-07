import { openDB } from "idb";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_CITY_SUCCESSFUL,
  GET_ALL_CITIES_SUCCESSFUL,
  GET_CITY_SUCCESSFUL,
} from "../redux/actions/types.js";
import {
  INDEXED_DB_NAME,
  SECTION_TITLE_SUGGESTIONS,
  TOP_CITIES,
} from "../utils/constants.js";
import { sortCities } from "../utils/functions.js";

const useCities = () => {
  const [isDatabaseUpgraded, setIsDatabaseUpgraded] = useState(false);
  const [database, setDatabase] = useState(null);
  const {data: cities, currentCity} = useSelector((state) => state.cities);

  const dispatch = useDispatch();

  const handleIsSetNewDB = () => {
    setIsDatabaseUpgraded((prev) => !prev);
  };

  const addMultiple = async (values) => {
    const tx = (await database)?.transaction("cities", "readwrite");
    return Promise.all([
      ...values.map((value) => tx.store.add(value)),
      tx.done,
    ]);
  };
  const trash = async (value) => {
    return (await database)
      ?.delete("cities", [value.name, value.country])
      .then((res) => {
        dispatch({ type: DELETE_CITY_SUCCESSFUL, payload: value });
      });
  };
  const getAll = async () => {
    return (await database)?.getAll("cities");
  };

  const update = async (value) => {
    const tx = (await database)?.transaction("cities", "readwrite");
    const currentValue = await tx.store.get([value.name, value.country]);
    return tx.store.put({ ...currentValue, ...value }).then((res) => {
      dispatch({ type: GET_CITY_SUCCESSFUL, payload: value });
    });
  };

  useEffect(() => {
    setDatabase(
      openDB(INDEXED_DB_NAME, 1, {
        upgrade: (db, oldVersion, newVersion, transaction) => {
          if (oldVersion) {
            db.deleteObjectStore("cities");
          }
          const store = db.createObjectStore("cities", {
            keyPath: ["name", "country"],
          });
          store.createIndex("category", "category");
          handleIsSetNewDB();
        },
      })
    );
  }, []);

  useEffect(() => {
    database &&
      getAll().then((r) =>
        dispatch({ type: GET_ALL_CITIES_SUCCESSFUL, payload: r })
      );
  }, [database]);

  useEffect(() => {
    if (isDatabaseUpgraded) {
      addMultiple(
        sortCities(TOP_CITIES).map((city) => ({
          name: city.city,
          country: city.country,
          category: SECTION_TITLE_SUGGESTIONS,
        }))
      )
        .then((r) => getAll())
        .then((r) => dispatch({ type: GET_ALL_CITIES_SUCCESSFUL, payload: r }));
    }
  }, [isDatabaseUpgraded]);

  return { update, trash, cities, currentCity };
};

export default useCities;
