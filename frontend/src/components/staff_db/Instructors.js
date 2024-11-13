import React, { useContext, useEffect, useState } from 'react';
import SideNavbar from '../SideNavbar';
import styles from "../../styles/InstructorClassroom.module.css";
import { UserContext } from '../../components/UserContext';
import { IoMdAddCircle } from "react-icons/io";

const Instructors = () => {
  const { userData, setUserData } = useContext(UserContext); 
  const [instructors, setInstructors] = useState([]);
  const [addInstructor, setAddInstructor] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    department: '',
    hired_semester: '',
    gender: '',
  });

  const departments = [
    { id: 12, name: 'History' },
    { id: 11, name: 'Engineering' },
    { id: 10, name: 'Physics' },
    { id: 9, name: 'Mathematics' },
    { id: 8, name: 'Religion' },
    { id: 7, name: 'Art' },
    { id: 6, name: 'Business' },
    { id: 5, name: 'English' },
    { id: 4, name: 'Chemistry' },
    { id: 3, name: 'Advertising' },
    { id: 2, name: 'Accounting' },
    { id: 1, name: 'Computer Science' },
  ];

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    const response = await fetch('http://localhost:8000/api/list-instructors/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const list = await response.json();
    setInstructors(list);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddInstructor = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/add-instructor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newInstructor = await response.json();
        setInstructors([...instructors, newInstructor]);
        setAddInstructor(false);
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          department: '',
          hired_semester: '',
          gender: '',
        });
      } else {
        console.error("Failed to add instructor");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <SideNavbar />
      </div>
      <div className={styles.content}>
        <div class={styles.title}>
          <h1 class={styles.titleText}>Instructors</h1>
          <button onClick={() => setAddInstructor(!addInstructor)} class={styles.addButton}>
          {addInstructor ? (
            <div class={styles.addButton}>
              <p>Cancel</p>
            </div>
            ) : (
              <div class={styles.addButton}>
                <p>Add Instructor</p>
                <IoMdAddCircle size={15}/>
              </div>
            )}
          </button>
        </div>
        <div class={styles.main}>
          <div class={styles.listContainer} >
            <div class={styles.listHeader}>
              <div class={styles.headerLabel} style={{width:'150px'}}>
                <p class={styles.label}>Full Name</p>
              </div>
              <div class={styles.headerLabel} style={{width:'150px'}}>
                <p class={styles.label}>Department</p>
              </div>
              <div class={styles.headerLabel} style={{width:'210px'}}>
                <p class={styles.label}>Email</p>
              </div>
              <div class={styles.headerLabel} style={{width:'50px'}}>
                <p class={styles.label}>Courses</p>
              </div>
              <div class={styles.headerLabel} style={{width:'60px'}}>
                <p class={styles.label}>Students</p>
              </div>
            </div>

            {/* Instructor list */}
            <div class={styles.listContent}>
              {instructors.map((instructor, index) => (
                <div key={index} className={styles.rowContainer}>
                  <div style={{ width: "150px", display:"flex", flexDirection:"row" }}>
                    <p className={styles.headerText}>{instructor.profile.user.first_name}&nbsp;{instructor.profile.user.last_name}</p>
                  </div>
                  <div style={{ width: "140px" }}>
                    <p className={styles.headerText}>{instructor.department?.department_name}</p>
                  </div>
                  <div style={{ width: "210px" }}>
                    <p className={styles.headerText}>{instructor.profile.user.username}</p>
                  </div>
                  <div style={{ width: "50px" }}>
                    <p className={styles.headerText}>5</p>
                  </div>
                  <div style={{ width: "60px" }}>
                    <p className={styles.headerText}>100</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          
          <div class={styles.filterContainer}>
            <div class={styles.filterContent}>
              <h2>Filter</h2>

            </div>
          </div>
        </div>
        
        {/* Add Instructor Form */}
        {addInstructor && (
          <div className={styles.popup}>
            <h2>Add New Instructor</h2>
            <div class={styles.formContent}>
              <div class={styles.formRow}>
                <p class={styles.formLabel}>first name</p>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  class={styles.formInput}
                />
              </div>
              <div class={styles.formRow}>
                <p class={styles.formLabel}>last name</p>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  class={styles.formInput}
                />
              </div>
              <div class={styles.formRow}>
                <p class={styles.formLabel}>email</p>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  class={styles.formInput}
                />
              </div>
              <div className={styles.formRow}>
                <p class={styles.formLabel}>Department</p>
                <select
                  name="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  class={styles.formInput}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formRow}>
                <p class={styles.formLabel}>Hired Semester</p>
                <input
                  type="text"
                  name="hired_semester"
                  placeholder="Hired Semester"
                  value={formData.hired_semester}
                  onChange={handleInputChange}
                  class={styles.formInput}
                />
              </div>
              <div className={styles.formRow}>
                <p class={styles.formLabel}>Gender</p>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  class={styles.formInput}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <button class={styles.formButton} onClick={handleAddInstructor}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructors;
