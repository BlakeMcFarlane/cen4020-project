import React, { useContext } from 'react';
import SideNavbar from './SideNavbar.js';
import styles from "../styles/Profile.module.css"
import { UserContext } from '../components/UserContext';  


const Profile = () => {
  const { userData, setUserData } = useContext(UserContext); 

  return (
    <div className={styles.container}>
      <div>
        <SideNavbar />
      </div>
      <div className={styles.content}>
        <div className={styles.contentSide}>
            <div class={styles.profileSection}>
                <div class={styles.profileLeft}>
                    <div class={styles.profilePhotoContainer}>
                        <img src="http://localhost:8000/media/rocky-image.jpg" alt="Stock Photo" class={styles.image}/>
                    </div>
                </div>
                <div class={styles.profileRight}>
                    <h1 class={styles.profileName}>{userData.name}</h1>
                    <p class={styles.profileText}>Add some bio information</p>
                </div>
            </div>
            <h4 class={styles.boxHeader}>Personal Information</h4>
            <div class={styles.informationSection}>
                <div class={styles.informationRow}>
                    <p class={styles.informationText}>Email:</p>
                    <p class={styles.informationText}>{userData.email}</p>
                </div>
                <div class={styles.informationRow}>
                    <p class={styles.informationText}>Phone:</p>
                    <p class={styles.informationText}>{userData.phone}</p>
                </div>
                <div class={styles.informationRow}>
                    <p class={styles.informationText}>gender:</p>
                    <p class={styles.informationText}>{userData.gender}</p>
                </div>
                <div class={styles.informationRow}>
                    <p class={styles.informationText}>Ethnicity:</p>
                    <p class={styles.informationText}>{userData.ethnicity}</p>
                </div>
                <div class={styles.informationRow}>
                    <p class={styles.informationText}>Citizenship:</p>
                    <p class={styles.informationText}>{userData.citizen}</p>
                </div>
            </div>
            <h4 class={styles.boxHeader}>General Information</h4>
            <div class={styles.informationSection}>
            <div class={styles.informationRow}>
                    <p class={styles.informationText}>Major:</p>
                    <p class={styles.informationText}>{userData.major}</p>
                </div>
                <div class={styles.informationRow}>
                    <p class={styles.informationText}>Class:</p>
                    <p class={styles.informationText}>{userData.class}</p>
                </div>
                <div class={styles.informationRow}>
                    <p class={styles.informationText}>Total Credits:</p>
                    <p class={styles.informationText}>N/A</p>
                </div>
                <div class={styles.informationRow}>
                    <p class={styles.informationText}>GPA:</p>
                    <p class={styles.informationText}>{userData.gpa}</p>
                </div>
                <div class={styles.informationRow}>
                    <p class={styles.informationText}>Starting Semester:</p>
                    <p class={styles.informationText}>{userData.starting_semester}</p>
                </div>
                <div class={styles.informationRow}>
                    <p class={styles.informationText}>Residency:</p>
                    <p class={styles.informationText}>N/A</p>
                </div>
            </div>
        </div>
        <div className={styles.contentSide}>
            <div class={styles.informationSection}>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;