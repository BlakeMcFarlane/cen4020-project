import SignIn from './components/SignIn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Classroom from './components/student_db/Classroom';  
import AcademicRecords from './components/student_db/AcademicRecords';  
import Registration from './components/student_db/Registration';
import Documents from './components/student_db/Documents';
import WhatifAnalysis from './components/student_db/WhatifAnalysis';
import './index.css'; 
import React, { useState, useEffect } from 'react';
import { UserContext } from './components/UserContext';


function App() {
  const [userData, setUserData] = useState(() => {                // store user data accross
    const storedUserData = localStorage.getItem('userData');      // application. 
    return storedUserData ? JSON.parse(storedUserData) : null;    // store in localStorage
  });

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      localStorage.removeItem('userData');
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <div className="App" style={{height: '100%'}}> 
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* STUDENT PATHS */}
            <Route path="/classroom" element={<Classroom />} />
            <Route path="/academic-records" element={<AcademicRecords />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/what-if" element={<WhatifAnalysis />} />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>

  );
}

export default App;
