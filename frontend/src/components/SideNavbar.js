import React, {useContext} from 'react'
import styles from '../styles/Sidenav.module.css';
import { MdInbox } from 'react-icons/md';   // https://react-icons.github.io/react-icons/search/
import { IoGridSharp } from "react-icons/io5";
import { IoMdHelpCircle } from "react-icons/io";
import { UserContext } from '../components/UserContext';  
import { Link } from 'react-router-dom';  // Import Link for navigation

const SideNavbar = () => {
  const { userData, setUserData } = useContext(UserContext); 

  
  return (
    <div class={styles.navContainer}>
        <div class={styles.itemContainer}>
            <div class={styles.profilePhotoContainer}>
            </div>
            <h2 class={styles.itemName}>{userData.first_name}</h2>
        </div>
        <div class={styles.itemContainer}>
          <Link to="/dashboard" class={styles.boxLink}>
            <IoGridSharp class={styles.icon} size={55} />
            <h2 class={styles.itemName}>Dashboard</h2>
          </Link>
        </div>
        <div class={styles.itemContainer}>
          <MdInbox class={styles.icon} size={60} />  
          <h2 class={styles.itemName}>Inbox</h2>
        </div>
        <div class={styles.itemContainer}>
          <IoMdHelpCircle class={styles.icon} size={60} />  
          <h2 class={styles.itemName}>Help</h2>
        </div>
        <a><p>Sign Out</p></a>
    </div>
  )
}

export default SideNavbar