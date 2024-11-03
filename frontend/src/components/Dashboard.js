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
    switch (userData?.role) {
      case 'staff':
        return <StaffDashboard />;
      case 'instructor':
        return <InstructorDashboard />;
      case 'student':
        return <StudentDashboard />;
      case 'advisor':
        return <AdvisorDashboard />;
      default:
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
