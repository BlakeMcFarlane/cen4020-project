import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DepartmentList from './DepartmentList';
import InstructorList from './InstructorList';
import InstructorForm from './InstructorForm';

const Dashboard = () => {
  const [departments, setDepartments] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentResponse = await axios.get("http://localhost:8000/api/departments/");
        setDepartments(departmentResponse.data);

        const instructorResponse = await axios.get("http://localhost:8000/api/instructors/");
        setInstructors(instructorResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Toggle form visibility and set active instructor
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Handle form submission for adding or editing an instructor
  const handleSubmit = async (instructor) => {
    try {
      if (instructor.instructorID) {
        await axios.put(`http://localhost:8000/api/instructors/${instructor.instructorID}/`, instructor);
      } else {
        await axios.post("http://localhost:8000/api/instructors/", instructor);
      }
      // Refresh the data after submission
      const instructorResponse = await axios.get("http://localhost:8000/api/instructors/");
      setInstructors(instructorResponse.data);
      toggleForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <div className="departments" style={{backgroundColor:'lightgrey'}}>
        <h2>Departments</h2>
        <DepartmentList departments={ departments } />
      </div>
      <div className="instructors" style={{backgroundColor:'lightgrey'}}>
        <h2>Instructors</h2>
        <InstructorList instructors={instructors} />
      </div>
      <button onClick={() => toggleForm()} className="button">Add Instructor</button>
      {showForm && (
        <InstructorForm
          toggleForm={ toggleForm }
          onSave={ handleSubmit }
        />
      )}
    </div>
  );
};

export default Dashboard;
