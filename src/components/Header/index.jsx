import React from 'react';
import Search from '../Search';
import UnitSwitch from '../UnitSwitch';
import styles from './header.module.scss'

const Header = () => {
    return (
        <div data-testid="header" className={styles._}>
            <h3>Weather App</h3>
            <div className={styles.__searchContainer}>
                <Search/>
            </div>
            <div className={styles.__unitSwitch}>
                <UnitSwitch/>
            </div>
        </div>
    );
};

export default Header;