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
              id={city.id}
              name={city.name}
              temperature={city.temperature}
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
