import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {

        console.log(email)
        try {
            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                navigate('/dashboard');
            } else {
                console.log('An error occured.'); 
            }

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