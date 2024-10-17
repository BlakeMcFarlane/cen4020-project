import React from 'react';
import styles from '../styles/Dashboard.module.css';
import SideNavbar from './SideNavbar';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidenav}>
        <SideNavbar />
      </div>
      <div className={styles.content}>
        <div className={styles.dashboardExtra}>
          {/* Any additional content can go here */}
        </div>
        <h1>Dashboard</h1>
        <div className={styles.menuOptions}>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
