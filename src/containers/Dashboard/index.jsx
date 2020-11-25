import React from 'react';
import Header from '../../components/Header';
import styles from './dashboard.module.scss'

const Dashboard = () => {
    return (
        <div data-testid="dashboard" className={styles._}>
            <Header/>
        </div>
    );
};

export default Dashboard;