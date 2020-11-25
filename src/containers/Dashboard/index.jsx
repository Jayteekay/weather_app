import React from 'react';
import { Provider } from 'react-redux';
import store from "../../redux";
import Header from '../../components/Header';
import styles from './dashboard.module.scss'
import Body from '../Body';

const Dashboard = () => {
    return (
        <Provider store={store}>
            <div data-testid="dashboard" className={styles._}>
                <Header/>
                <Body/>
            </div>
        </Provider>
    );
};

export default Dashboard;