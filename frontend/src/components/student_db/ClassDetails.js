import React, { useContext } from 'react';
import SideNavbar from '../SideNavbar';
import styles from "../../styles/Dashboard.module.css"
import { UserContext } from '../../components/UserContext';  


const ClassDetails = () => {
  const { userData, setUserData } = useContext(UserContext); 


  return (
    <div className={styles.container}>
      <div>
        <SideNavbar />
      </div>
      <div className={styles.content}>
        <div className={styles.dashboardExtra}>
        </div>
        <h1></h1>
        
      </div>
    </div>
  );
};

export default ClassDetails;