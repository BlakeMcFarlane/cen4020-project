import React from 'react';
import styles from "../../../styles/Registration.module.css";

const CourseHeader = () => {
    return (
        <div className={styles.header}>
            <div className={styles.headerItem}>
                <p className={styles.headerText} style={{width:"80px"}}>Subject</p>
            </div>
            <div className={styles.headerItem}>
                <p className={styles.headerText} style={{width:"80px"}}>Course</p>
            </div>
            <div className={styles.headerItem}>
                <p className={styles.headerText} style={{width:"275px"}}>Title</p>
            </div>
            <div className={styles.headerItem}>
                <p className={styles.headerText} style={{width:"70px"}}>Credits</p>
            </div>
            <div className={styles.headerItem}>
                <p className={styles.headerText} style={{width:"220px"}}>Instructor</p>
            </div>
            <div className={styles.headerItem}>
                <p className={styles.headerText} style={{width:"70px"}}>Seats</p>
            </div>
            <div className={styles.headerItem}>
                <p className={styles.headerText} style={{width:"70px"}}>Available</p>
            </div>
        </div>
    );
};

export default CourseHeader;
