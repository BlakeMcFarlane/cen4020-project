import React from 'react';
import styles from "../../../styles/Registration.module.css";

const CourseRow = ({course_info}) => {
    return (
        <div class={styles.row}>
            <div style={{ width: "80px" }}>
                <p className={styles.headerText}>{course_info.subject}</p>
            </div>
            <div style={{ width: "75px" }}>
                <p className={styles.headerText}>{course_info.course_number}</p>
            </div>
            <div style={{ width: "280px" }}>
                <p className={styles.headerText}>{course_info.title}</p>
            </div>
            <div style={{ width: "60px" }}>
                <p className={styles.headerText}>{course_info.credits}</p>
            </div>
            <div style={{ width: "230px" }}>
                <p className={styles.headerText}>{course_info.instructor}</p>
            </div>
            <div style={{ width: "70px" }}>
                <p className={styles.headerText}>{course_info.total_seats}</p>
            </div>
            <div style={{ width: "100px" }}>
                <p className={styles.headerText}>{course_info.available_seats}</p>
            </div>
        </div>
    );
};

export default CourseRow;
