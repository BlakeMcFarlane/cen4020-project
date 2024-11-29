import React, { useContext, useEffect, useState } from 'react';
import SideNavbar from '../SideNavbar';
import styles from "../../styles/InstructorClassroom.module.css";
import { UserContext } from '../../components/UserContext';
import { IoMdAddCircle } from "react-icons/io";

const Students = () => {
    const { userData, setUserData } = useContext(UserContext);
    const [students, setStudents] = useState([]);
    const [addStudent, setAddStudent] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        major: '',
        gender: '',
    });

    const majors = [
        { id: 2, name: 'BS in Computer Engineering' },
        { id: 1, name: 'BS in Computer Science' },
    ];

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const response = await fetch('http://localhost:8000/api/list-students/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const list = await response.json();
        setStudents(list);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddStudent = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/add-student/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newInstructor = await response.json();
                setStudents([...students, newInstructor]);
                setAddStudent(false);
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    major: '',
                    gender: '',
                });
            } else {
                console.error("Failed to add student");
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
                    <h1 class={styles.titleText}>Students</h1>
                    <button onClick={() => setAddStudent(!addStudent)} class={styles.addButton}>
                        {addStudent ? (
                            <div class={styles.addButton}>
                                <p>Cancel</p>
                            </div>
                        ) : (
                            <div class={styles.addButton}>
                                <p>Add Student</p>
                                <IoMdAddCircle size={15} />
                            </div>
                        )}
                    </button>
                </div>
                <div class={styles.main}>
                    <div class={styles.listContainer} >
                        <div class={styles.listHeader}>
                            <div class={styles.headerLabel} style={{ width: '150px' }}>
                                <p class={styles.label}>Full Name</p>
                            </div>
                            <div class={styles.headerLabel} style={{ width: '150px' }}>
                                <p class={styles.label}>Major</p>
                            </div>
                            <div class={styles.headerLabel} style={{ width: '210px' }}>
                                <p class={styles.label}>Email</p>
                            </div>
                            <div class={styles.headerLabel} style={{ width: '50px' }}>
                                <p class={styles.label}>GPA</p>
                            </div>
                            <div class={styles.headerLabel} style={{ width: '50px' }}>
                                <p class={styles.label}>Courses</p>
                            </div>
                            <div class={styles.headerLabel} style={{ width: '60px' }}>
                                <p class={styles.label}>Students</p>
                            </div>
                        </div>

                        {/* Instructor list */}
                        <div class={styles.listContent}>
                            {students.map((student, index) => (
                                <div key={index} className={styles.rowContainer}>
                                    <div style={{ width: "150px", display: "flex", flexDirection: "row" }}>
                                        <p className={styles.headerText}>{student.profile.user.first_name}&nbsp;{student.profile.user.last_name}</p>
                                    </div>
                                    <div style={{ width: "140px" }}>
                                        <p className={styles.headerText}>{student.major?.major}</p>
                                    </div>
                                    <div style={{ width: "210px" }}>
                                        <p className={styles.headerText}>{student.profile.user.username}</p>
                                    </div>
                                    <div style={{ width: "50px" }}>
                                        <p className={styles.headerText}>{student.gpa}</p>
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
                {addStudent && (
                    <div className={styles.popup}>
                        <h2>Add New Student</h2>
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
                                <p class={styles.formLabel}>Major</p>
                                <select
                                    name="majors"
                                    value={formData.major}
                                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                                    class={styles.formInput}
                                >
                                    <option value="">Select Major</option>
                                    {majors.map((maj) => (
                                        <option key={maj.id} value={maj.id}>{maj.name}</option>
                                    ))}
                                </select>
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
                        <button class={styles.formButton} onClick={handleAddStudent}>Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Students;
