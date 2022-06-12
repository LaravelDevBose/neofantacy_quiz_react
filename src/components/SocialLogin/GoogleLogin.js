import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import Google from "../../assets/google.png";

export default function LoginWithGoogle() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "428024460807-lb847mcs0f07ohcijf57q8k4jkrglulr.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <GoogleLogin
        clientId="428024460807-lb847mcs0f07ohcijf57q8k4jkrglulr.apps.googleusercontent.com"
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
