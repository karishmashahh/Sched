import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { createUser } = UserAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await createUser(email, password);
            navigate('/account');
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }

    return (
        <div>
            <div>
                <h1 className="headingg">Sign up to an account</h1>

            </div>
            <form onSubmit={handleSubmit}>
                <div  >
                    <label>Email Address</label>
                    <input className="inputt" type="email" onChange={(e) => setEmail(e.target.value)} />

                </div>
                <div >
                    <label>Password</label>
                    <input className="inputt" type="password" onChange={(e) => setPassword(e.target.value)} />

                </div>
                <button className="buttonn">Sign Up</button>
                <p className="para">
                    Already have an account? <Link to='/'> Sign In</Link>
                </p>
            </form>
        </div>
    )
}

export default Signup
