import React, {useContext} from 'react'
import styles from '../styles/Sidenav.module.css';
import { MdInbox } from 'react-icons/md';   // https://react-icons.github.io/react-icons/search/
import { IoGridSharp } from "react-icons/io5";
import { IoMdHelpCircle } from "react-icons/io";
import { UserContext } from '../components/UserContext';  
import { Link, useNavigate } from 'react-router-dom';  // Import Link for navigation

const SideNavbar = () => {
  const { userData, setUserData } = useContext(UserContext); 

  const navigate = useNavigate();  

  // Sign out method
  const handleSignOut = () => {
    setUserData(null);
    localStorage.removeItem('token'); 

    navigate('/');
  };

  return (
      <div class={styles.navContainer}>
        <Link to="/profile" class={styles.boxLink}>
          <div class={styles.itemContainer} style={{'rowGap':'8px'}}>
            <div class={styles.profilePhotoContainer}>
              <img src="http://localhost:8000/media/rocky-image.jpg" alt="Sign In" class={styles.image}/>
            </div>
            <h2 class={styles.itemName}>{userData.first_name}</h2>
          </div>
        </Link>
        <Link to="/dashboard" class={styles.boxLink}>
          <div class={styles.itemContainer}>
            <IoGridSharp class={styles.icon} size={55} />
            <h2 class={styles.itemName}>Dashboard</h2>
          </div>
        </Link>
        <div class={styles.itemContainer}>
          <MdInbox class={styles.icon} size={63} style={{marginBottom:"-5px"}}/>  
          <h2 class={styles.itemName}>Inbox</h2>
        </div>
        <div class={styles.itemContainer}>
          <IoMdHelpCircle class={styles.icon} size={60} />  
          <h2 class={styles.itemName}>Help</h2>
        </div>
        <div className={styles.itemContainer}>
        <a onClick={handleSignOut} className={styles.signOutLink}>
          <p>Sign Out</p>
        </a>
      </div>
    </div>
  )
}

export default SideNavbar