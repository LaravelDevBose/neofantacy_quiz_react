import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import Google from "../../assets/google.png";
import axios from "axios";
import { API_URL, getToken } from "../../Helper/helper";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin } from "../../feature/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function LoginWithGoogle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user.user);
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "914854684013-ppvk055jaq97ljuf8kn5uhhkma70kkl5.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  useEffect(() => {
    if (user?.email) navigate("/dashboard");
  }, [user?.email]);

  const responseGoogle = (response) => {
    console.log(response);

    let name = "";
    let provider = "google";
    let provider_id = "";
    let email = "";

    if (response) {
      name = response?.profileObj?.name;
      email = response?.profileObj?.email;
      provider_id = response?.profileObj?.googleId;
    }

    dispatch(googleLogin({ name, provider, email, provider_id }));
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <GoogleLogin
        clientId="914854684013-ppvk055jaq97ljuf8kn5uhhkma70kkl5.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="btn"
            style={{
              border: "2px solid rgba(0, 0, 0, 0.15)",
              marginBottom: "1rem",
            }}
          >
            {" "}
            <img src={Google} alt="google" /> Sign in with Google
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        // cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
