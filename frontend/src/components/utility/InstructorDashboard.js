import React from 'react'
import styles from '../../styles/Dashboard.module.css';
import { FaChalkboardTeacher } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { ImDrawer } from "react-icons/im";
import { ImBriefcase } from "react-icons/im";

export default function InstructorDashboard() {
  return (
    <div className={styles.menuOptions}>
        <div className={styles.box}>
            <div class={styles.boxItems}>
              <FaChalkboardTeacher size={40}/>
              <t>Classroom</t>
            </div>
          </div>
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

