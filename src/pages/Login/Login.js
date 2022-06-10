import React from 'react'
import Header from '../../components/Login/Header/Header'
import Numeric from '../../components/Login/numeric_bg/Numeric'
import './Login.css'
import OR from '../../assets/or.png'
import Google from '../../assets/google.png'
import Facebook from '../../assets/facebook.png'
import { NavLink } from 'react-router-dom';

const Login = () => {
    return (
        <div className='login'>
            <Header />
            <Numeric />
            <div className="container">
                <p id='instruction'>Enter your phone number to continue</p>
                <div className="input-field">
                    <div style={{ borderRight: "1px solid #989898", padding: "0 0.5rem" }}>
                        <p>+91</p>
                    </div>
                    <input type="tel" placeholder='Enter Mobile Number' />
                </div>
                <NavLink to="/otp" style={{ width: "90%" }}>
                    <button className='red-btn' style={{ fontSize: "1.2rem" }}>Continue</button>
                </NavLink>
                <img src={OR} alt="----------OR---------" style={{ margin: "1rem 0" }} />
                <button className='btn' style={{ border: "2px solid rgba(0, 0, 0, 0.15)", marginBottom: "1rem" }}> <img src={Google} alt="google" /> Sign in with Google</button>
                <button className='btn' style={{ backgroundColor: "#3B5998", border: "2px solid #3B5998", color: "#fff" }}> <img src={Facebook} alt="google" /> Sign in with Facebook</button>
            </div>
        </div>
    )
}

export default Login