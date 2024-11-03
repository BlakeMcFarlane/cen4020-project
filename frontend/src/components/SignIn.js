import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';  
import styles from '../styles/SignIn.module.css';


const SignIn = () => {
    const { userData, setUserData } = useContext(UserContext);      // global user data

    const [email, setEmail] = useState('');                         // requested email
    const [password, setPassword] = useState('');                   // requested password
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();                                 // for navigating to '/dashboard'

    // asynchronous function to handle http api request 
    const registerUser = async () => {
        try {
            // api call
            const response = await fetch('http://localhost:8000/api/authenticate/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
            
            // succesfull authentification
            if (response.ok) {
                const userData = await response.json();     // user data inside json
                console.log("User data: ", userData);
                setUserData(userData);                      // set global user data
                navigate('/dashboard');                     // redirect to dashboard
            } else {
                console.log('An error occurred.');
            }
        // invalid credentions
        } catch (error) {
            console.error(error);
        }
        }

    return (
        <div class={styles.container}>
            <div className={styles.designContainer}>
                <img src="http://localhost:8000/media/campus-photo.jpg" alt="Sign In" className={styles.image} />
            </div>
            <div class={styles.signinContainer}>
                <div class={styles.signinBox}>
                    <h1>Sign In</h1>
                    <p>Enter your FU domain email</p>
                    <div class={styles.inputContainer}> 
                        <input onChange={(inp) => setEmail(inp.target.value)} type="text" placeholder="email" class={styles.input}/>
                        <input onChange={(inp) => setPassword(inp.target.value)} type="password" placeholder="password"  class={styles.input}/>
                    </div>
                    <div class={styles.middleBox}>
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={(check) => setShowPassword(check.target.checked)}
                        />
                        <p style={{"width": 145}}>Show Password</p>
                        <a><p style={{"color": "blue"}}>Forgot Password?</p></a>
                    </div>
                    <div class={styles.buttonContainer}> 
                        <button onClick={registerUser} class={styles.button}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    )}

export default SignIn