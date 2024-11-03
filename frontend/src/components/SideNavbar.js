import React from 'react'
import styles from '../styles/Sidenav.module.css';
import { MdInbox, MdGridView } from 'react-icons/md';
import { IoGridSharp } from "react-icons/io5";
import { IoMdHelpCircle } from "react-icons/io";

const SideNavbar = () => {
  return (
    <div class={styles.navContainer}>
        <div class={styles.itemContainer}>
            <div class={styles.profilePhotoContainer}>
            </div>
            <h2 class={styles.itemName}>Users Name</h2>
        </div>
        <div class={styles.itemContainer}>
          <IoGridSharp class={styles.icon} size={70} />
          <h2 class={styles.itemName}>Dashboard</h2>
        </div>
        <div class={styles.itemContainer}>
          <MdInbox class={styles.icon} size={70} />  
          <h2 class={styles.itemName}>Inbox</h2>
        </div>
        <div class={styles.itemContainer}>
          <IoMdHelpCircle class={styles.icon} size={60} />  
          <h2 class={styles.itemName}>Inbox</h2>
        </div>
        <a><p>Sign Out</p></a>
    </div>
  )
}

export default SideNavbar