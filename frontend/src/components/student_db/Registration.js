import React, { useContext, useState, useEffect } from 'react';
import SideNavbar from '../SideNavbar';
import styles from "../../styles/Registration.module.css"
import { UserContext } from '../../components/UserContext';  
import { GiArchiveResearch } from "react-icons/gi";
import CourseHeader from './utility/CourseHeader';
import CourseRow from './utility/CourseRow';
import { FaTrashAlt } from "react-icons/fa";


const Registration = () => {
    const { userData, setUserData } = useContext(UserContext); 

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);     // For the popup
    const [popupMessage, setPopupMessage] = useState('');           // Popup message


    // Function to handle search input changes
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        if (searchQuery.length > 0) {
            fetch(`http://localhost:8000/api/search-courses/?q=${searchQuery}`)
                .then((response) => response.json())
                .then((data) => {
                    setSearchResults(data.slice(0, 10));            // Only show 10 courses max
                })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
        } else {
            setSearchResults([]);  // Clear results when the search query is empty
        }
    }, [searchQuery])

    // Function to add course to registered after confirmation
    const registerInCourse = (course) => {
        // Check if the course is already in the user's active registration
        const alreadyRegistered = userData.active_registration.some(
            (registeredCourse) => registeredCourse.course_number === course.course_number
        );

        if (!alreadyRegistered) {
            const totalCredits = calculateTotalCredits();
            if (totalCredits + course.credits > 18) {
                setPopupMessage("A permit is required to register in more than 18 credit hours.");
            } else {
                setPopupMessage(`Are you sure you would like to register in ${course.title}?`);
            }
            setSelectedCourse(course);  // Set the selected course for confirmation
        } else {
            console.log('Course is already registered');
        }
    };

    // Function to prompt course removal
    const removeCourse = (course) => { 
        setPopupMessage(`Are you sure you would like to remove ${course.title} from your registration?`);
        setSelectedCourse(course);  // Set the selected course for confirmation
    };

    // Confirm removal function
    const confirmRemoval = () => {
        const studentId = userData.uid;
        const courseId = selectedCourse.uid;

        fetch('http://localhost:8000/api/remove-course/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                student_id: studentId,
                course_id: courseId,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                // Successfully removed
                const updatedRegistration = userData.active_registration.filter(
                    (course) => course.course_number !== selectedCourse.course_number
                );
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    active_registration: updatedRegistration,
                }));
            } else {
                console.error(data.error);
            }
        })
        .catch(error => console.error('Error removing course:', error));

        // Close the popup
        setSelectedCourse(null);
    };


    // Confirm registration if within credit limit
    const confirmRegistration = () => {
        // Replace 'userId' with the actual ID from your user data
        const studentId = userData.uid;
        const courseId = selectedCourse.uid; // Replace with the actual course ID field
    
        fetch('http://localhost:8000/api/register-course/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                student_id: studentId,
                course_id: courseId,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                // Successfully registered
                const updatedRegistration = [...userData.active_registration, selectedCourse];
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    active_registration: updatedRegistration,
                }));
            } else {
                console.error(data.error);
            }
        })
        .catch(error => console.error('Error registering course:', error));
    
        // Close the popup
        setSelectedCourse(null);
    };
    

    // Function to calculate total credits
    const calculateTotalCredits = () => {
        return userData.active_registration.reduce((total, course) => total + course.credits, 0);
    };

    return (
        <div className={styles.container}>
        <div>
            <SideNavbar />
        </div>
        <div className={styles.content}>
            <div class={styles.registrationHeader}>
                <h4 class={styles.boxHeader}>Course Lookup</h4>
                <div>
                    <input
                        className={styles.input}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search for courses..."
                    />
                </div>
            </div>

            <div className={styles.courseLookup}>
                <CourseHeader /> 
                <div class={styles.resultsBox}>
                {searchResults.length > 0 ? (
                    searchResults.map((course, index) => (
                    <div 
                        key={index} 
                        class={styles.rowContainer}
                        onClick={() => registerInCourse(course)}
                    >
                        <CourseRow course_info={course}/>
                    </div>
                    ))
                ) : (
                    <div class={styles.noResultsContainer}>
                        <GiArchiveResearch size={50} color='#e2e2e2'/>
                        <p style={{padding:0,margin:0,color:'lightgrey'}}>Look up a course above</p>
                    </div>
                )}
                </div>
            </div>

            {/* Popup for confirmation */}
            {selectedCourse && (
                <div className={styles.popup}>
                    <div className={styles.messageContainer}>
                        <p className={styles.popupMessage}>{popupMessage}</p>
                    </div>
                    {popupMessage.includes("remove") ? (
                        <div className={styles.buttonContainer}>
                            <button onClick={() => setSelectedCourse(null)} className={styles.confirmButton}>No</button>
                            <button onClick={confirmRemoval} className={styles.confirmButton}>Yes</button>
                        </div>
                    ) : (
                        <div className={styles.buttonContainer}>
                            <button onClick={() => setSelectedCourse(null)} className={styles.confirmButton}>No</button>
                            <button onClick={confirmRegistration} className={styles.confirmButton}>Yes</button>
                        </div>
                    )}
                </div>
            )}
            
            <div class={styles.activeHeader}>
                <h4 class={styles.boxHeader}>Active Registration</h4>
                <div class={styles.activeMetrics}>
                    <div class={styles.metricRow}>
                        <p style={{padding:0,margin:0}}>courses</p>
                        <p style={{padding:0,margin:0}}>{userData.active_registration.length}</p>
                    </div>
                    <div class={styles.metricRow}>
                        <p style={{padding:0,margin:0}}>credits</p>
                        <p style={{padding:0,margin:0}}>{calculateTotalCredits()}</p>
                    </div>
                </div>
            </div>
            <div class={styles.activeRegistration}>

                <CourseHeader /> 

                {userData && userData.active_registration && userData.active_registration.length > 0 ? (
                userData.active_registration.map((course, index) => (
                    <div class={styles.rowContainer}>
                        <CourseRow course_info={course}/>
                        <div style={{ width: "10px", alignContent: "center" }}>
                            <FaTrashAlt size={15} onClick={() => removeCourse(course)}/>
                        </div>
                    </div>
                ))
                ) : (
                    <p>No active courses.</p>
                )}
            </div>
        </div>
        </div>
    );
};

export default Registration;