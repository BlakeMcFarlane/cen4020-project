import React from 'react'
import styles from '../../styles/Dashboard.module.css';
import { FaPersonChalkboard } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";
import { ImDrawer } from "react-icons/im";
import { ImBriefcase } from "react-icons/im";
import { Link } from 'react-router-dom'; 

export default function StaffDashboard() {
  return (
    <div className={styles.menuOptions}>
      <Link to="/staff/instructors" class={styles.boxLink}>
        <div className={styles.box}>
            <div class={styles.boxItems}>
              <FaPersonChalkboard size={40}/>
              <t>Instructors</t>
            </div>
          </div>
        </Link>
          <div className={styles.box}>
          <div class={styles.boxItems}>
              <HiUserGroup size={40}/>
              <t>Students</t>
            </div>
          </div>
          <div className={styles.box}>
            <div class={styles.boxItems}>
              <ImDrawer size={40}/>
              <t>Documents</t>
            </div>
          </div>
          <div className={styles.box}>
            <div class={styles.boxItems}>
              <ImBriefcase   size={40}/>
              <t>Employee Resources</t>
            </div>
          </div>
    </div>
  )
}

