import React, { useState } from "react";
import Header from "../../components/Login/Header/Header";
import Numeric from "../../components/Login/numeric_bg/Numeric";
import "./Login.css";
import OR from "../../assets/or.png";
import Google from "../../assets/google.png";
import Facebook from "../../assets/facebook.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { API_URL, getToken } from "../../Helper/helper";
import { useDispatch } from "react-redux";
import { setUser } from "../../feature/user/userSlice";
import LoginWithGoogle from "../../components/SocialLogin/GoogleLogin";
import LoginWithFacebook from "../../components/SocialLogin/LoginWithFacebook";

const Login = () => {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = () => {
    const bodyFormData = new FormData();
    bodyFormData.append("user_name", phone);
    axios({
      url: `${API_URL}/user/check`,
      method: "post",
      data: bodyFormData,
    }).then((res) => {
      dispatch(setUser({ phone: phone }));
    });
  };

  return (
    <div className="login">
      <Header />
      <Numeric />
      <div className="container">
        <p id="instruction">Enter your email address to continue</p>
        <div className="input-field">
          {/* <div
            style={{ borderRight: "1px solid #989898", padding: "0 0.5rem" }}
          >
            <p>+91</p>
          </div> */}
          <input
            onChange={handleChangePhone}
            type="email"
            placeholder="Enter Email Address"
            style={{ width: "100%"}}
          />
        </div>
        <NavLink to="/otp" params={{ phone: phone }} style={{ width: "90%" }}>
          <button
            onClick={handleSubmit}
            className="red-btn"
            style={{ fontSize: "1.2rem" }}
          >
            Continue
          </button>
        </NavLink>
        <img
          src={OR}
          alt="----------OR---------"
          style={{ margin: "1rem 0" }}
        />
        <LoginWithGoogle />
        <LoginWithFacebook />
      </div>
    </div>
  );
};

export default Login;
