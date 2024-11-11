import React, { useContext } from 'react';
import SideNavbar from '../SideNavbar';
import styles from "../../styles/Dashboard.module.css"
import { UserContext } from '../../components/UserContext';  
import { Link } from 'react-router-dom';

const Classroom = () => {
  const { userData, setUserData } = useContext(UserContext); 

  return (
    <div className={styles.container}>
      <div>
        <SideNavbar />
      </div>
      <div className={styles.content}>
        <div className={styles.dashboardExtra}>
        </div>
        <h1>My Classroom</h1>
        <div className={styles.menuOptions}>
          {userData && userData.active_registration && userData.active_registration.length > 0 ? (
              userData.active_registration.map((course, index) => (
                <Link to="/classroom/<course>" class={styles.boxLink}>
                  <div key={index} className={styles.box}>
                    <div className={styles.boxItems}>
                      <p>{course.subject} {course.course_number}</p>
                      <span>{course.title}</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No active courses.</p> 
            )}
        </div>
      </div>
    </div>
  );
};

export default Classroom;