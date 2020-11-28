import React from "react";
import City from "../../components/City";
import styles from "./list-section.module.scss";

const ListSection = ({ title, icon, cities }) => {
  return (
    <div className={styles._}>
      <div className={styles.__header}>
        {icon}
        <h5>{title}</h5>
      </div>
      <div className={styles.__cityContainer}>
        {cities?.length > 0 ? (
          cities.map((city) => (
            <City
              key={city.id}
              category={city.category}
              name={city.name}
              country={city.country}
              temperature={city.temperature}
              last_updated={city.localtime}
              utc_offset={city.utc_offset}
            />
          ))
        ) : (
          <h4>No {title} added yet</h4>
        )}
      </div>
    </div>
  );
};

export default ListSection;
