import React from 'react'
import styles from '../../styles/Dashboard.module.css';
import { SiGoogleclassroom } from "react-icons/si";
import { SiMicrosoftacademic } from "react-icons/si";
import { PiFileTextFill } from "react-icons/pi";
import { ImDrawer } from "react-icons/im";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom'; 

export default function StudentDashboard() {
  return (
    <div className={styles.menuOptions}>
       <Link to="/classroom" class={styles.boxLink}>
        <div className={styles.box}>
          <div class={styles.boxItems}>
            <SiGoogleclassroom size={40}/>
            <t>Classroom</t>
          </div>
        </div>
      </Link>
      <Link to="/academic-records" class={styles.boxLink}>
          <div className={styles.box}>
          <div class={styles.boxItems}>
              <SiMicrosoftacademic size={40}/>
              <t>Acadmic Records</t>
            </div>
          </div>
        </Link>
        <Link to="/registration" class={styles.boxLink}>
          <div className={styles.box}>
            <div class={styles.boxItems}>
              <PiFileTextFill size={40}/>
              <t>Registration</t>
            </div>
          </div>
        </Link>
        <Link to="/documents" class={styles.boxLink}>
          <div className={styles.box}>
            <div class={styles.boxItems}>
              <ImDrawer size={40}/>
              <t>Documents</t>
            </div>
          </div>
        </Link>
        <Link to="/what-if" class={styles.boxLink}>
          <div className={styles.box}>
            <div class={styles.boxItems}>
              <FaSearch  size={40}/>
              <t>What-if Analysis</t>
            </div>
          </div>
        </Link>
    </div>
  )
}
