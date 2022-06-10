import React from 'react'
import './Otp.css'
import Header from '../../components/Login/Header/Header'
import Numeric from '../../components/Login/numeric_bg/Numeric'
import { NavLink } from 'react-router-dom';

const nextInput = (e) => {
    if (e.target.value.length === 1 && e.target.value.trim() !== "") {
        e.target.nextElementSibling.focus();
        // e.target.previousElementSibling.focus();
    }
}

const emptyInput = (e) => {
    e.target.value = '';
}

const Otp = () => {
    return (
        <div className='otp'>
            <Header />
            <Numeric />
            <div className="container">
                <p id='instruction'>Enter OTP you received</p>
                <div className="input-fields">
                    <input type="tel" maxLength={1} className="input-text" onChange={nextInput} onClick={emptyInput} />
                    <input type="tel" maxLength={1} className="input-text" onChange={nextInput} onClick={emptyInput} />
                    <input type="tel" maxLength={1} className="input-text" onChange={nextInput} onClick={emptyInput} />
                    <input type="tel" maxLength={1} className="input-text" onClick={emptyInput} />
                </div>
                <NavLink to="/dashboard" style={{ width: "90%" }}>
                    <button className='red-btn' style={{ padding: "0.5rem auto" }}>Verify OTP</button>
                </NavLink>
            </div>
        </div>
    )
}

export default Otp