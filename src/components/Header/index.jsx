import React from "react";
import { Offline, Online } from "react-detect-offline";
import { Link } from "react-router-dom";
import Search from "../Search";
import UnitSwitch from "../UnitSwitch";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <div data-testid="header" className={styles._}>
      <Link to="/">
        <h3>Weather App</h3>
      </Link>
      <div className={styles.__searchContainer}>
        <Offline>
          <i>Connect to the internet to search cities.</i>
        </Offline>
        <Online>
          <Search />
        </Online>
      </div>
      <div className={styles.__unitSwitch}>
        <UnitSwitch />
      </div>
    </div>
  );
};

export default Header;
