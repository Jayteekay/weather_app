import React from "react";
import Card from "../../../elements/Card";
import styles from "./humidity.module.scss";

const Humidity = ({ value }) => {
  return (
    <div>
      <h5>Humidity</h5>
      <Card className={styles._}>
        <svg
          width="14"
          height="19"
          viewBox="0 0 14 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.607 8.49475L7.63525 0.577754C7.56312 0.476512 7.46783 0.393976 7.35733 0.337027C7.24683 0.280079 7.12431 0.250366 7 0.250366C6.87569 0.250366 6.75318 0.280079 6.64267 0.337027C6.53217 0.393976 6.43688 0.476512 6.36475 0.577754L1.3705 8.53225C0.676664 9.65145 0.290174 10.9338 0.25 12.25C0.25 14.0402 0.961159 15.7571 2.22703 17.023C3.4929 18.2888 5.20979 19 7 19C8.79021 19 10.5071 18.2888 11.773 17.023C13.0388 15.7571 13.75 14.0402 13.75 12.25C13.7069 10.9194 13.3125 9.62378 12.607 8.49475ZM7 17.5C5.60816 17.4982 4.27384 16.9445 3.28966 15.9603C2.30548 14.9762 1.75179 13.6418 1.75 12.25C1.78986 11.2012 2.1049 10.1813 2.6635 9.29275L3.36475 8.17525L10.9202 15.7308C10.4295 16.2867 9.82625 16.732 9.1504 17.0372C8.47454 17.3423 7.74155 17.5003 7 17.5008V17.5Z"
            fill="#00FF66"
          />
        </svg>
        <h2>{value}</h2>
      </Card>
    </div>
  );
};

export default Humidity;
