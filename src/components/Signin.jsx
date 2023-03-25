import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import { BiErrorCircle } from "react-icons/bi";

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signIn(email, password);
            navigate('/account');
        } catch (error) {
            console.log(error.message)
            var vis = document.getElementsByClassName("error")[0];
            vis.style.visibility = "visible";

            setTimeout(() => {
                var vis = document.getElementsByClassName("error")[0];
                vis.style.visibility = "hidden";
            }, 2000);

        }
    }
    return (
        <div>
            <div>
                <h1 className="headingg">Sign in to your account</h1>

            </div>
            <form onSubmit={handleSubmit}>
                <div >
                    <label>Email Address</label>
                    <input className="inputt" type="email" onChange={(e) => setEmail(e.target.value)} />

                </div>
                <div >
                    <label>Password</label>
                    <input className="inputt" type="password" onChange={(e) => setPassword(e.target.value)} />
                    <div class="error">
                        <BiErrorCircle>

                        </BiErrorCircle>
                        <span  >
                            Wrong sign in credentials. Try again
                        </span>

                    </div>
                </div>
                <div>
                    <button className="buttonn">Sign In</button>
                </div>
                <span className="para">
                    Don't have an account yet? <Link to='signup'>Sign Up</Link>
                </span>
            </form>
        </div>
    )
}

export default Signin
