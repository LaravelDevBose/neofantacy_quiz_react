import React from "react";
import FacebookLogin from "react-facebook-login";
import Facebook from "../../assets/facebook.png";

function LoginWithFacebook() {
  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <FacebookLogin
      appId="1088597931155576"
      autoLoad={true}
      fields="name,email,picture"
      // onClick={componentClicked}
      callback={responseFacebook}
      render={(renderProps) => (
        <button
          className="btn"
          onClick={renderProps.onClick}
          disabled={renderProps.isDisabled}
          style={{
            backgroundColor: "#3B5998",
            border: "2px solid #3B5998",
            color: "#fff",
          }}
        >
          {" "}
          <img src={Facebook} alt="google" /> Sign in with Facebook
        </button>
      )}
    />
  );
}
export default LoginWithFacebook;
