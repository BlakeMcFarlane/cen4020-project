import React, { useContext, useState, useEffect } from 'react';
import SideNavbar from '../SideNavbar';
import styles from "../../styles/Registration.module.css"
import { UserContext } from '../../components/UserContext';  
import { GiArchiveResearch } from "react-icons/gi";
import CourseHeader from './utility/CourseHeader';


const Registration = () => {
    const { userData, setUserData } = useContext(UserContext); 

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Function to handle search input changes
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        if (searchQuery.length > 0) {
            fetch(`http://localhost:8000/api/search-courses/?q=${searchQuery}`)
                .then((response) => response.json())
                .then((data) => {
                    setSearchResults(data.slice(0, 10));
                })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
        } else {
          setSearchResults([]);  // Clear results when the search query is empty
        }
    }, [searchQuery])

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
                    <div key={index} className={styles.row}>
                        <div style={{ width: "80px" }}>
                        <p className={styles.headerText}>{course.subject}</p>
                        </div>
                        <div style={{ width: "80px" }}>
                        <p className={styles.headerText}>{course.course_number}</p>
                        </div>
                        <div style={{ width: "280px" }}>
                        <p className={styles.headerText}>{course.title}</p>
                        </div>
                        <div style={{ width: "50px" }}>
                        <p className={styles.headerText}>{course.credits}</p>
                        </div>
                        <div style={{ width: "200px" }}>
                        <p className={styles.headerText}>{course.instructor}</p>
                        </div>
                        <div style={{ width: "70px" }}>
                        <p className={styles.headerText}>{course.total_seats}</p>
                        </div>
                        <div style={{ width: "70px" }}>
                        <p className={styles.headerText}>{course.available_seats}</p>
                        </div>
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

            <h4 class={styles.boxHeader}>Active Registration</h4>
            <div class={styles.activeRegistration}>

                <CourseHeader /> 

                {userData && userData.active_registration && userData.active_registration.length > 0 ? (
                userData.active_registration.map((course, index) => (
                    <div className={styles.row}>
                        <div style={{ width: "80px", alignContent: "center" }}>
                            <p class={styles.headerText} style={{left:"10px", position: "relative"}}>{course.subject}</p>
                        </div>
                        <div style={{ width: "80px", alignContent: "center" }}>
                            <p class={styles.headerText}>{course.course_number}</p>
                        </div>
                        <div style={{ width: "280px", alignContent: "center" }}>
                            <p class={styles.headerText}>{course.title}</p>
                        </div>
                        <div style={{ width: "50px", alignContent: "center" }}>
                            <p class={styles.headerText} style={{left:"15px", position: "relative"}}>{course.credits}</p>
                        </div>
                        <div style={{ width: "200px", alignContent: "center" }}>
                            <p class={styles.headerText}>{course.instructor}</p>
                        </div>
                        <div style={{ width: "70px", alignContent: "center" }}>
                            <p class={styles.headerText} style={{left:"10px", position: "relative"}}>{course.total_seats}</p>
                        </div>
                        <div style={{ width: "70px", alignContent: "center" }}>
                            <p class={styles.headerText} style={{left:"10px", position: "relative"}}>{course.available_seats}</p>
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