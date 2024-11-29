import React, { useContext, useEffect, useState } from "react";
import SideNavbar from "../SideNavbar";
import styles from "../../styles/InstructorClassroom.module.css";
import { UserContext } from "../UserContext";
//import { IoMdAddCircle } from "react-icons/io";

const Courses = () => {
    //const { userData, setUserData } = useContext(UserContext); // Stores current user data
    const [courses, setCourses] = useState([]); // Stores all courses related to department
    const [allInstructors, setAllInstructors] = useState([]); // Stores all instructors related to department
    //const [filteredInstructors, setFilteredInstructors] = useState([]);

    // // Form used to create a new course
    // const [formData, setFormData] = useState({
    //     subject: "",
    //     course_number: "",
    //     title: "",
    //     credits: "",
    //     instructor: "",
    //     department: "",
    //     total_seats: "",
    //     available_seats: "",
    // });

    // // Static data for new course form
    // const departments = [
    //     { id: 12, name: "History" },
    //     { id: 11, name: "Engineering" },
    //     { id: 10, name: "Physics" },
    //     { id: 9, name: "Mathematics" },
    //     { id: 8, name: "Religion" },
    //     { id: 7, name: "Art" },
    //     { id: 6, name: "Business" },
    //     { id: 5, name: "English" },
    //     { id: 4, name: "Chemistry" },
    //     { id: 3, name: "Advertising" },
    //     { id: 2, name: "Accounting" },
    //     { id: 1, name: "Computer Science" },
    // ];

    // Fetch Courses and Instructors on page load
    useEffect(() => {
        fetchCourses();
        fetchInstructors();
    }, []);

    // Sets a list of Courses
    const fetchCourses = async () => {
        const response = await fetch("http://localhost:8000/api/list-courses/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const list = await response.json();
        setCourses(list); // store courses in state variable
    };

    // Sets a list of Instructors
    const fetchInstructors = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/api/list-instructors/",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            setAllInstructors(data);
        } catch (error) {
            console.error("Error fetching instructors:", error);
        }
    };

    // // When the user creates a department specific profile
    // const handleDepartmentChange = (e) => {
    //     const departmentId = parseInt(e.target.value, 10);
    //     setFormData({ ...formData, department: departmentId });

    //     if (departmentId) {
    //         // Filter instructors based on the selected department
    //         const instructorsInDepartment = allInstructors.filter(
    //             (instructor) =>
    //                 instructor.department && instructor.department.uid === departmentId
    //         );
    //         setFilteredInstructors(instructorsInDepartment);
    //     } else {
    //         setFilteredInstructors([]); // Reset if no department is selected
    //     }
    // };

    // // Updates form on user input
    // const handleInputChange = (e) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    return (
        <div className={styles.container}>
            <div>
                <SideNavbar />
            </div>
            <div className={styles.content}>
                <div class={styles.title}>
                    <h1 class={styles.titleText}>Courses</h1>
                </div>
                <div class={styles.main}>
                    <div class={styles.listContainer}>
                        <div class={styles.listHeader}>
                            <div class={styles.headerLabel} style={{ width: "50px" }}>
                                <p class={styles.label}>Subject</p>
                            </div>
                            <div class={styles.headerLabel} style={{ width: "50px" }}>
                                <p class={styles.label}>Course</p>
                            </div>
                            <div class={styles.headerLabel} style={{ width: "210px" }}>
                                <p class={styles.label}>Title</p>
                            </div>
                            <div class={styles.headerLabel} style={{ width: "50px" }}>
                                <p class={styles.label}>Credits</p>
                            </div>
                            <div class={styles.headerLabel} style={{ width: "150px" }}>
                                <p class={styles.label}>Department</p>
                            </div>
                            <div class={styles.headerLabel} style={{ width: "200px" }}>
                                <p class={styles.label}>instructor</p>
                            </div>
                            <div class={styles.headerLabel} style={{ width: "50px" }}>
                                <p class={styles.label}>total_seats</p>
                            </div>
                        </div>

                        {/* Instructor list */}
                        <div class={styles.listContent}>
                            {courses.map((course, index) => (
                                <div key={index} className={styles.rowContainer}>
                                    <div
                                        style={{
                                            width: "50px",
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                        <p className={styles.headerText}>{course.subject}</p>
                                    </div>
                                    <div style={{ width: "50px" }}>
                                        <p className={styles.headerText}>{course.course_number}</p>
                                    </div>
                                    <div style={{ width: "210px" }}>
                                        <p className={styles.headerText}>{course.title}</p>
                                    </div>
                                    <div style={{ width: "50px" }}>
                                        <p className={styles.headerText}>{course.credits}</p>
                                    </div>
                                    <div style={{ width: "150px" }}>
                                        <p className={styles.headerText}>
                                            {course.department_display}
                                        </p>
                                    </div>
                                    <div style={{ width: "200px" }}>
                                        <p className={styles.headerText}>
                                            {course.instructor_display}
                                        </p>
                                    </div>
                                    <div style={{ width: "50px" }}>
                                        <p className={styles.headerText}>{course.total_seats}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Courses;  