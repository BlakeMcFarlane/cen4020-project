import React, { useContext } from 'react';
import SideNavbar from '../SideNavbar';
import styles from "../../styles/Registration.module.css"
import { UserContext } from '../../components/UserContext';  


const Registration = () => {
  const { userData, setUserData } = useContext(UserContext); 

  return (
    <div className={styles.container}>
      <div>
        <SideNavbar />
      </div>
      <div className={styles.content}>
        <h4 class={styles.boxHeader}>Course Lookup</h4>
        <div class={styles.courseLookup}>

        </div>
        <h4 class={styles.boxHeader}>Active Registration</h4>
        <div class={styles.activeRegistration}>
            <div class={styles.header}>
                <div class={styles.headerItem}>
                    <p class={styles.headerText} style={{width:"80px"}}>Subject</p>
                </div>
                <div class={styles.headerItem}>
                    <p class={styles.headerText} style={{width:"80px"}}>crs numb</p>
                </div>
                <div class={styles.headerItem}>
                    <p class={styles.headerText} style={{width:"280px"}}>Title</p>
                </div>
                <div class={styles.headerItem}>
                    <p class={styles.headerText} style={{width:"50px"}}>Credits</p>
                </div>
                <div class={styles.headerItem}>
                    <p class={styles.headerText} style={{width:"200px"}}>Instructor</p>
                </div>
                <div class={styles.headerItem}>
                    <p class={styles.headerText} style={{width:"70px"}}>Seats</p>
                </div>
                <div class={styles.headerItem}>
                    <p class={styles.headerText} style={{width:"70px"}}>Available</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;