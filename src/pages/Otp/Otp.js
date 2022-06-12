import React, { useState } from "react";
import "./Otp.css";
import Header from "../../components/Login/Header/Header";
import Numeric from "../../components/Login/numeric_bg/Numeric";
import { NavLink } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../feature/user/userSlice";
import { setToken } from "../../Helper/helper";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const phone = useSelector((state) => state?.user?.user?.phone);
  const navigate = useNavigate();

  const handleChange = (otp) => setOtp(otp);

  const handleVerify = () => {
    if (phone && otp) {
      dispatch(login({ username: phone, otp })).then((res) => {
        if (res?.payload?.status === 200) {
          setToken(res?.payload?.data?.access_token);
          navigate("/dashboard");
        }
      });
    } else {
      console.log("incorrect credentials");
    }
  };

  return (
    <div className="otp">
      <Header />
      <Numeric />
      <div className="container">
        <p id="instruction">Enter OTP you received</p>
        <div className="input-fields">
          {/* <input
            type="tel"
            maxLength={1}
            className="input-text"
            onChange={nextInput}
            onClick={emptyInput}
          />
          <input
            type="tel"
            maxLength={1}
            className="input-text"
            onChange={nextInput}
            onClick={emptyInput}
          />
          <input
            type="tel"
            maxLength={1}
            className="input-text"
            onChange={nextInput}
            onClick={emptyInput}
          />
          <input
            type="tel"
            maxLength={1}
            className="input-text"
            onClick={emptyInput}
          /> */}
          <OtpInput
            value={otp}
            onChange={handleChange}
            numInputs={4}
            separator={<span>-</span>}
          />
        </div>
        <NavLink to="" style={{ width: "90%" }}>
          <button
            onClick={handleVerify}
            className="red-btn"
            style={{ padding: "0.5rem auto" }}
          >
            Verify OTP
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Otp;
