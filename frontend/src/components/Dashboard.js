import React, { useContext } from 'react';
import styles from '../styles/Dashboard.module.css';
import SideNavbar from './SideNavbar';
import { UserContext } from '../components/UserContext';  
import StaffDashboard from './utility/StaffDashboard';
import InstructorDashboard from './utility/InstructorDashboard';
import StudentDashboard from './utility/StudentDashboard'
import AdvisorDashboard from './utility/AdvisorDashboard'

const Dashboard = () => {
  const { userData, setUserData } = useContext(UserContext); 

  // Display dashboard based on users role
  const renderDashboard = () => {
    if (userData.role.toLowerCase() === 'instructor') {
      return <InstructorDashboard />;
  } else if (userData.role === 'student') {
      return <StudentDashboard />;
  } else if (userData.role === 'staff') {
    return <StaffDashboard />;
  } else if (userData.role === 'advisor') {
      return <AdvisorDashboard />;
  }
  // Add other roles as needed
  else {
      return <p>No dashboard available for this role.</p>;
  }
  };

  return (
    <div className={styles.container}>
      <div>
        <SideNavbar />
      </div>
      <div className={styles.content}>
        <div className={styles.dashboardExtra}>
        </div>
        <h1>Dashboard</h1>
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;
