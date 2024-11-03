import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';  


const SignIn = () => {
    const { userData, setUserData } = useContext(UserContext);      // global user data

    const [email, setEmail] = useState('');                         // requested email
    const [password, setPassword] = useState('');                   // requested password

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
        <div>
            <input onChange={(inp) => setEmail(inp.target.value)} type="text" placeholder="email" />
            <input onChange={(inp) => setPassword(inp.target.value)} type="text" placeholder="password" />
            <button onClick={registerUser}> go </button>
        </div>
    )}

export default SignIn