import React from "react";
import styles from "./main.module.scss";
import {
  SECTION_TITLE_FAVORITES,
  SECTION_TITLE_SUGGESTIONS,
} from "../../utils/constants";
import ListSection from "../ListSection";
import useCities from "../../hooks/useCities";

const Main = () => {
  const { cities: allCities } = useCities();
  const cities = {
    [SECTION_TITLE_FAVORITES]: allCities
      ? allCities.filter((city) => city.category == SECTION_TITLE_FAVORITES)
      : [],
    [SECTION_TITLE_SUGGESTIONS]: allCities
      ? allCities.filter((city) => city.category == SECTION_TITLE_SUGGESTIONS)
      : [],
  };
  const sections = [
    {
      title: SECTION_TITLE_FAVORITES,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2.5C12.1858 2.49991 12.368 2.55161 12.5261 2.64929C12.6842 2.74697 12.8119 2.88677 12.895 3.053L15.473 8.211L21.144 9.035C21.3287 9.06182 21.5022 9.1398 21.6449 9.2601C21.7876 9.38041 21.8938 9.53825 21.9514 9.71576C22.009 9.89327 22.0159 10.0834 21.9711 10.2646C21.9263 10.4457 21.8317 10.6108 21.698 10.741L17.571 14.765L18.499 20.439C18.5288 20.6227 18.5068 20.811 18.4354 20.9829C18.364 21.1547 18.2461 21.3032 18.0949 21.4117C17.9437 21.5202 17.7653 21.5843 17.5796 21.5969C17.3939 21.6095 17.2085 21.5701 17.044 21.483L12 18.807L6.956 21.483C6.79155 21.5701 6.60606 21.6095 6.4204 21.5969C6.23475 21.5843 6.05629 21.5202 5.9051 21.4117C5.75391 21.3032 5.63599 21.1547 5.5646 20.9829C5.49321 20.811 5.47118 20.6227 5.501 20.439L6.429 14.765L2.302 10.741C2.1683 10.6108 2.0737 10.4457 2.02892 10.2646C1.98414 10.0834 1.99096 9.89327 2.0486 9.71576C2.10625 9.53825 2.21242 9.38041 2.35511 9.2601C2.49779 9.1398 2.6713 9.06182 2.856 9.035L8.526 8.211L11.106 3.053C11.189 2.88692 11.3166 2.74722 11.4745 2.64955C11.6324 2.55188 11.8143 2.5001 12 2.5ZM12 5.736L10.082 9.572C10.01 9.71626 9.90422 9.84099 9.77363 9.93553C9.64304 10.0301 9.49153 10.0917 9.332 10.115L5.148 10.723L8.198 13.696C8.31326 13.8083 8.39972 13.9468 8.45003 14.0996C8.50035 14.2525 8.51303 14.4152 8.487 14.574L7.8 18.771L11.531 16.791C11.6754 16.7143 11.8365 16.6742 12 16.6742C12.1635 16.6742 12.3246 16.7143 12.469 16.791L16.2 18.771L15.513 14.574C15.4871 14.4154 15.4999 14.2528 15.5502 14.1001C15.6005 13.9475 15.6869 13.8092 15.802 13.697L18.852 10.723L14.669 10.115C14.5095 10.0917 14.358 10.0301 14.2274 9.93553C14.0968 9.84099 13.991 9.71626 13.919 9.572L12 5.736Z"
            fill="#F0A500"
          />
        </svg>
      ),
    },
    {
      title: SECTION_TITLE_SUGGESTIONS,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8 10.8V3.60001H3.60001V10.8H10.8ZM20.4 10.8V3.60001H13.2V10.8H20.4ZM10.8 20.4V13.2H3.60001V20.4H10.8ZM20.4 20.4V13.2H13.2V20.4H20.4Z"
            fill="#F05454"
          />
        </svg>
      ),
    },
  ];

  return (
    <div data-testid="main" className={styles._}>
      {sections.map(
        (section) =>
          (section.title in cities ||
            section.title === SECTION_TITLE_FAVORITES) && (
            <ListSection
              key={section.title}
              title={section.title}
              icon={section.icon}
              cities={cities[section.title]}
            />
          )
      )}
    </div>
  );
};

export default Main;
