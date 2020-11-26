import React from 'react';
import { Provider } from 'react-redux';
import store from "../../redux";
import Header from '../../components/Header';
import styles from './dashboard.module.scss'
import Body from '../Body';
import { BrowserRouter as Router } from 'react-router-dom';

const Dashboard = () => {
    return (
        <Provider store={store}>
            <Router>
                <div data-testid="dashboard" className={styles._}>
                    <Header/>
                    <Body/>
                </div>
            </Router>
        </Provider>
    );
};

export default Dashboard;