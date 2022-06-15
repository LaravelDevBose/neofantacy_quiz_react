import React from "react";
import FacebookLogin from "react-facebook-login";
import Facebook from "../../assets/facebook.png";

function LoginWithFacebook() {
  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <div
      className="fb-login"
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <FacebookLogin
        appId="793134058808027"
        autoLoad={false}
        fields="name,email,picture"
        // onClick={componentClicked}
        callback={responseFacebook}
        render={(renderProps) => (
          <button
            className="btn"
            onClick={renderProps.onClick}
            disabled={renderProps.isDisabled}
            style={{
              // backgroundColor: "#3B5998",
              // border: "2px solid #3B5998",
              color: "#fff",
              border: "2px solid rgba(0, 0, 0, 0.15)",
              marginBottom: "1rem",
            }}
          >
            {" "}
            <img src={Facebook} alt="facebook" /> Sign in with Facebook
          </button>
        )}
      />
    </div>
  );
}
export default LoginWithFacebook;
