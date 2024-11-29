import React from "react";
import styles from "../../styles/Dashboard.module.css";
import { BsBookmarkStarFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi2";
import { FaPersonChalkboard } from "react-icons/fa6";
import { ImBriefcase } from "react-icons/im";
import { RiDashboard3Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { PiSwapBold } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function AdvisorDashboard() {
  return (
    <div className={styles.menuOptions}>
      <Link to="/advisor/courses" class={styles.boxLink}>
        <div className={styles.box}>
          <div class={styles.boxItems}>
            <BsBookmarkStarFill size={40} />
            <t>Courses</t>
          </div>
        </div>
      </Link>
      <Link to="/advisor/students" class={styles.boxLink}>
        <div className={styles.box}>
          <div class={styles.boxItems}>
            <HiUserGroup size={40} />
            <t>Students</t>
          </div>
        </div>
      </Link>
      <Link to="/advisor/instructors" class={styles.boxLink}>
        <div className={styles.box}>
          <div class={styles.boxItems}>
            <FaPersonChalkboard size={40} />
            <t>Instructors</t>
          </div>
        </div>
      </Link>
        <div className={styles.box}>
          <div class={styles.boxItems}>
            <ImBriefcase size={40} />
            <t>Employee Resources</t>
          </div>
        </div>
      <Link to ="/advisor/performance" class = {styles.boxLink}>
      <div className={styles.box}>
        <div class={styles.boxItems}>
          <RiDashboard3Fill size={40} />
          <t>Performance</t>
        </div>
      </div>
      </Link>
      <Link to="/what-if" class={styles.boxLink}>
        <div className={styles.box}>
          <div class={styles.boxItems}>
            <FaSearch size={40} />
            <t>What-if Analysis</t>
          </div>
        </div>
      </Link>
    </div>
  );
}
