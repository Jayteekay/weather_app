import React from 'react';
import Search from '../Search';
import styles from './header.module.scss'

const Header = () => {
    return (
        <div data-testid="header" className={styles._}>
            <h3>Weather App</h3>
            <Search/>
            <div></div>
        </div>
    );
};

export default Header;